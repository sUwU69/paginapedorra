import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, FileText, Shield, Clock, DollarSign, GraduationCap } from "lucide-react";

export default function Derechos() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4" data-testid="text-page-title">
            Derechos laborales estudiantiles
          </h1>
          <p className="text-lg opacity-95">
            Conocé tus derechos y obligaciones al trabajar mientras estudiás
          </p>
        </div>
      </div>

      <div className="flex-1 bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 bg-card rounded-lg p-6">
            <p className="text-lg leading-relaxed">
              Como estudiante técnico, es fundamental que conozcas tus derechos laborales, especialmente cuando
              realizás prácticas profesionalizantes, pasantías o trabajos en blanco. Esta información te ayudará
              a proteger tus intereses y asegurar condiciones justas de trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6 text-center space-y-3">
                <div className="bg-primary/10 text-primary rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold">Protección legal</h3>
                <p className="text-sm text-muted-foreground">
                  Estás amparado por la Ley de Contrato de Trabajo
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-3">
                <div className="bg-primary/10 text-primary rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold">Horario flexible</h3>
                <p className="text-sm text-muted-foreground">
                  Tu trabajo debe ser compatible con tu cursada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-3">
                <div className="bg-primary/10 text-primary rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold">Remuneración justa</h3>
                <p className="text-sm text-muted-foreground">
                  Derecho a cobrar por tu trabajo realizado
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading font-bold text-3xl" data-testid="text-section-title">
              Preguntas frecuentes
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="pasantias" className="bg-card rounded-lg border px-6" data-testid="accordion-pasantias">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-heading font-semibold text-left">¿Qué son las pasantías educativas?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3 pt-4">
                  <p>
                    Las pasantías educativas están reguladas por la Ley 26.427. Son experiencias formativas en
                    empresas u organismos públicos que complementan tu formación técnica.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Duración máxima: 2 años</li>
                    <li>Asignación estímulo mensual obligatoria</li>
                    <li>Cobertura de obra social</li>
                    <li>Seguro de accidentes personales</li>
                    <li>No reemplazan puestos de trabajo efectivos</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="practicas" className="bg-card rounded-lg border px-6" data-testid="accordion-practicas">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="font-heading font-semibold text-left">
                      ¿Qué son las prácticas profesionalizantes?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3 pt-4">
                  <p>
                    Las prácticas profesionalizantes son parte del plan de estudios de escuelas técnicas. Te permiten
                    aplicar tus conocimientos en contextos reales de trabajo.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Coordinadas entre la escuela y la empresa</li>
                    <li>Parte obligatoria de tu formación técnica</li>
                    <li>Pueden ser remuneradas o no remuneradas</li>
                    <li>Supervisadas por docentes y tutores empresariales</li>
                    <li>Certificadas por la institución educativa</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="trabajo-blanco" className="bg-card rounded-lg border px-6" data-testid="accordion-trabajo-blanco">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-primary" />
                    <span className="font-heading font-semibold text-left">¿Qué es el trabajo en blanco?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3 pt-4">
                  <p>
                    El trabajo "en blanco" o registrado es aquel donde estás debidamente inscrito en el sistema
                    de seguridad social. Esto te garantiza derechos laborales completos.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Aportes jubilatorios</li>
                    <li>Obra social para vos y tu familia</li>
                    <li>Asignaciones familiares</li>
                    <li>Protección ante despido</li>
                    <li>Vacaciones pagas</li>
                    <li>Aguinaldo (sueldo anual complementario)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="jornada" className="bg-card rounded-lg border px-6" data-testid="accordion-jornada">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-heading font-semibold text-left">
                      ¿Cuántas horas puedo trabajar como estudiante?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3 pt-4">
                  <p>
                    La jornada laboral para menores de 18 años tiene restricciones específicas según la legislación
                    argentina (Ley 20.744):
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Menores de 16 años: NO pueden trabajar</li>
                    <li>Entre 16 y 18 años: máximo 6 horas diarias o 36 horas semanales</li>
                    <li>No pueden realizar tareas nocturnas (20:00 a 6:00)</li>
                    <li>No pueden trabajar horas extras</li>
                    <li>Mayores de 18: jornada normal de 8 horas diarias o 48 semanales</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="remuneracion" className="bg-card rounded-lg border px-6" data-testid="accordion-remuneracion">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className="font-heading font-semibold text-left">
                      ¿Cuánto debo cobrar?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3 pt-4">
                  <p>
                    Tu remuneración debe respetar los convenios colectivos de trabajo del sector y nunca puede ser
                    inferior al Salario Mínimo Vital y Móvil (SMVM) proporcional a las horas trabajadas.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Part-time: proporción del salario según horas trabajadas</li>
                    <li>Pasantías: asignación estímulo equivalente al SMVM</li>
                    <li>Prácticas profesionalizantes: pueden ser no remuneradas si son parte del plan de estudios</li>
                    <li>Trabajo registrado: salario del convenio colectivo correspondiente</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-8">
            <h3 className="font-heading font-bold text-xl mb-4">¿Necesitás asesoramiento legal?</h3>
            <p className="text-muted-foreground mb-6">
              Si tenés dudas sobre tus derechos laborales o enfrentás una situación irregular en tu trabajo,
              podés contactar a:
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <strong>Ministerio de Trabajo de la Nación:</strong>{" "}
                <a
                  href="https://www.argentina.gob.ar/trabajo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.argentina.gob.ar/trabajo
                </a>
              </li>
              <li>
                <strong>Línea gratuita:</strong> 0800-666-4100
              </li>
              <li>
                <strong>Orientación laboral Otto Krause:</strong> orientacion@ottokrause.edu.ar
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" data-testid="button-download-guide">
              <FileText className="w-5 h-5 mr-2" />
              Descargar guía completa (PDF)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
