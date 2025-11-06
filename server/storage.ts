import type { Job, InsertJob, CV, InsertCV, ContactMessage, InsertContactMessage, Notification } from "@shared/schema";
import type { User, InsertUser, UserRole } from "@shared/auth";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  verifyCompany(userId: string): Promise<User>;
  updateUserRole(userId: string, role: UserRole): Promise<User>;
  
  // Jobs
  getAllJobs(): Promise<Job[]>;
  getJobById(id: string): Promise<Job | undefined>;
  getJobsByFilters(filters: {
    query?: string;
    rubro?: string;
    jornada?: string;
    ubicacion?: string;
  }): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  
  // CVs
  getAllCVs(): Promise<CV[]>;
  getCVById(id: string): Promise<CV | undefined>;
  createCV(cv: InsertCV & { userId: string, filePath: string }): Promise<CV>;
  getCVByUserId(userId: string): Promise<CV | undefined>;
  updateCV(cvId: string, updatedFields: Partial<CV>): Promise<CV>;
  acceptCV(cvId: string, byUserId?: string): Promise<CV>;
  rejectCV(cvId: string, byUserId?: string): Promise<CV>;

  // Notifications
  createNotification(notification: Notification): Promise<void>;
  getNotificationsForUser(userId: string): Promise<Notification[]>;
  markNotificationRead(notificationId: string): Promise<void>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

class MemoryStore<T> {
  private store: Map<string, T>;

  constructor() {
    this.store = new Map();
  }

  set(key: string, value: T): void {
    this.store.set(key, value);
  }

  get(key: string): T | undefined {
    return this.store.get(key);
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  values(): IterableIterator<T> {
    return this.store.values();
  }
}

import { persistentUsers, persistentCVs, persistentNotifications } from './persistentStorage';

export class MemStorage implements IStorage {
  private jobs: MemoryStore<Job>;
  private cvs: MemoryStore<CV>;
  private contactMessages: MemoryStore<ContactMessage>;
  private users: MemoryStore<User>;

  constructor() {
    this.jobs = new MemoryStore();
    this.cvs = new MemoryStore();
    this.contactMessages = new MemoryStore();
    this.users = new MemoryStore();
    
    // Cargar usuarios persistentes
    persistentUsers.getAll().forEach(user => {
      // Convertir fechas serializadas a Date
      const u = { ...user, createdAt: new Date(user.createdAt) } as User;
      this.users.set(u.id, u);
    });
    
    // Cargar CVs persistentes (convertir createdAt a Date)
    persistentCVs.getAll().forEach(cv => {
      const c = { ...cv, createdAt: new Date(cv.createdAt) } as CV;
      this.cvs.set(c.id, c);
    });

    this.seedJobs();
  }

  private seedJobs() {
    const initialJobs: InsertJob[] = [
      {
        title: "Desarrollador Web Junior",
        company: "Tech Solutions SA",
        location: "CABA",
        jobType: "Part-time",
        specialization: "Programación",
        description: "Buscamos estudiante de informática para desarrollo web. Horario flexible compatible con cursada.",
        requirements: "HTML, CSS, JavaScript básico. React es un plus.",
      },
      {
        title: "Técnico de Redes",
        company: "DataNet Argentina",
        location: "Zona Norte",
        jobType: "Pasantía",
        specialization: "Redes",
        description: "Práctica profesionalizante en instalación y mantenimiento de redes. Supervisión y capacitación incluida.",
        requirements: "Conocimientos en cableado estructurado y configuración de routers.",
      },
      {
        title: "Soporte Técnico",
        company: "CompuFix",
        location: "CABA",
        jobType: "Part-time",
        specialization: "Soporte técnico",
        description: "Asistencia técnica remota y presencial. Ideal para estudiantes de 5to o 6to año.",
        requirements: "Manejo de Windows, troubleshooting básico.",
      },
      {
        title: "Programador Backend",
        company: "Innovatech",
        location: "Remoto",
        jobType: "Part-time",
        specialization: "Programación",
        description: "Desarrollo de APIs y servicios backend. Trabajo remoto con reuniones semanales.",
        requirements: "Node.js o Python. Experiencia con bases de datos.",
      },
      {
        title: "Diseñador UI/UX",
        company: "Creative Studio",
        location: "CABA",
        jobType: "Práctica profesionalizante",
        specialization: "Diseño web",
        description: "Diseño de interfaces y experiencia de usuario. Práctica de 6 meses con posibilidad de contratación.",
        requirements: "Figma, Adobe XD. Portfolio de proyectos.",
      },
      {
        title: "Técnico Electrónico",
        company: "AutoControl SRL",
        location: "Zona Sur",
        jobType: "Part-time",
        specialization: "Electrónica",
        description: "Mantenimiento de sistemas de automatización industrial. Horario de 4 horas diarias.",
        requirements: "Electrónica analógica y digital. Lectura de planos.",
      },
      {
        title: "Desarrollador Mobile",
        company: "AppMakers",
        location: "CABA",
        jobType: "Part-time",
        specialization: "Programación",
        description: "Desarrollo de aplicaciones móviles Android/iOS. Horario flexible.",
        requirements: "React Native o Flutter. Git básico.",
      },
      {
        title: "Administrador de Sistemas",
        company: "SysAdmin Corp",
        location: "Zona Oeste",
        jobType: "Pasantía",
        specialization: "Redes",
        description: "Administración de servidores Linux y Windows. Práctica remunerada.",
        requirements: "Linux básico, networking, virtualización.",
      },
      {
        title: "QA Tester",
        company: "Quality First",
        location: "Remoto",
        jobType: "Part-time",
        specialization: "Programación",
        description: "Testing manual y automatizado de software. Trabajo 100% remoto.",
        requirements: "Atención al detalle. Conocimientos de testing es un plus.",
      },
      {
        title: "Técnico en Mantenimiento",
        company: "Industrias Mecánicas",
        location: "Zona Sur",
        jobType: "Part-time",
        specialization: "Mecánica",
        description: "Mantenimiento preventivo y correctivo de maquinaria industrial.",
        requirements: "Lectura de planos mecánicos, herramientas básicas.",
      },
    ];

    initialJobs.forEach((job) => {
      const id = randomUUID();
      this.jobs.set(id, {
        ...job,
        id,
        requirements: job.requirements || null,
        createdAt: new Date(),
      });
    });
  }

  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getJobById(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobsByFilters(filters: {
    query?: string;
    rubro?: string;
    jornada?: string;
    ubicacion?: string;
  }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values());

    if (filters.query) {
      const queryLower = filters.query.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(queryLower) ||
          job.company.toLowerCase().includes(queryLower) ||
          job.description.toLowerCase().includes(queryLower)
      );
    }

    if (filters.rubro) {
      jobs = jobs.filter(
        (job) => job.specialization.toLowerCase() === filters.rubro?.toLowerCase()
      );
    }

    if (filters.jornada) {
      jobs = jobs.filter(
        (job) => job.jobType.toLowerCase() === filters.jornada?.toLowerCase()
      );
    }

    if (filters.ubicacion) {
      jobs = jobs.filter(
        (job) => job.location.toLowerCase().includes(filters.ubicacion?.toLowerCase() || "")
      );
    }

    return jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = {
      ...insertJob,
      id,
      requirements: insertJob.requirements || null,
      createdAt: new Date(),
    };
    this.jobs.set(id, job);
    return job;
  }

  async getAllCVs(): Promise<CV[]> {
    return Array.from(this.cvs.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getCVById(id: string): Promise<CV | undefined> {
    return this.cvs.get(id);
  }

  async createCV(insertCV: InsertCV, fileName?: string, filePath?: string): Promise<CV> {
    const id = randomUUID();
    const cv: CV = {
      ...insertCV,
      id,
      descripcion: insertCV.descripcion || null,
      cvFileName: fileName || null,
      cvFilePath: filePath || null,
      createdAt: new Date(),
      userId: (insertCV as any).userId || undefined,
      status: 'pending',
    };
    this.cvs.set(id, cv);
    persistentCVs.add(cv);
    return cv;
  }

  async getCVByUserId(userId: string): Promise<CV | undefined> {
    return Array.from(this.cvs.values()).find(c => c.userId === userId);
  }

  async updateCV(cvId: string, updatedFields: Partial<CV>): Promise<CV> {
    const cv = this.cvs.get(cvId);
    if (!cv) throw new Error('CV no encontrado');
    const updated = { ...cv, ...updatedFields } as CV;
    this.cvs.set(cvId, updated);
    persistentCVs.update(cvId, updated);
    return updated;
  }

  async acceptCV(cvId: string, byUserId?: string): Promise<CV> {
    const cv = this.cvs.get(cvId);
    if (!cv) throw new Error('CV no encontrado');
    const updated = { ...cv, status: 'accepted' } as CV;
    this.cvs.set(cvId, updated);
    persistentCVs.update(cvId, updated);
    // create notification
    const note: Notification = {
      id: randomUUID(),
      userId: cv.userId || '',
      message: `Tu CV ha sido aceptado`,
      read: false,
      createdAt: new Date(),
    };
    persistentNotifications.add(note);
    return updated;
  }

  async rejectCV(cvId: string, byUserId?: string): Promise<CV> {
    const cv = this.cvs.get(cvId);
    if (!cv) throw new Error('CV no encontrado');
    const updated = { ...cv, status: 'rejected' } as CV;
    this.cvs.set(cvId, updated);
    persistentCVs.update(cvId, updated);
    const note: Notification = {
      id: randomUUID(),
      userId: cv.userId || '',
      message: `Tu CV ha sido rechazado por un administrador`,
      read: false,
      createdAt: new Date(),
    };
    persistentNotifications.add(note);
    return updated;
  }

  // Notifications
  async createNotification(notification: Notification): Promise<void> {
    persistentNotifications.add(notification);
  }

  async getNotificationsForUser(userId: string): Promise<Notification[]> {
    return persistentNotifications.getByUser(userId);
  }

  async markNotificationRead(notificationId: string): Promise<void> {
    persistentNotifications.markRead(notificationId);
  }

  async deleteCV(cvId: string): Promise<void> {
    this.cvs.delete(cvId);
    persistentCVs.delete(cvId);
  }

  async renameCVFile(cvId: string, newFileName: string): Promise<CV | undefined> {
    const cv = this.cvs.get(cvId);
    if (cv) {
      persistentCVs.renameFile(cvId, newFileName);
      const updatedCV = { ...cv, cvFileName: newFileName };
      this.cvs.set(cvId, updatedCV);
      return updatedCV;
    }
    return undefined;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  // User methods
  async createUser(user: InsertUser): Promise<User> {
    const id = randomUUID();
    const newUser: User = {
      ...user,
      id,
      createdAt: new Date(),
      companyVerified: false,
    };
    this.users.set(id, newUser);
    persistentUsers.add(newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.email.toLowerCase() === email.toLowerCase());
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async verifyCompany(userId: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (user.role !== "company") {
      throw new Error("El usuario no es una empresa");
    }
    const updatedUser = { ...user, companyVerified: true };
    this.users.set(userId, updatedUser);
    persistentUsers.update(userId, updatedUser);
    return updatedUser;
  }

  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    const updatedUser = { ...user, role };
    this.users.set(userId, updatedUser);
    persistentUsers.update(userId, updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();
