import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-8 mt-16">
    <div className="container text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Heart className="h-5 w-5 fill-primary text-primary" />
        <span className="font-heading font-bold text-foreground">Red Comunitaria de Voluntariado</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Somos una asociación civil dedicada a fortalecer la comunidad mediante actividades colaborativas, inclusivas y sostenibles.
      </p>
      <p className="text-xs text-muted-foreground mt-4">© 2026 Red Comunitaria de Voluntariado. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;
