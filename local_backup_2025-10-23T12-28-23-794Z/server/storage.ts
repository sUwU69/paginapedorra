import { type Job, type InsertJob, type CV, type InsertCV, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
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
  createCV(cv: InsertCV, fileName?: string, filePath?: string): Promise<CV>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private jobs: Map<string, Job>;
  private cvs: Map<string, CV>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.jobs = new Map();
    this.cvs = new Map();
    this.contactMessages = new Map();
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
    };
    this.cvs.set(id, cv);
    return cv;
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
}

export const storage = new MemStorage();
