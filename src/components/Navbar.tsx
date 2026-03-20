import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/eventos", label: "Eventos" },
    { to: "/staff", label: "Staff" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg text-primary">
          <Heart className="h-6 w-6 fill-primary" />
          <span>Red Comunitaria</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body font-semibold text-sm transition-colors hover:text-primary ${
                location.pathname === l.to ? "text-primary" : "text-foreground/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button size="sm" asChild>
            <Link to="/eventos">Participar</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-background pb-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 font-body font-semibold text-sm hover:bg-card"
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Button size="sm" className="w-full" asChild>
              <Link to="/eventos" onClick={() => setOpen(false)}>Participar</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
