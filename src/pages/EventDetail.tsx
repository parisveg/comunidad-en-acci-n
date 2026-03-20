import { useParams, Link } from "react-router-dom";
import { useEvents } from "@/hooks/use-events";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, MapPin, Users, CheckCircle2, ArrowLeft, Phone, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const EventDetail = () => {
  const { id } = useParams();
  const [events, setEvents] = useEvents();
  const event = events.find((e) => e.id === id);
  const [phone, setPhone] = useState("");

  if (!event) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground text-lg">Evento no encontrado.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/eventos">Volver a eventos</Link>
        </Button>
      </div>
    );
  }

  const registeredPhones = event.registeredPhones ?? [];
  const dateObj = new Date(event.date + "T" + event.time);
  const progress = (event.volunteersRegistered / event.volunteersNeeded) * 100;

  // Check if the current phone input is already registered
  const currentPhoneRegistered = phone.trim().length >= 7 && registeredPhones.includes(phone.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = phone.trim();
    if (!trimmed || trimmed.length < 7) {
      toast.error("Por favor ingresa un número telefónico válido.");
      return;
    }
    if (registeredPhones.includes(trimmed)) {
      toast.error("Este número ya está registrado en este evento.");
      return;
    }
    setEvents(events.map((ev) =>
      ev.id === id
        ? {
            ...ev,
            volunteersRegistered: ev.volunteersRegistered + 1,
            registeredPhones: [...(ev.registeredPhones ?? []), trimmed],
          }
        : ev
    ));
    toast.success("¡Gracias por sumarte!");
  };

  const handleCancel = () => {
    const trimmed = phone.trim();
    setEvents(events.map((ev) =>
      ev.id === id
        ? {
            ...ev,
            volunteersRegistered: Math.max(0, ev.volunteersRegistered - 1),
            registeredPhones: (ev.registeredPhones ?? []).filter((p) => p !== trimmed),
          }
        : ev
    ));
    setPhone("");
    toast.success("Tu registro ha sido cancelado.");
  };

  return (
    <div className="py-10">
      <div className="container max-w-3xl">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/eventos">
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a eventos
          </Link>
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {event.title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 text-foreground/80">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {format(dateObj, "EEEE d 'de' MMMM, yyyy · HH:mm", { locale: es })} hrs
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                {event.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <section className="mb-8">
            <h2 className="font-heading text-xl font-bold mb-3">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">{event.fullDescription}</p>
          </section>

          {/* Activities */}
          <section className="mb-8">
            <h2 className="font-heading text-xl font-bold mb-3">Actividades del voluntariado</h2>
            <ul className="space-y-2">
              {event.activities.map((a) => (
                <li key={a.id} className="flex items-center gap-2 text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                  {a.name}
                </li>
              ))}
            </ul>
          </section>

          {/* Participation */}
          <section className="mb-8">
            <h2 className="font-heading text-xl font-bold mb-3">Participación</h2>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                {event.volunteersRegistered} de {event.volunteersNeeded} voluntarios registrados
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </section>

          {/* Registration */}
          <Card className="bg-card border">
            <CardContent className="p-6">
              {currentPhoneRegistered ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="h-12 w-12 text-secondary mx-auto mb-3" />
                  <h3 className="font-heading text-xl font-bold mb-2">¡Ya estás registrado!</h3>
                  <p className="text-muted-foreground mb-4">
                    Tu participación ayuda a hacer posible este evento.
                  </p>
                  <Button variant="destructive" onClick={handleCancel}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancelar registro
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-xl font-bold mb-4">Regístrate como voluntario</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Número telefónico"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                        type="tel"
                      />
                    </div>
                    <Button type="submit">Quiero participar</Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
