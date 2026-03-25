import { useState } from "react";
import { Menu, X, Globe, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/rhh-logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "#about" },
    { label: t("departments"), href: "#departments" },
    { label: t("doctors"), href: "#doctors" },
    { label: t("luxuryServices"), href: "#services" },
    { label: t("contact"), href: "#contact" },
  ];

  const linkClass =
    "text-foreground font-body text-sm tracking-wide hover:text-accent transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

  return (
    <header className="bg-popover border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Royale Hayat Hospital" className="h-12 md:h-16 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) =>
            item.href === "/" ? (
              <Link key={item.label} to="/" className={linkClass}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={linkClass}>
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link
            to="/book-appointment"
            className="hidden sm:inline-flex bg-primary text-primary-foreground px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-body tracking-wide hover:bg-primary/90 transition-colors duration-300"
          >
            {t("bookAppointment")}
          </Link>
          <button className="hidden sm:inline-flex border border-primary text-primary px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-body tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
            {t("login")}
          </button>
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs md:text-sm font-body tracking-wide transition-all duration-300 border border-accent text-accent hover:bg-accent/10"
          >
            <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="font-medium">{lang === "en" ? "عربي" : "EN"}</span>
          </button>
          {/* Mobile burger */}
          <button
            className="xl:hidden w-10 h-10 flex items-center justify-center text-foreground"
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
            className="xl:hidden bg-popover border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col py-4 px-6">
              {navItems.map((item) =>
                item.href === "/" ? (
                  <Link
                    key={item.label}
                    to="/"
                    className="text-foreground font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-foreground font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
              <Link
                to="/book-appointment"
                className="text-primary font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t("bookAppointment")}
              </Link>
              <button
                className="text-left text-foreground font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t("login")}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
