import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/rhh-logo.png";

const navItems = ["Home", "About", "Services", "Our Doctors", "Luxury Services", "Contact"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-popover border-b border-warm-sand relative z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <a href="/" className="flex-shrink-0">
          <img src={logo} alt="Royale Hayat Hospital" className="h-14 md:h-16 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-foreground font-body text-sm tracking-wide hover:text-accent transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="border border-primary text-primary px-6 py-2 rounded-full text-sm font-body tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
            Login
          </button>
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-popover border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col py-4 px-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-foreground font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
