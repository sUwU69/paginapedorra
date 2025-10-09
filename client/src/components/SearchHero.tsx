import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchHeroProps {
  onSearch?: (query: string, rubro: string, jornada: string, ubicacion: string) => void;
}

export default function SearchHero({ onSearch }: SearchHeroProps) {
  const [query, setQuery] = useState("");
  const [rubro, setRubro] = useState("");
  const [jornada, setJornada] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleSearch = () => {
    console.log("Buscando:", { query, rubro, jornada, ubicacion });
    onSearch?.(query, rubro, jornada, ubicacion);
  };

  return (
    <div className="relative bg-gradient-to-br from-primary via-primary/95 to-chart-2 text-primary-foreground">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl" data-testid="text-hero-title">
              ¿Qué trabajo estás buscando?
            </h1>
            <p className="text-lg md:text-xl opacity-95" data-testid="text-hero-subtitle">
              Encontrá empleos compatibles con tu especialización técnica y horario de estudio
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="lg:col-span-2">
                <Input
                  type="search"
                  placeholder="Buscar por puesto o empresa..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 bg-white text-foreground"
                  data-testid="input-search-query"
                />
              </div>
              <Select value={rubro} onValueChange={setRubro}>
                <SelectTrigger className="h-12 bg-white text-foreground" data-testid="select-rubro">
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
              <Select value={jornada} onValueChange={setJornada}>
                <SelectTrigger className="h-12 bg-white text-foreground" data-testid="select-jornada">
                  <SelectValue placeholder="Jornada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="pasantia">Pasantía</SelectItem>
                  <SelectItem value="practica">Práctica profesionalizante</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <Select value={ubicacion} onValueChange={setUbicacion}>
                  <SelectTrigger className="h-12 bg-white text-foreground" data-testid="select-ubicacion">
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
              <Button
                size="lg"
                className="h-12 bg-chart-2 hover:bg-chart-2/90 text-white font-semibold"
                onClick={handleSearch}
                data-testid="button-search"
              >
                <Search className="w-5 h-5 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
