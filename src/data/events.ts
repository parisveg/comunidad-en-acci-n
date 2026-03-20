export interface EventActivity {
  id: string;
  name: string;
}

export interface VolunteerEvent {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  volunteersRegistered: number;
  volunteersNeeded: number;
  activities: EventActivity[];
  image?: string;
}

export const mockEvents: VolunteerEvent[] = [
  {
    id: "1",
    title: "Limpieza del Parque Central",
    description: "Jornada comunitaria de limpieza y embellecimiento del parque principal de la ciudad.",
    fullDescription: "Únete a nuestra jornada de limpieza y revitalización del Parque Central. Trabajaremos juntos para recoger residuos, plantar flores y pintar bancas. Esta actividad busca devolver la belleza a uno de los espacios públicos más queridos de nuestra comunidad. No necesitas experiencia previa, solo ganas de ayudar.",
    date: "2026-04-05",
    time: "08:00",
    location: "Parque Central, Av. Libertad 120",
    volunteersRegistered: 12,
    volunteersNeeded: 20,
    activities: [
      { id: "a1", name: "Recolección de residuos" },
      { id: "a2", name: "Plantación de flores" },
      { id: "a3", name: "Pintura de bancas" },
      { id: "a4", name: "Limpieza de fuentes" },
    ],
  },
  {
    id: "2",
    title: "Taller de Lectura para Niños",
    description: "Actividad de lectura y cuentacuentos para niños de comunidades vulnerables.",
    fullDescription: "Organiza y participa en un hermoso taller de lectura dirigido a niños entre 5 y 12 años de comunidades vulnerables. Los voluntarios leerán cuentos, realizarán actividades lúdicas y fomentarán el amor por la lectura. Cada niño recibirá un libro para llevar a casa.",
    date: "2026-04-12",
    time: "10:00",
    location: "Biblioteca Municipal, Calle 5 de Mayo 45",
    volunteersRegistered: 8,
    volunteersNeeded: 15,
    activities: [
      { id: "b1", name: "Lectura de cuentos" },
      { id: "b2", name: "Actividades lúdicas" },
      { id: "b3", name: "Entrega de libros" },
    ],
  },
  {
    id: "3",
    title: "Comedor Comunitario Solidario",
    description: "Preparación y distribución de alimentos para personas en situación de calle.",
    fullDescription: "Ayuda a preparar y servir alimentos nutritivos para personas en situación de calle y familias de bajos recursos. Trabajaremos en equipo desde la preparación hasta el servicio. También entregaremos kits de higiene personal. Tu participación marca una diferencia real en la vida de quienes más lo necesitan.",
    date: "2026-04-20",
    time: "07:00",
    location: "Centro Comunitario La Esperanza, Col. Solidaridad",
    volunteersRegistered: 18,
    volunteersNeeded: 25,
    activities: [
      { id: "c1", name: "Preparación de alimentos" },
      { id: "c2", name: "Servicio de comida" },
      { id: "c3", name: "Entrega de kits de higiene" },
      { id: "c4", name: "Limpieza del comedor" },
    ],
  },
  {
    id: "4",
    title: "Campaña de Reforestación",
    description: "Plantación de árboles nativos en la reserva ecológica municipal.",
    fullDescription: "Participa en la plantación de más de 200 árboles nativos en la reserva ecológica de nuestra ciudad. Aprenderás sobre las especies locales, técnicas de plantación y la importancia de cuidar nuestros ecosistemas. Es una actividad ideal para familias y grupos de amigos que quieran aportar al medio ambiente.",
    date: "2026-05-03",
    time: "07:30",
    location: "Reserva Ecológica Municipal, Km 8 Carretera Norte",
    volunteersRegistered: 5,
    volunteersNeeded: 30,
    activities: [
      { id: "d1", name: "Preparación del terreno" },
      { id: "d2", name: "Plantación de árboles" },
      { id: "d3", name: "Riego inicial" },
      { id: "d4", name: "Colocación de protectores" },
    ],
  },
];
