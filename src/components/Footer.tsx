import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Ambulance } from "lucide-react";
import logo from "@/assets/rhh-logo-full.png";

const Footer = () => {
  return (
    <footer className="bg-primary pt-16 pb-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo + Description + Social */}
          <div className="space-y-5 flex flex-col items-center text-center">
            <img src={logo} alt="Royale Hayat Hospital" className="h-28 w-auto brightness-0 invert opacity-90" />
            <p className="text-secondary/50 font-body text-sm leading-relaxed">
              Celebrating Life. Kuwait's premier multi-disciplinary healthcare provider since 2006.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {["F", "I", "Y", "X"].map((letter) => (
                <a
                  key={letter}
                  href="#"
                  className="w-9 h-9 rounded-full border border-secondary/20 flex items-center justify-center text-secondary/50 font-body text-xs hover:text-accent hover:border-accent transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-primary-foreground font-body text-xs tracking-[0.3em] uppercase mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "About Us", href: "#about" },
                { label: "Our Services", href: "#services" },
                { label: "Find a Doctor", href: "#our-doctors" },
                { label: "Book Appointment", href: "/book-appointment", isRoute: true },
                { label: "Contact Us", href: "#contact" },
              ].map((l) =>
                l.isRoute ? (
                  <Link key={l.label} to={l.href} className="text-secondary/50 font-body text-sm hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.label} href={l.href} className="text-secondary/50 font-body text-sm hover:text-accent transition-colors">
                    {l.label}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Column 3: Departments */}
          <div>
            <h4 className="text-primary-foreground font-body text-xs tracking-[0.3em] uppercase mb-6">Departments</h4>
            <nav className="flex flex-col gap-3">
              {["Obstetrics & Gynecology", "Pediatrics", "Internal Medicine", "General Surgery", "Dental Clinic", "Dermatology"].map((d) => (
                <a key={d} href="#departments" className="text-secondary/50 font-body text-sm hover:text-accent transition-colors">
                  {d}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-primary-foreground font-body text-xs tracking-[0.3em] uppercase mb-6">Contact</h4>
            <div className="space-y-4 font-body text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground font-medium">24/7 Hotline</p>
                  <p className="text-secondary/50">+965 2536 0000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="text-secondary/50">info@royalehayat.com</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-secondary/50">P.O. Box 179, Hawalli 32002, Kuwait</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="text-accent text-xs tracking-wider uppercase">24/7 Emergency Services</p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Ambulance className="w-4 h-4 text-accent flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground font-medium">Call Ambulance</p>
                  <a href="tel:+96525360001" className="text-secondary/50 hover:text-accent transition-colors">+965 2536 0001</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-secondary/10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary/30 font-body text-xs">
            © 2026 Royale Hayat Hospital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Android App", "iOS App", "Privacy Policy"].map((l) => (
              <a key={l} href="#" className="text-secondary/30 font-body text-xs hover:text-accent transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
