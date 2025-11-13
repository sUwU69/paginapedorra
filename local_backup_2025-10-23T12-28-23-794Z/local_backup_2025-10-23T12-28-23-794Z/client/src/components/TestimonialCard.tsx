import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  specialization: string;
  year: string;
  quote: string;
}

export default function TestimonialCard({ name, specialization, year, quote }: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="h-full" data-testid={`card-testimonial-${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardContent className="pt-6 space-y-4">
        <Quote className="w-8 h-8 text-primary/30" />
        <p className="text-sm leading-relaxed italic" data-testid={`text-quote-${name.toLowerCase().replace(/\s+/g, "-")}`}>
          "{quote}"
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm" data-testid={`text-name-${name.toLowerCase().replace(/\s+/g, "-")}`}>
              {name}
            </p>
            <p className="text-xs text-muted-foreground" data-testid={`text-info-${name.toLowerCase().replace(/\s+/g, "-")}`}>
              {specialization} - {year}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
