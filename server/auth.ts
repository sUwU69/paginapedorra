import express from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { nanoid } from "nanoid";
import { storage } from "./storage";
import { loginSchema, registerSchema, User } from "../shared/auth";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar multer para la subida de CVs
const cvStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/curriculums'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: cvStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
})

export const authRouter = express.Router();

// La configuración de sesión se ha movido al archivo session.ts

// Middleware para verificar autenticación
export function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

// Middleware para verificar rol de administrador
export function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

// Middleware para verificar rol de empresa
export function requireCompany(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.session.user || req.session.user.role !== "company") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

// Rutas de autenticación
authRouter.post("/register", async (req, res) => {
  try {
    // Validar los datos primero
    const data = registerSchema.parse(req.body);

    // Verificar si el email ya existe
    const existingUser = await storage.getUserByEmail(data.email);
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Hash de la contraseña y creación del usuario
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await storage.createUser({
      ...data,
      password: hashedPassword,
    });

    req.session.user = user;
    res.status(201).json({ user: { ...user, password: undefined } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(err => err.message).join(", ");
      res.status(400).json({ error: `Validación fallida: ${errorMessage}` });
    } else {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ error: "Error interno al registrar usuario" });
    }
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    console.log("Intento de login:", { 
      email: req.body.email,
      passwordLength: req.body.password?.length || 0
    });

    const data = loginSchema.parse(req.body);
    console.log("Datos validados correctamente");

    const user = await storage.getUserByEmail(data.email);
    console.log("Búsqueda de usuario:", {
      emailBuscado: data.email,
      usuarioEncontrado: !!user,
      rolSiExiste: user?.role
    });

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    console.log("Verificando contraseña...");
    try {
      const validPassword = await bcrypt.compare(data.password, user.password);
      console.log("Resultado de validación de contraseña:", validPassword);

      if (!validPassword) {
        console.log("Contraseña incorrecta");
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      req.session.user = user;
      console.log("Sesión iniciada correctamente para usuario:", {
        id: user.id,
        email: user.email,
        role: user.role
      });
      
      res.json({ user: { ...user, password: undefined } });
    } catch (bcryptError) {
      console.error("Error en bcrypt:", bcryptError);
      return res.status(500).json({ error: "Error al verificar credenciales" });
    }
  } catch (error) {
    console.error("Error en login:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }
});

authRouter.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Error al cerrar sesión" });
    } else {
      res.json({ message: "Sesión cerrada" });
    }
  });
});

// Rutas protegidas
authRouter.post("/cvs", requireAuth, upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    const cv = await storage.createCV({
      ...req.body,
      userId: req.session.user!.id,
      filePath: req.file.path
    });

    res.status(201).json(cv);
  } catch (error) {
    res.status(500).json({ error: "Error al subir CV" });
  }
});

// Rutas de administrador
authRouter.get("/users", requireAdmin, async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

authRouter.post("/verify-company/:id", requireAdmin, async (req, res) => {
  try {
    const user = await storage.verifyCompany(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al verificar empresa" });
  }
});

// Endpoint para verificar sesión actual
authRouter.get("/me", (req, res) => {
  console.log('Petición a /me recibida');
  console.log('Session:', req.session);
  console.log('Session ID:', req.sessionID);
  console.log('User in session:', req.session.user);
  
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "No autenticado" });
  }
  res.json({ ...req.session.user, password: undefined });
});