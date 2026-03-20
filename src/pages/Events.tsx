import { useState } from "react";
import { useEvents } from "@/hooks/use-events";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Events = () => {
  const [events] = useEvents();
  const [search, setSearch] = useState("");

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12">
      <div className="container">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-center mb-2">Eventos disponibles</h1>
        <p className="text-center text-muted-foreground mb-8">
          Encuentra una actividad donde puedas hacer la diferencia
        </p>

        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o ubicación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            Aún no hay eventos publicados. Muy pronto habrá nuevas oportunidades para participar.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e) => (
              <EventCard key={e.id} event={e} showParticipate />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
