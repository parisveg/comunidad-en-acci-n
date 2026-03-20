import { useState, useEffect } from "react";
import { mockEvents, VolunteerEvent } from "@/data/events";

const STORAGE_KEY = "volunteer-events";

function loadEvents(): VolunteerEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [...mockEvents];
}

export function useEvents() {
  const [events, setEvents] = useState<VolunteerEvent[]>(loadEvents);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  return [events, setEvents] as const;
}
