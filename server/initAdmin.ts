import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { storage } from "./storage";

export async function initializeAdmin() {
  try {
    // Verificar si el admin ya existe
    const existingAdmin = await storage.getUserByEmail("Suwho@admin.com");
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("suwho9898", 10);
      await storage.createUser({
        email: "Suwho@admin.com",
        password: hashedPassword,
        name: "Suwho",
        role: "admin",
      });
      console.log("Usuario administrador creado exitosamente");
    }
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
  }
}