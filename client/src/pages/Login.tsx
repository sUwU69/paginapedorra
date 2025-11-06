import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      const userData = await response.json();
      return userData;
    },
    onSuccess: (data) => {
      // Actualizar la caché con los datos del usuario
      queryClient.setQueryData(["api", "auth", "me"], data.user);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente",
      });
      setLocation("/");
    },
    onError: (error: any) => {
      console.error("Error en login:", error);
      const errorMessage = error?.message || "Error al iniciar sesión";
      // Limpiar la caché de autenticación
      queryClient.setQueryData(["api", "auth", "me"], null);
      toast({
        title: "Error al iniciar sesión",
        description: errorMessage.includes("401") ? "Las credenciales son incorrectas" : errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      });
      return;
    }
    if (formData.password.length < 1) {
      toast({
        title: "Error de validación",
        description: "La contraseña no puede estar vacía",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className="container mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}