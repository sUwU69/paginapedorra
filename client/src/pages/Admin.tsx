import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { User } from "@shared/auth";
import type { CV } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function AdminPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
    error: usersFetchError,
  } = useQuery<User[], Error>({
    queryKey: ["api", "auth", "users"],
    placeholderData: [],
    retry: 1,
  });

  const {
    data: cvs = [],
    isLoading: cvsLoading,
    isError: cvsError,
    error: cvsFetchError,
  } = useQuery<CV[], Error>({
    queryKey: ["api", "cvs"],
    placeholderData: [],
    retry: 1,
  });

  // show toasts for fetch errors
  if (usersError) {
    toast({ title: "Error al obtener usuarios", description: String(usersFetchError), variant: "destructive" });
  }
  if (cvsError) {
    toast({ title: "Error al obtener CVs", description: String(cvsFetchError), variant: "destructive" });
  }

  // Mutations
  const verifyCompanyMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await apiRequest("POST", `/api/auth/verify-company/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api", "auth", "users"] });
      toast({
        title: "Empresa verificada",
        description: "La empresa ha sido verificada exitosamente",
      });
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      return await apiRequest("POST", `/api/auth/update-role/${userId}`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api", "auth", "users"] });
      toast({
        title: "Rol actualizado",
        description: "El rol del usuario ha sido actualizado exitosamente",
      });
    },
  });

  const renameCVMutation = useMutation({
    mutationFn: async ({ cvId, newName }: { cvId: string; newName: string }) => {
      return await apiRequest("POST", `/api/cvs/${cvId}/rename`, { newName });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api", "cvs"] });
      toast({
        title: "Archivo renombrado",
        description: "El CV ha sido renombrado exitosamente",
      });
    },
  });

  const deleteCVMutation = useMutation({
    mutationFn: async (cvId: string) => {
      return await apiRequest("DELETE", `/api/cvs/${cvId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api", "cvs"] });
      toast({
        title: "CV eliminado",
        description: "El CV ha sido eliminado exitosamente",
      });
    },
  });

  // Show loading only while BOTH main resources are loading. If one is ready show the UI
  if (usersLoading && cvsLoading) {
    return <div>Cargando...</div>;
  }

  // If either query errored, show a small retry UI
  if (usersError || cvsError) {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-xl font-semibold mb-4">Error al cargar datos</h2>
        <p className="mb-4">Hubo un problema al obtener los datos del servidor.</p>
        <div className="flex gap-2">
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["api", "auth", "users"] })}>
            Reintentar usuarios
          </Button>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["api", "cvs"] })}>
            Reintentar CVs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      <Tabs defaultValue="users" className="mb-8">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="cvs">CVs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="rounded-md border">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge>{user.role}</Badge>
                </TableCell>
                <TableCell>{user.companyName || "-"}</TableCell>
                <TableCell>
                  {user.role === "company" && (
                    <Badge variant={user.companyVerified ? "secondary" : "destructive"}>
                      {user.companyVerified ? "Verificada" : "Pendiente"}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {user.role === "company" && !user.companyVerified && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => verifyCompanyMutation.mutate(user.id)}
                    >
                      Verificar empresa
                    </Button>
                  )}
                  {user.role !== "admin" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      onClick={() =>
                        updateRoleMutation.mutate({
                          userId: user.id,
                          role: user.role === "company" ? "user" : "company",
                        })
                      }
                    >
                      Cambiar rol
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TabsContent>

        <TabsContent value="cvs" className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>Archivo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cvs?.map((cv) => (
                <TableRow key={cv.id}>
                  <TableCell>{cv.nombre}</TableCell>
                  <TableCell>{cv.apellido}</TableCell>
                  <TableCell>{cv.email}</TableCell>
                  <TableCell>{cv.especialidad}</TableCell>
                  <TableCell>
                    {cv.cvFileName ? (
                      <a
                        href={`/api/cvs/${cv.id}/download`}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cv.cvFileName}
                      </a>
                    ) : (
                      "Sin archivo"
                    )}
                  </TableCell>
                  <TableCell className="space-x-2">
                    {cv.cvFileName && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newName = window.prompt("Nuevo nombre para el archivo:", cv.cvFileName || "");
                            if (newName) {
                              const trimmedName = newName.trim();
                              if (trimmedName) {
                                renameCVMutation.mutate({ cvId: cv.id, newName: trimmedName });
                              }
                            }
                          }}
                        >
                          Renombrar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("¿Estás seguro de que quieres eliminar este CV?")) {
                              deleteCVMutation.mutate(cv.id);
                            }
                          }}
                        >
                          Eliminar
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}