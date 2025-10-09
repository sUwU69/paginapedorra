import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  jobType: text("job_type").notNull(),
  specialization: text("specialization").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cvs = pgTable("cvs", {
  id: varchar("id").primaryKey(),
  nombre: text("nombre").notNull(),
  apellido: text("apellido").notNull(),
  email: text("email").notNull(),
  telefono: text("telefono").notNull(),
  especialidad: text("especialidad").notNull(),
  anio: text("anio").notNull(),
  descripcion: text("descripcion"),
  cvFileName: text("cv_file_name"),
  cvFilePath: text("cv_file_path"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey(),
  nombre: text("nombre").notNull(),
  email: text("email").notNull(),
  asunto: text("asunto").notNull(),
  mensaje: text("mensaje").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
});

export const insertCVSchema = createInsertSchema(cvs).omit({
  id: true,
  createdAt: true,
  cvFileName: true,
  cvFilePath: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

export type InsertCV = z.infer<typeof insertCVSchema>;
export type CV = typeof cvs.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
