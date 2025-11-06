import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { User } from '@shared/auth';
import type { CV } from '@shared/schema';
import type { Notification } from '@shared/schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CVS_FILE = path.join(DATA_DIR, 'cvs.json');
const NOTIFICATIONS_FILE = path.join(DATA_DIR, 'notifications.json');

// Asegurar que el directorio de datos exista
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Funciones de utilidad para leer y escribir archivos JSON
function readJSONFile<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeJSONFile<T>(filePath: string, data: T[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Gestión de usuarios
export const persistentUsers = {
  getAll(): User[] {
    return readJSONFile<User>(USERS_FILE);
  },

  save(users: User[]): void {
    writeJSONFile(USERS_FILE, users);
  },

  add(user: User): void {
    const users = this.getAll();
    users.push(user);
    this.save(users);
  },

  update(userId: string, updatedUser: User): void {
    const users = this.getAll();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = updatedUser;
      this.save(users);
    }
  },

  delete(userId: string): void {
    const users = this.getAll();
    const filteredUsers = users.filter(u => u.id !== userId);
    this.save(filteredUsers);
  }
};

// Gestión de CVs
export const persistentCVs = {
  getAll(): CV[] {
    return readJSONFile<CV>(CVS_FILE);
  },

  save(cvs: CV[]): void {
    writeJSONFile(CVS_FILE, cvs);
  },

  add(cv: CV): void {
    const cvs = this.getAll();
    cvs.push(cv);
    this.save(cvs);
  },

  update(cvId: string, updatedCV: CV): void {
    const cvs = this.getAll();
    const index = cvs.findIndex(c => c.id === cvId);
    if (index !== -1) {
      cvs[index] = updatedCV;
      this.save(cvs);
    }
  },

  delete(cvId: string): void {
    const cvs = this.getAll();
    const cv = cvs.find(c => c.id === cvId);
    if (cv && cv.cvFilePath) {
      // Eliminar el archivo físico si existe
      try {
        fs.unlinkSync(cv.cvFilePath);
      } catch (error) {
        console.error('Error al eliminar el archivo:', error);
      }
    }
    const filteredCVs = cvs.filter(c => c.id !== cvId);
    this.save(filteredCVs);
  },

  renameFile(cvId: string, newFileName: string): void {
    const cvs = this.getAll();
    const cv = cvs.find(c => c.id === cvId);
    if (cv && cv.cvFilePath) {
      const oldPath = cv.cvFilePath;
      const newPath = path.join(path.dirname(oldPath), newFileName);
      try {
        fs.renameSync(oldPath, newPath);
        cv.cvFilePath = newPath;
        cv.cvFileName = newFileName;
        this.update(cvId, cv);
      } catch (error) {
        console.error('Error al renombrar el archivo:', error);
      }
    }
  }
};

// Gestión de notificaciones
export const persistentNotifications = {
  getAll(): Notification[] {
    if (!fs.existsSync(NOTIFICATIONS_FILE)) {
      fs.writeFileSync(NOTIFICATIONS_FILE, '[]');
      return [];
    }
    return readJSONFile<Notification>(NOTIFICATIONS_FILE);
  },

  save(notifications: Notification[]): void {
    writeJSONFile(NOTIFICATIONS_FILE, notifications);
  },

  add(notification: Notification): void {
    const notes = this.getAll();
    notes.push(notification);
    this.save(notes);
  },

  getByUser(userId: string): Notification[] {
    return this.getAll().filter((n: Notification) => n.userId === userId).sort((a: Notification, b: Notification) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  markRead(notificationId: string): void {
    const notes = this.getAll();
    const idx = notes.findIndex((n: Notification) => n.id === notificationId);
    if (idx !== -1) {
      notes[idx].read = true;
      this.save(notes);
    }
  },
};