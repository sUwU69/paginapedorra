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
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContactMessage } from "@shared/schema";

export default function Contacto() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensaje enviado",
        description: "Te responderemos a la brevedad",
      });
      setFormData({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
      });
    },
    onError: () => {
      toast({
        title: "Error al enviar mensaje",
        description: "Hubo un problema. Intentá nuevamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData as InsertContactMessage);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4" data-testid="text-page-title">
            Contacto
          </h1>
          <p className="text-lg opacity-95">
            Estamos para ayudarte. Envianos tu consulta o sugerencia
          </p>
        </div>
      </div>

      <div className="flex-1 bg-background py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Envianos un mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo *</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                        data-testid="input-nombre"
                      />
                    </div>

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
                      <Label htmlFor="asunto">Asunto *</Label>
                      <Select
                        value={formData.asunto}
                        onValueChange={(value) => setFormData({ ...formData, asunto: value })}
                      >
                        <SelectTrigger id="asunto" data-testid="select-asunto">
                          <SelectValue placeholder="Seleccioná el motivo de tu consulta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulta-general">Consulta general</SelectItem>
                          <SelectItem value="problema-tecnico">Problema técnico</SelectItem>
                          <SelectItem value="oferta-empleo">Publicar oferta de empleo</SelectItem>
                          <SelectItem value="derechos-laborales">Consulta sobre derechos laborales</SelectItem>
                          <SelectItem value="sugerencia">Sugerencia</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje *</Label>
                      <Textarea
                        id="mensaje"
                        placeholder="Contanos tu consulta o sugerencia..."
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        rows={6}
                        required
                        data-testid="textarea-mensaje"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending} data-testid="button-submit">
                      <Send className="w-5 h-5 mr-2" />
                      {mutation.isPending ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Información de contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Dirección</p>
                      <p className="text-sm text-muted-foreground">
                        Av. Paseo Colón 650
                        <br />
                        C1063ACD, CABA
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Teléfono</p>
                      <p className="text-sm text-muted-foreground">011 4361-5309</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="text-sm text-muted-foreground">info@ottokrause.edu.ar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Horarios de atención</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">Lunes a Viernes</p>
                    <p className="text-sm text-muted-foreground">8:00 a 18:00 hs</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Sábados</p>
                    <p className="text-sm text-muted-foreground">Cerrado</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Domingos y feriados</p>
                    <p className="text-sm text-muted-foreground">Cerrado</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Para empresas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Si sos una empresa y querés publicar ofertas de empleo para nuestros estudiantes, escribinos
                    a:
                  </p>
                  <p className="text-sm font-semibold">empresas@ottokrause.edu.ar</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
