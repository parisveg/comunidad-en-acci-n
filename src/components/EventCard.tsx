import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { VolunteerEvent } from "@/data/events";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Progress } from "@/components/ui/progress";

interface Props {
  event: VolunteerEvent;
  showParticipate?: boolean;
}

const EventCard = ({ event, showParticipate }: Props) => {
  const dateObj = new Date(event.date + "T" + event.time);
  const progress = (event.volunteersRegistered / event.volunteersNeeded) * 100;
  const spotsLeft = event.volunteersNeeded - event.volunteersRegistered;

  return (
    <Card className="overflow-hidden bg-card border hover:shadow-lg transition-shadow duration-300 group">
      <CardContent className="p-6 flex flex-col gap-3">
        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

        <div className="flex flex-col gap-2 text-sm text-foreground/70">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            {format(dateObj, "d 'de' MMMM, yyyy · HH:mm", { locale: es })} hrs
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-secondary" />
            {event.location}
          </span>
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {event.volunteersRegistered} / {event.volunteersNeeded} voluntarios
            </span>
            <span>{spotsLeft} cupos</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex gap-2 mt-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/eventos/${event.id}`}>Ver detalles</Link>
          </Button>
          {showParticipate && (
            <Button variant="secondary" size="sm" className="flex-1" asChild>
              <Link to={`/eventos/${event.id}`}>Participar</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
