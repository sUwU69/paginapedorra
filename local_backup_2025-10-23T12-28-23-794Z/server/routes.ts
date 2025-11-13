import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobSchema, insertCVSchema, insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  app.post("/api/jobs", async (req, res) => {
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

  app.post("/api/cvs", async (req, res) => {
    try {
      const validatedData = insertCVSchema.parse(req.body);
      const cv = await storage.createCV(validatedData);
      res.status(201).json(cv);
    } catch (error) {
      res.status(400).json({ error: "Datos inválidos" });
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
