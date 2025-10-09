import { useState } from "react";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Ofertas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRubro, setSelectedRubro] = useState("");
  const [selectedJornada, setSelectedJornada] = useState("");
  const [selectedUbicacion, setSelectedUbicacion] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const allJobs = [
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
    {
      id: "4",
      title: "Programador Backend",
      company: "Innovatech",
      location: "Remoto",
      jobType: "Part-time",
      specialization: "Programación",
      description: "Desarrollo de APIs y servicios backend. Trabajo remoto con reuniones semanales.",
    },
    {
      id: "5",
      title: "Diseñador UI/UX",
      company: "Creative Studio",
      location: "CABA",
      jobType: "Práctica profesionalizante",
      specialization: "Diseño web",
      description: "Diseño de interfaces y experiencia de usuario. Práctica de 6 meses con posibilidad de contratación.",
    },
    {
      id: "6",
      title: "Técnico Electrónico",
      company: "AutoControl SRL",
      location: "Zona Sur",
      jobType: "Part-time",
      specialization: "Electrónica",
      description: "Mantenimiento de sistemas de automatización industrial. Horario de 4 horas diarias.",
    },
  ];

  const handleSearch = () => {
    console.log("Buscando con filtros:", { searchQuery, selectedRubro, selectedJornada, selectedUbicacion });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4" data-testid="text-page-title">
            Ofertas de empleo
          </h1>
          <p className="text-lg opacity-95">
            Encontrá oportunidades laborales compatibles con tus estudios
          </p>
        </div>
      </div>

      <div className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Buscar por puesto o empresa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                  data-testid="input-search"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="button-toggle-filters"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
              <Button size="lg" onClick={handleSearch} data-testid="button-search">
                <Search className="w-5 h-5 mr-2" />
                Buscar
              </Button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 ${showFilters || window.innerWidth >= 768 ? '' : 'hidden'}`}>
              <Select value={selectedRubro} onValueChange={setSelectedRubro}>
                <SelectTrigger className="h-12" data-testid="select-rubro">
                  <SelectValue placeholder="Rubro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programacion">Programación</SelectItem>
                  <SelectItem value="redes">Redes</SelectItem>
                  <SelectItem value="soporte">Soporte técnico</SelectItem>
                  <SelectItem value="diseno">Diseño web</SelectItem>
                  <SelectItem value="electronica">Electrónica</SelectItem>
                  <SelectItem value="mecanica">Mecánica</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedJornada} onValueChange={setSelectedJornada}>
                <SelectTrigger className="h-12" data-testid="select-jornada">
                  <SelectValue placeholder="Jornada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="pasantia">Pasantía</SelectItem>
                  <SelectItem value="practica">Práctica profesionalizante</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedUbicacion} onValueChange={setSelectedUbicacion}>
                <SelectTrigger className="h-12" data-testid="select-ubicacion">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="caba">CABA</SelectItem>
                  <SelectItem value="zona-norte">Zona Norte</SelectItem>
                  <SelectItem value="zona-sur">Zona Sur</SelectItem>
                  <SelectItem value="zona-oeste">Zona Oeste</SelectItem>
                  <SelectItem value="remoto">Remoto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground" data-testid="text-results-count">
              Mostrando {allJobs.length} ofertas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <JobCard key={job.id} {...job} onViewDetails={(id) => console.log("Ver detalles:", id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
