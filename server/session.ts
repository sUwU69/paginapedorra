import session from "express-session";
import MemoryStore from "memorystore";

const MemoryStoreSession = MemoryStore(session);

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "suwho-secret-key",
  resave: true,
  saveUninitialized: true,
  store: new MemoryStoreSession({
    checkPeriod: 86400000 // Limpiar sesiones expiradas cada 24h
  }),
  cookie: {
    secure: false,
    httpOnly: false,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    path: "/"
  },
  name: "sessionId" // Nombre más específico para la cookie
});