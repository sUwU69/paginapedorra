import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, SlidersHorizontal, MapPin, Clock, Briefcase, FileText } from "lucide-react";
import type { Job } from "@shared/schema";

export default function Ofertas() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [selectedRubro, setSelectedRubro] = useState(searchParams.get("rubro") || "");
  const [selectedJornada, setSelectedJornada] = useState(searchParams.get("jornada") || "");
  const [selectedUbicacion, setSelectedUbicacion] = useState(searchParams.get("ubicacion") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(searchParams.get("jobId"));

  const queryString = new URLSearchParams({
    ...(searchQuery && { query: searchQuery }),
    ...(selectedRubro && { rubro: selectedRubro }),
    ...(selectedJornada && { jornada: selectedJornada }),
    ...(selectedUbicacion && { ubicacion: selectedUbicacion }),
  }).toString();

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs", queryString],
    queryFn: async () => {
      const response = await fetch(`/api/jobs?${queryString}`);
      if (!response.ok) throw new Error("Error al cargar ofertas");
      return response.json();
    },
  });

  const selectedJob = jobs.find(job => job.id === selectedJobId);

  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    setSearchQuery(params.get("query") || "");
    setSelectedRubro(params.get("rubro") || "");
    setSelectedJornada(params.get("jornada") || "");
    setSelectedUbicacion(params.get("ubicacion") || "");
    setSelectedJobId(params.get("jobId"));
  }, [location]);

  const handleSearch = () => {
    console.log("Buscando con filtros:", { searchQuery, selectedRubro, selectedJornada, selectedUbicacion });
  };

  const rubroMapping: { [key: string]: string } = {
    "programacion": "Programación",
    "redes": "Redes",
    "soporte": "Soporte técnico",
    "diseno": "Diseño web",
    "electronica": "Electrónica",
    "mecanica": "Mecánica",
  };

  const jornadaMapping: { [key: string]: string } = {
    "part-time": "Part-time",
    "full-time": "Full-time",
    "pasantia": "Pasantía",
    "practica": "Práctica profesionalizante",
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

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 ${showFilters || window.innerWidth >= 768 ? '' : 'hidden md:grid'}`}>
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
              {isLoading ? "Cargando..." : `Mostrando ${jobs.length} ofertas`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} onViewDetails={(id) => setSelectedJobId(id)} />
            ))}
          </div>

          {!isLoading && jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No se encontraron ofertas con los filtros seleccionados
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedJobId} onOpenChange={() => setSelectedJobId(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">{selectedJob.title}</DialogTitle>
                <DialogDescription className="text-base">{selectedJob.company}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedJob.jobType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedJob.specialization}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Descripción</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedJob.description}</p>
                </div>

                {selectedJob.requirements && (
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Requisitos</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedJob.requirements}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1" data-testid="button-apply">
                    <FileText className="w-4 h-4 mr-2" />
                    Postularme
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedJobId(null)} data-testid="button-close">
                    Cerrar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
