import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: myCV, isLoading: myCVLoading } = useQuery("/api/cvs/me", async () => {
    const res = await fetch("/api/cvs/me", { credentials: "include" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Error fetching CV");
    return await res.json();
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const passwordMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/auth/change-password", data);
    },
    onSuccess: () => {
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada exitosamente",
      });
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: () => {
      toast({
        title: "Error al actualizar",
        description: "No se pudo actualizar tu contraseña. Por favor, intentá nuevamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error de validación",
        description: "Las contraseñas nuevas no coinciden",
        variant: "destructive",
      });
      return;
    }
    passwordMutation.mutate(formData);
  };

  const deleteMutation = useMutation({
    mutationFn: async (cvId: string) => {
      const res = await fetch(`/api/cvs/${cvId}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Error al eliminar CV");
      return true;
    },
    onSuccess: () => {
      toast({ title: "CV eliminado", description: "Tu CV fue eliminado" });
      queryClient.invalidateQueries({ queryKey: ["/api/cvs/me"] });
      queryClient.invalidateQueries({ queryKey: ["api", "cvs"] });
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Mi Cuenta
          </h1>
          <p className="text-lg opacity-95">
            Administra tu información personal y preferencias
          </p>
        </div>
      </div>

      <div className="flex-1 bg-background py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nombre</Label>
                    <Input value={user?.name} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user?.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de cuenta</Label>
                    <Input 
                      value={user?.role === "company" ? "Empresa" : user?.role === "admin" ? "Administrador" : "Usuario"} 
                      disabled 
                    />
                  </div>
                  {user?.role === "company" && (
                    <div className="space-y-2">
                      <Label>Nombre de la empresa</Label>
                      <Input value={user?.companyName || ""} disabled />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Cambiar Contraseña</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña actual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, currentPassword: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva contraseña</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, newPassword: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={passwordMutation.isPending}
                    >
                      {passwordMutation.isPending
                        ? "Actualizando..."
                        : "Actualizar contraseña"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}