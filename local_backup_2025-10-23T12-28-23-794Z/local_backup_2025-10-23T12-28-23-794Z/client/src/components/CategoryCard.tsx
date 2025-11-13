import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  count: number;
  href: string;
}

export default function CategoryCard({ title, description, icon: Icon, count, href }: CategoryCardProps) {
  return (
    <Card className="hover-elevate active-elevate-2 h-full flex flex-col" data-testid={`card-category-${title.toLowerCase()}`}>
      <CardHeader className="space-y-3">
        <div className="bg-primary/10 text-primary rounded-full p-3 w-fit">
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="font-heading text-xl" data-testid={`text-category-title-${title.toLowerCase()}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-category-description-${title.toLowerCase()}`}>
          {description}
        </p>
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground" data-testid={`text-category-count-${title.toLowerCase()}`}>
            {count} ofertas disponibles
          </p>
          <Link href={href}>
            <Button variant="outline" className="w-full" data-testid={`button-view-jobs-${title.toLowerCase()}`}>
              Ver empleos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
