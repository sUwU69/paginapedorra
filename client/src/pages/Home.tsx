import { useState } from "react";
import { Link } from "wouter";
import SearchHero from "@/components/SearchHero";
import JobCard from "@/components/JobCard";
import CategoryCard from "@/components/CategoryCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Code, Network, Wrench, Palette, CircuitBoard, Cog, Upload, FileText, Scale } from "lucide-react";

export default function Home() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const featuredJobs = [
    {
      id: "1",
      title: "Desarrollador Web Junior",
      company: "Tech Solutions SA",
      location: "CABA",
      jobType: "Part-time",
      specialization: "Programación",
      description: "Buscamos estudiante de informática para desarrollo web. Horario flexible compatible con cursada.",
    },
    {
      id: "2",
      title: "Técnico de Redes",
      company: "DataNet Argentina",
      location: "Zona Norte",
      jobType: "Pasantía",
      specialization: "Redes",
      description: "Práctica profesionalizante en instalación y mantenimiento de redes. Supervisión y capacitación incluida.",
    },
    {
      id: "3",
      title: "Soporte Técnico",
      company: "CompuFix",
      location: "CABA",
      jobType: "Part-time",
      specialization: "Soporte técnico",
      description: "Asistencia técnica remota y presencial. Ideal para estudiantes de 5to o 6to año.",
    },
  ];

  const categories = [
    {
      title: "Programación",
      description: "Desarrollo web, aplicaciones móviles, bases de datos y más.",
      icon: Code,
      count: 15,
      href: "/ofertas?rubro=programacion",
    },
    {
      title: "Redes",
      description: "Instalación, mantenimiento y configuración de redes.",
      icon: Network,
      count: 8,
      href: "/ofertas?rubro=redes",
    },
    {
      title: "Soporte técnico",
      description: "Asistencia técnica, mantenimiento de equipos y sistemas.",
      icon: Wrench,
      count: 12,
      href: "/ofertas?rubro=soporte",
    },
    {
      title: "Diseño web",
      description: "Diseño UI/UX, desarrollo frontend y experiencia de usuario.",
      icon: Palette,
      count: 6,
      href: "/ofertas?rubro=diseno",
    },
    {
      title: "Electrónica",
      description: "Proyectos de electrónica, automatización y control.",
      icon: CircuitBoard,
      count: 5,
      href: "/ofertas?rubro=electronica",
    },
    {
      title: "Mecánica",
      description: "Mantenimiento industrial, diseño mecánico y más.",
      icon: Cog,
      count: 4,
      href: "/ofertas?rubro=mecanica",
    },
  ];

  const testimonials = [
    {
      name: "María González",
      specialization: "Informática",
      year: "6to año - 2024",
      quote: "Gracias a esta plataforma conseguí mi primera práctica profesionalizante en una empresa de software. El equipo me ayudó con mi CV y ahora trabajo part-time mientras estudio.",
    },
    {
      name: "Lucas Fernández",
      specialization: "Electrónica",
      year: "Egresado 2024",
      quote: "Encontré un trabajo perfecto que se adaptaba a mi horario. Me contrataron en una empresa de automatización y pude terminar mis estudios sin problema.",
    },
  ];

  const handleSearch = (query: string, rubro: string, jornada: string, ubicacion: string) => {
    console.log("Búsqueda:", { query, rubro, jornada, ubicacion });
  };

  const handleViewDetails = (id: string) => {
    setSelectedJobId(id);
    console.log("Ver detalles del trabajo:", id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SearchHero onSearch={handleSearch} />

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4" data-testid="text-featured-title">
              Ofertas destacadas
            </h2>
            <p className="text-muted-foreground text-lg">
              Oportunidades recientes para estudiantes técnicos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} onViewDetails={handleViewDetails} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/ofertas">
              <Button size="lg" data-testid="button-view-all-jobs">
                Ver todas las ofertas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4" data-testid="text-categories-title">
              Explorá por rubro
            </h2>
            <p className="text-muted-foreground text-lg">
              Encontrá empleos relacionados con tu especialidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4" data-testid="text-how-it-works-title">
              ¿Cómo funciona?
            </h2>
            <p className="text-muted-foreground text-lg">
              Conseguí tu trabajo en tres simples pasos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 text-primary rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center">
                <Upload className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl">1. Subí tu CV</h3>
              <p className="text-muted-foreground">
                Cargá tu currículum en PDF con tu información técnica y experiencia
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/10 text-primary rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center">
                <FileText className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl">2. Buscá ofertas</h3>
              <p className="text-muted-foreground">
                Explorá empleos por especialidad, ubicación y tipo de jornada
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/10 text-primary rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center">
                <Scale className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl">3. Conocé tus derechos</h3>
              <p className="text-muted-foreground">
                Informate sobre pasantías, prácticas y trabajo en blanco
              </p>
            </div>
          </div>

          <div className="mt-12 text-center space-x-4">
            <Link href="/subi-tu-cv">
              <Button size="lg" data-testid="button-upload-cv">
                Subir mi CV
              </Button>
            </Link>
            <Link href="/derechos">
              <Button size="lg" variant="outline" data-testid="button-learn-rights">
                Conocer mis derechos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4" data-testid="text-testimonials-title">
              Historias de éxito
            </h2>
            <p className="text-muted-foreground text-lg">
              Estudiantes que consiguieron trabajo mientras estudiaban
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
