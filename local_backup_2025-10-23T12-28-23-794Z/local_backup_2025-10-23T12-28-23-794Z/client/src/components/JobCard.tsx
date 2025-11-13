import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Briefcase } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  specialization: string;
  description: string;
  onViewDetails?: (id: string) => void;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  jobType,
  specialization,
  description,
  onViewDetails,
}: JobCardProps) {
  return (
    <Card className="hover-elevate active-elevate-2 h-full flex flex-col" data-testid={`card-job-${id}`}>
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="font-heading text-xl mb-1" data-testid={`text-job-title-${id}`}>
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground" data-testid={`text-company-${id}`}>
              {company}
            </p>
          </div>
          <div className="bg-primary/10 text-primary rounded-full p-2 flex-shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" data-testid={`badge-specialization-${id}`}>
            {specialization}
          </Badge>
          <Badge variant="outline" data-testid={`badge-job-type-${id}`}>
            {jobType}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-foreground leading-relaxed" data-testid={`text-description-${id}`}>
          {description}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span data-testid={`text-location-${id}`}>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{jobType}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          className="w-full"
          onClick={() => onViewDetails?.(id)}
          data-testid={`button-view-details-${id}`}
        >
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
