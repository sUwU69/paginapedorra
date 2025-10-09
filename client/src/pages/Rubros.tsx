import CategoryCard from "@/components/CategoryCard";
import { Code, Network, Wrench, Palette, CircuitBoard, Cog } from "lucide-react";

export default function Rubros() {
  const categories = [
    {
      title: "Programación",
      description: "Desarrollo web, aplicaciones móviles, bases de datos, programación de sistemas y más. Oportunidades en empresas de software y startups tecnológicas.",
      icon: Code,
      count: 15,
      href: "/ofertas?rubro=programacion",
    },
    {
      title: "Redes",
      description: "Instalación, configuración y mantenimiento de redes informáticas. Administración de servidores, seguridad de redes y soporte de infraestructura.",
      icon: Network,
      count: 8,
      href: "/ofertas?rubro=redes",
    },
    {
      title: "Soporte técnico",
      description: "Asistencia técnica a usuarios, mantenimiento de equipos, resolución de problemas de hardware y software. Trabajo en help desk y soporte remoto.",
      icon: Wrench,
      count: 12,
      href: "/ofertas?rubro=soporte",
    },
    {
      title: "Diseño web",
      description: "Diseño de interfaces de usuario (UI), experiencia de usuario (UX), desarrollo frontend, maquetación web y diseño gráfico digital.",
      icon: Palette,
      count: 6,
      href: "/ofertas?rubro=diseno",
    },
    {
      title: "Electrónica",
      description: "Proyectos de electrónica, automatización industrial, control de procesos, mantenimiento de equipos electrónicos y sistemas embebidos.",
      icon: CircuitBoard,
      count: 5,
      href: "/ofertas?rubro=electronica",
    },
    {
      title: "Mecánica",
      description: "Mantenimiento industrial, diseño mecánico, operación de maquinaria, control de calidad y proyectos de ingeniería mecánica.",
      icon: Cog,
      count: 4,
      href: "/ofertas?rubro=mecanica",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4" data-testid="text-page-title">
            Rubros y áreas de trabajo
          </h1>
          <p className="text-lg opacity-95">
            Explorá oportunidades laborales en diferentes especialidades técnicas
          </p>
        </div>
      </div>

      <div className="flex-1 bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-lg text-muted-foreground">
              La EEST N°1 Otto Krause forma profesionales técnicos en diversas especialidades. Cada área cuenta
              con oportunidades laborales específicas que se adaptan a tu formación y horario de estudio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>

          <div className="mt-12 bg-card rounded-lg p-8">
            <h2 className="font-heading font-bold text-2xl mb-4">¿No encontrás tu especialidad?</h2>
            <p className="text-muted-foreground mb-6">
              Si tu especialidad técnica no está listada o buscás oportunidades en un área diferente,
              contactate con nosotros. Estamos trabajando constantemente para ampliar las opciones
              disponibles para todos los estudiantes.
            </p>
            <a
              href="/contacto"
              className="text-primary hover:underline font-semibold"
              data-testid="link-contact"
            >
              Contactar al equipo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
