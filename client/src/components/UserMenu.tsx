import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, UserCircle, Building2, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function UserMenu() {
  const { user, isAuthenticated, isLoading, clearAuth } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive"
      });
    }
  });

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" className="text-primary-foreground hover:bg-white/10">
            Iniciar sesión
          </Button>
        </Link>
        <Link href="/register">
          <Button className="bg-white text-primary hover:bg-white/90">
            Registrarse
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative flex items-center gap-2 text-primary-foreground hover:bg-white/10"
        >
          <UserCircle className="h-5 w-5" />
          <span className="hidden md:inline">{user?.companyName || user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        
        {user?.role === "company" && (
          <DropdownMenuItem asChild>
            <Link href="/company/jobs" className="flex items-center gap-2 cursor-pointer">
              <Building2 className="h-4 w-4" />
              <span>Gestionar Ofertas</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        {user?.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
              <Shield className="h-4 w-4" />
              <span>Panel de Admin</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}