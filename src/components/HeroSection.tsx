import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/MT6T0YmWkfk?autoplay=1&mute=1&loop=1&playlist=MT6T0YmWkfk&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1&vq=hd1080"
          title="Hero Background"
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] pointer-events-none"
          style={{ border: 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/15" />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div initial={{ width: 0 }} animate={{ width: 56 }} transition={{ duration: 1, delay: 0.3 }} className="h-0.5 bg-primary mb-10" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-accent font-body text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6">
            {t("luxuriousHospital")}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.15] tracking-tight mb-10">
            <span className="text-foreground block">{t("exceptionalCare")}</span>
            <span className="text-primary italic block mt-2">{t("everyStage")}</span>
            <span className="text-foreground block mt-2">{t("everyAge")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }}
            className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-10 max-w-xl">
            {t("heroDesc")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2 }} className="flex flex-wrap gap-4">
            <Link to="/book-appointment"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]">
              {t("bookAnAppointment")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#book"
              className="inline-flex items-center gap-3 border border-secondary text-foreground px-8 py-4 rounded-lg font-body text-sm tracking-widest uppercase hover:bg-secondary/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
              {t("exploreServices")}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        onClick={() => {
          const nextSection = document.getElementById('stats-row') || document.querySelector('section + *');
          if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-muted-foreground group cursor-pointer bg-transparent border-none outline-none"
        aria-label="Scroll to next section">
        <span className="text-xs tracking-[0.3em] uppercase font-body group-hover:text-accent transition-colors duration-300">{t("discover")}</span>
        <div className="relative w-10 h-10 flex items-center justify-center">
          <motion.div className="absolute inset-0 rounded-full border border-accent/30" animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute inset-0 rounded-full border border-accent/20" animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
          <motion.div className="w-10 h-10 rounded-full border border-secondary/40 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300" animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <svg className="w-4 h-4 group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
