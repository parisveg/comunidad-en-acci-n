import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Sparkles } from "lucide-react";
import { useEvents } from "@/hooks/use-events";
import EventCard from "@/components/EventCard";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-volunteers.jpg";

const Index = () => {
  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-6">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary">Asociación Civil</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
              Juntos hacemos<br />
              <span className="text-gradient">comunidad</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Participa en actividades que generan impacto real. Encuentra eventos, colabora y forma parte del cambio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" asChild>
                <Link to="/eventos">Ver eventos</Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/eventos">Convertirme en voluntario</Link>
              </Button>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
              <img src={heroImage} alt="Voluntarios trabajando juntos en comunidad" className="rounded-2xl shadow-xl w-full object-cover max-h-[360px]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: Users, value: "200+", label: "Voluntarios activos" },
              { icon: Sparkles, value: "45", label: "Eventos realizados" },
              { icon: Heart, value: "12", label: "Comunidades impactadas" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <s.icon className="h-8 w-8 text-secondary" />
                <span className="font-heading text-3xl font-extrabold text-foreground">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">Próximos Eventos</h2>
          <p className="text-center text-muted-foreground mb-10">Encuentra una oportunidad para aportar</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <EventCard event={e} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/eventos">Ver todos los eventos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Nuestra misión</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Somos una asociación civil dedicada a fortalecer la comunidad mediante actividades colaborativas, inclusivas y sostenibles impulsadas por voluntarios. Creemos que cada persona tiene el poder de generar un cambio positivo.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
