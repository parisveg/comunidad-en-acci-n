import { useState } from "react";
import { VolunteerEvent, EventActivity } from "@/data/events";
import { useEvents } from "@/hooks/use-events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Pencil, Trash2, X, Users } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Staff = () => {
  const [events, setEvents] = useState<VolunteerEvent[]>([...mockEvents]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<VolunteerEvent | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [volunteersNeeded, setVolunteersNeeded] = useState("");
  const [activities, setActivities] = useState<EventActivity[]>([]);
  const [newActivity, setNewActivity] = useState("");

  const resetForm = () => {
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
    setVolunteersNeeded("");
    setActivities([]);
    setNewActivity("");
    setEditing(null);
  };

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (ev: VolunteerEvent) => {
    setEditing(ev);
    setTitle(ev.title);
    setDate(ev.date);
    setTime(ev.time);
    setLocation(ev.location);
    setDescription(ev.fullDescription);
    setVolunteersNeeded(String(ev.volunteersNeeded));
    setActivities([...ev.activities]);
    setDialogOpen(true);
  };

  const addActivity = () => {
    if (!newActivity.trim()) return;
    setActivities((prev) => [...prev, { id: crypto.randomUUID(), name: newActivity.trim() }]);
    setNewActivity("");
  };

  const removeActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSave = () => {
    if (!title.trim() || !date || !time || !location.trim() || !description.trim() || !volunteersNeeded) {
      toast.error("Completa todos los campos.");
      return;
    }

    const eventData: VolunteerEvent = {
      id: editing?.id || crypto.randomUUID(),
      title: title.trim(),
      date,
      time,
      location: location.trim(),
      description: description.trim().slice(0, 120),
      fullDescription: description.trim(),
      volunteersRegistered: editing?.volunteersRegistered || 0,
      volunteersNeeded: Number(volunteersNeeded),
      activities,
    };

    if (editing) {
      setEvents((prev) => prev.map((e) => (e.id === editing.id ? eventData : e)));
      toast.success("Evento actualizado.");
    } else {
      setEvents((prev) => [eventData, ...prev]);
      toast.success("Evento creado.");
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.success("Evento eliminado.");
  };

  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold">Panel de gestión</h1>
            <p className="text-muted-foreground text-sm">Administra eventos y voluntarios</p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-1" /> Crear evento
          </Button>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            Aún no hay eventos publicados. Muy pronto habrá nuevas oportunidades para participar.
          </p>
        ) : (
          <div className="space-y-4">
            {events.map((ev) => {
              const progress = (ev.volunteersRegistered / ev.volunteersNeeded) * 100;
              return (
                <Card key={ev.id} className="bg-card">
                  <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-foreground truncate">{ev.title}</h3>
                      <p className="text-sm text-muted-foreground">{ev.date} · {ev.location}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{ev.volunteersRegistered} / {ev.volunteersNeeded}</span>
                        <Progress value={progress} className="h-2 flex-1 max-w-[120px]" />
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => openEdit(ev)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(ev.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">{editing ? "Editar evento" : "Crear evento"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Input placeholder="Título del evento" value={title} onChange={(e) => setTitle(e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <Input placeholder="Ubicación" value={location} onChange={(e) => setLocation(e.target.value)} />
              <Textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
              <Input
                type="number"
                placeholder="Voluntarios requeridos"
                value={volunteersNeeded}
                onChange={(e) => setVolunteersNeeded(e.target.value)}
                min="1"
              />

              {/* Activities */}
              <div>
                <p className="font-heading font-semibold text-sm mb-2">Actividades</p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Nueva actividad"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addActivity())}
                  />
                  <Button type="button" size="sm" variant="secondary" onClick={addActivity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {activities.map((a) => (
                    <div key={a.id} className="flex items-center justify-between bg-background rounded-lg px-3 py-2 text-sm">
                      <span>{a.name}</span>
                      <button onClick={() => removeActivity(a.id)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={handleSave}>
                Guardar evento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Staff;
