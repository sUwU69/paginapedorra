import { z } from "zod";

// Job types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  specialization: string;
  description: string;
  requirements: string | null;
  createdAt: Date;
}

export interface InsertJob {
  title: string;
  company: string;
  location: string;
  jobType: string;
  specialization: string;
  description: string;
  requirements?: string;
}

// CV types
export interface CV {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidad: string;
  anio: string;
  descripcion: string | null;
  cvFileName: string | null;
  cvFilePath: string | null;
  userId?: string;
  status?: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

export interface InsertCV {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidad: string;
  anio: string;
  descripcion?: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Contact Message types
export interface ContactMessage {
  id: string;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  createdAt: Date;
}

export interface InsertContactMessage {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

// Validation schemas
export const insertJobSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  jobType: z.string(),
  specialization: z.string(),
  description: z.string(),
  requirements: z.string().optional(),
});

export const insertCVSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  email: z.string().email(),
  telefono: z.string(),
  especialidad: z.string(),
  anio: z.string(),
  descripcion: z.string().optional(),
});

export const insertContactMessageSchema = z.object({
  nombre: z.string(),
  email: z.string().email(),
  asunto: z.string(),
  mensaje: z.string(),
});
