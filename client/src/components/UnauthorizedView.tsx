import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export function UnauthorizedView() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Subí tu CV
          </h1>
          <p className="text-lg opacity-95">
            Completá tu perfil y cargá tu currículum para que las empresas te encuentren
          </p>
        </div>
      </div>

      <div className="flex-1 bg-background py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-6">
                  <UserCircle className="w-12 h-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">Necesitás una cuenta para subir tu CV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Para poder subir tu currículum y que las empresas puedan encontrarte, primero necesitás registrarte o iniciar sesión.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/register">
                  <Button className="w-full">Registrarme</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full">Ya tengo cuenta</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}