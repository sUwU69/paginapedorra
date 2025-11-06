import { z } from "zod";

export type UserRole = "user" | "company" | "admin";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  companyName?: string;
  companyVerified?: boolean;
  createdAt: Date;
}

export const registerSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  name: z.string().min(1, "El nombre es requerido"),
  role: z.enum(["user", "company"], {
    errorMap: () => ({ message: "El rol debe ser user o company" })
  }),
  companyName: z.string().optional().transform(val => val || undefined)
}).refine(data => {
  if (data.role === "company" && !data.companyName) {
    return false;
  }
  return true;
}, {
  message: "El nombre de la empresa es requerido para cuentas de tipo empresa",
  path: ["companyName"]
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export interface InsertUser {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  companyName?: string;
  companyVerified?: boolean;
}
