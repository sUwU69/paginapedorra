import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">EEST N°1 Otto Krause</h3>
            <p className="text-sm opacity-90 mb-4">
              Plataforma laboral para estudiantes de escuelas técnicas
            </p>
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Av. Paseo Colón 650, CABA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>011 4361-5309</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@ottokrause.edu.ar</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Enlaces útiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.argentina.gob.ar/trabajo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-90 hover:opacity-100 hover:underline"
                  data-testid="link-ministerio-trabajo"
                >
                  Ministerio de Trabajo
                </a>
              </li>
              <li>
                <a
                  href="https://www.argentina.gob.ar/trabajo/jovenes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-90 hover:opacity-100 hover:underline"
                  data-testid="link-normativa-laboral"
                >
                  Normativa laboral juvenil
                </a>
              </li>
              <li>
                <Link href="/derechos">
                  <a className="opacity-90 hover:opacity-100 hover:underline" data-testid="link-footer-derechos">
                    Derechos laborales estudiantiles
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contacto">
                  <a className="opacity-90 hover:opacity-100 hover:underline" data-testid="link-footer-contacto">
                    Contacto institucional
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Información</h3>
            <p className="text-sm opacity-90 mb-4">
              Esta plataforma fue diseñada para facilitar la inserción laboral de estudiantes técnicos,
              conectándolos con oportunidades acordes a su formación.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p data-testid="text-copyright">
            © 2025 - Desarrollado por los estudiantes de 6to Informática de la EEST N°1 Otto Krause
          </p>
        </div>
      </div>
    </footer>
  );
}
