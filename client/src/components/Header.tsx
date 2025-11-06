import { Link, useLocation } from "wouter";
import { Menu, X, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { UserMenu } from "@/components/UserMenu";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Ofertas de empleo", path: "/ofertas" },
    { label: "Subí tu CV", path: "/subi-tu-cv" },
    { label: "Rubros / Áreas", path: "/rubros" },
    { label: "Derechos laborales", path: "/derechos" },
    { label: "Contacto", path: "/contacto" },
    ...(user?.role === "admin" ? [{ label: "Panel Admin", path: "/admin" }] : []),
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
            <div className="bg-primary-foreground text-primary rounded-full p-2">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-lg leading-tight" data-testid="text-site-title">
                Trabajo + Estudio
              </div>
              <div className="text-xs opacity-90">EEST N°1 Otto Krause</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`text-primary-foreground hover:bg-white/10 ${
                    isActive(item.path) ? "bg-white/20" : ""
                  }`}
                  data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <UserMenu />
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/20">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-primary-foreground hover:bg-white/10 ${
                    isActive(item.path) ? "bg-white/20" : ""
                  }`}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              <UserMenu />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
