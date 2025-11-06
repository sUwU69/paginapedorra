import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@shared/auth";

const AUTH_QUERY_KEY = ["api", "auth", "me"] as const;

const useAuth = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading, isError, error } = useQuery<User | null>({
    queryKey: AUTH_QUERY_KEY,
    staleTime: 1000 * 60, // 1 minuto
    retry: 1,
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    if (error || isError) {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
    }
  }, [error, isError, queryClient]);

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: !!user && !isError,
    clearAuth: () => queryClient.setQueryData(AUTH_QUERY_KEY, null)
  };
};

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      setLocation("/");
    }
  }, [isAuthenticated, user, setLocation]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}

export function CompanyRoute({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "company" || !user.companyVerified) {
      setLocation("/");
    }
  }, [isAuthenticated, user, setLocation]);

  if (!isAuthenticated || user?.role !== "company" || !user.companyVerified) {
    return null;
  }

  return <>{children}</>;
}

export { useAuth };