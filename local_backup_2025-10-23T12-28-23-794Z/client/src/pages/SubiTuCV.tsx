import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertCV } from "@shared/schema";

export default function SubiTuCV() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    especialidad: "",
    anio: "",
    descripcion: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: InsertCV) => {
      return await apiRequest("POST", "/api/cvs", data);
    },
    onSuccess: () => {
      toast({
        title: "CV enviado exitosamente",
        description: "Tu currículum ha sido cargado en nuestra base de datos",
      });
      
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        especialidad: "",
        anio: "",
        descripcion: "",
      });
      setFile(null);
    },
    onError: () => {
      toast({
        title: "Error al enviar CV",
        description: "Hubo un problema al cargar tu currículum. Intentá nuevamente.",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast({
          title: "Formato incorrecto",
          description: "Por favor, subí un archivo PDF",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Falta el CV",
        description: "Por favor, subí tu currículum en formato PDF",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate(formData as InsertCV);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4" data-testid="text-page-title">
            Subí tu CV
          </h1>
          <p className="text-lg opacity-95">
            Completá tu perfil y cargá tu currículum para que las empresas te encuentren
          </p>
        </div>
      </div>

      <div className="flex-1 bg-background py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Información personal</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre *</Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          required
                          data-testid="input-nombre"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido *</Label>
                        <Input
                          id="apellido"
                          value={formData.apellido}
                          onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                          required
                          data-testid="input-apellido"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono *</Label>
                        <Input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          required
                          data-testid="input-telefono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="especialidad">Especialidad *</Label>
                        <Select
                          value={formData.especialidad}
                          onValueChange={(value) => setFormData({ ...formData, especialidad: value })}
                        >
                          <SelectTrigger id="especialidad" data-testid="select-especialidad">
                            <SelectValue placeholder="Seleccioná tu especialidad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="informatica">Informática</SelectItem>
                            <SelectItem value="electronica">Electrónica</SelectItem>
                            <SelectItem value="mecanica">Mecánica</SelectItem>
                            <SelectItem value="construcciones">Construcciones</SelectItem>
                            <SelectItem value="quimica">Química</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="anio">Año *</Label>
                        <Select
                          value={formData.anio}
                          onValueChange={(value) => setFormData({ ...formData, anio: value })}
                        >
                          <SelectTrigger id="anio" data-testid="select-anio">
                            <SelectValue placeholder="Seleccioná tu año" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4to">4to año</SelectItem>
                            <SelectItem value="5to">5to año</SelectItem>
                            <SelectItem value="6to">6to año</SelectItem>
                            <SelectItem value="7mo">7mo año</SelectItem>
                            <SelectItem value="egresado">Egresado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción personal</Label>
                      <Textarea
                        id="descripcion"
                        placeholder="Contanos sobre vos, tus habilidades y qué tipo de trabajo buscás..."
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        rows={4}
                        data-testid="textarea-descripcion"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cv-file">Subir CV (PDF) *</Label>
                      <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover:border-primary transition-colors">
                        <input
                          id="cv-file"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          data-testid="input-file"
                        />
                        <label htmlFor="cv-file" className="cursor-pointer">
                          {file ? (
                            <div className="space-y-2">
                              <FileText className="w-12 h-12 mx-auto text-primary" />
                              <p className="font-semibold" data-testid="text-filename">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                              <p className="font-semibold">Hacé click para subir tu CV</p>
                              <p className="text-sm text-muted-foreground">Solo archivos PDF</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending} data-testid="button-submit">
                      {mutation.isPending ? "Enviando..." : "Enviar CV"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Consejos para tu CV</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Incluí tu información de contacto actualizada</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Destacá tus proyectos técnicos y prácticas</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Mencioná tus conocimientos técnicos específicos</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Agregá tu disponibilidad horaria</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Mantené el formato simple y profesional</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">¿Necesitás ayuda?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Si tenés dudas sobre cómo armar tu CV, consultá nuestra guía de consejos o contactate con
                    el equipo de orientación laboral de la escuela.
                  </p>
                  <Button variant="outline" className="w-full" data-testid="button-help">
                    Ver guía de CV
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
