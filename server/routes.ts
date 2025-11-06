import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobSchema, insertCVSchema, insertContactMessageSchema } from "@shared/schema";
import { authRouter, requireAuth, requireAdmin, requireCompany } from "./auth";
import multer from "multer";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.use("/api/auth", authRouter);
  // Jobs routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const { query, rubro, jornada, ubicacion } = req.query;
      
      const filters = {
        query: query as string | undefined,
        rubro: rubro as string | undefined,
        jornada: jornada as string | undefined,
        ubicacion: ubicacion as string | undefined,
      };

      const jobs = await storage.getJobsByFilters(filters);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener empleos" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJobById(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Empleo no encontrado" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el empleo" });
    }
  });

  app.post("/api/jobs", requireCompany, async (req, res) => {
    try {
      const validatedData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(validatedData);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ error: "Datos inválidos" });
    }
  });

  // CVs routes
  app.get("/api/cvs", async (req, res) => {
    try {
      const cvs = await storage.getAllCVs();
      res.json(cvs);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener CVs" });
    }
  });

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "uploads", "curriculums");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Multer setup: store files under uploads/curriculums with unique filenames
  const storageEngine = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (_req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      // sanitize originalname
      const name = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      cb(null, `${uniqueSuffix}-${name}`);
    },
  });

  const upload = multer({ storage: storageEngine });

  // Accept multipart/form-data with a single file field named 'cv'
  app.post("/api/cvs", requireAuth, upload.single("cv"), async (req, res) => {
    try {
      // req.body contains text fields (all strings)
      const body = req.body || {};

      // Validate fields using the same schema
      const validatedData = insertCVSchema.parse({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        telefono: body.telefono,
        especialidad: body.especialidad,
        anio: body.anio,
        descripcion: body.descripcion,
      });

      const file = req.file;
      let fileName: string | undefined = undefined;
      let filePath: string | undefined = undefined;
      if (file) {
        fileName = file.originalname;
        filePath = path.resolve(file.path);
      }

      const cv = await storage.createCV(validatedData, fileName, filePath);
      res.status(201).json(cv);
    } catch (error) {
      console.error("Error al crear CV:", error);
      res.status(400).json({ error: "Datos inválidos" });
    }
  });

  // Download route for CV files
  app.get("/api/cvs/:id/download", async (req, res) => {
    try {
      const cv = await storage.getCVById(req.params.id);
      if (!cv) {
        return res.status(404).json({ error: "CV no encontrado" });
      }
      if (!cv.cvFilePath) {
        return res.status(404).json({ error: "Archivo no disponible" });
      }
      // Send the file
      res.sendFile(cv.cvFilePath, (err) => {
        if (err) {
          console.error("Error enviando archivo:", err);
          res.status(500).end();
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Error al descargar el archivo" });
    }
  });

  // Delete CV (owner or admin)
  app.delete("/api/cvs/:id", requireAuth, async (req, res) => {
    try {
      const cvId = req.params.id;
      const cv = await storage.getCVById(cvId);
      if (!cv) return res.status(404).json({ error: "CV no encontrado" });
  const user = req.session.user!;
  if (user.role !== "admin" && cv.userId !== user.id) {
        return res.status(403).json({ error: "No autorizado" });
      }
      await storage.deleteCV(cvId);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar CV" });
    }
  });

  // Rename CV (admin only)
  app.post("/api/cvs/:id/rename", requireAdmin, async (req, res) => {
    try {
      const cvId = req.params.id;
      const { newName } = req.body;
      if (!newName) return res.status(400).json({ error: "Nombre requerido" });
      const updated = await storage.renameCVFile(cvId, newName);
      if (!updated) return res.status(404).json({ error: "CV no encontrado" });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al renombrar CV" });
    }
  });

  // Company accepts a CV
  app.post("/api/cvs/:id/accept", requireCompany, async (req, res) => {
    try {
      const cvId = req.params.id;
      const updated = await storage.acceptCV(cvId, req.session.user?.id);
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al aceptar CV" });
    }
  });

  // Admin rejects a CV
  app.post("/api/cvs/:id/reject", requireAdmin, async (req, res) => {
    try {
      const cvId = req.params.id;
      const updated = await storage.rejectCV(cvId, req.session.user?.id);
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al rechazar CV" });
    }
  });

  // Notifications for current user
  app.get("/api/notifications", requireAuth, async (req, res) => {
    try {
      const userId = req.session.user!.id;
      const notes = await storage.getNotificationsForUser(userId);
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener notificaciones" });
    }
  });

  // Get current user's CV
  app.get("/api/cvs/me", requireAuth, async (req, res) => {
    try {
      const userId = req.session.user!.id;
      const cv = await storage.getCVByUserId(userId);
      if (!cv) return res.status(404).json({ error: "No CV" });
      res.json(cv);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener CV" });
    }
  });

  app.post("/api/notifications/:id/read", requireAuth, async (req, res) => {
    try {
      const noteId = req.params.id;
      await storage.markNotificationRead(noteId);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al marcar notificación" });
    }
  });

  // Contact messages route
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Datos inválidos" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
