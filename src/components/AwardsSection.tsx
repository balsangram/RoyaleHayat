import { useState, useEffect } from "react";
import { Trophy, Shield, Star, Award, Medal, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const awards = [
  { icon: Trophy, name: "Service Hero Award", year: "2023", source: "Service Hero Index", desc: "Kuwait's top-rated private hospital for customer service." },
  { icon: Shield, name: "Diamond Award", year: "2023", desc: "Excellence in patient safety and quality." },
  { icon: BadgeCheck, name: "CAP Accreditation", year: "2022", desc: "College of American Pathologists." },
  { icon: Star, name: "Service Hero Award", year: "2023", desc: "Top-rated healthcare provider." },
  { icon: Award, name: "PCC Award", year: "2022", desc: "Patient-centered care excellence." },
  { icon: Medal, name: "JCI Accreditation", year: "2023", desc: "Joint Commission International." },
  { icon: BadgeCheck, name: "ISO 9001:2015", year: "2023", desc: "Quality management certification." },
];

const AwardsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((p) => (p + 1) % awards.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActiveIndex((p) => (p + 1) % awards.length);
  const prev = () => setActiveIndex((p) => (p - 1 + awards.length) % awards.length);

  const featured = awards[activeIndex];
  const gridAwards = awards.filter((_, i) => i !== activeIndex).slice(0, 4);

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-6">
        <ScrollAnimationWrapper>
          <div className="text-center mb-10">
            <div className="w-10 h-0.5 bg-accent mx-auto mb-3" />
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-2">Recognition</p>
            <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground">
              Certificates & <span className="text-accent italic">Awards</span>
            </h2>
          </div>
        </ScrollAnimationWrapper>

        <div className="flex flex-col lg:flex-row gap-5 max-w-5xl mx-auto items-stretch">
          {/* Featured award - left */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.35 }}
              className="lg:w-[320px] bg-primary/60 backdrop-blur-sm border border-secondary/15 rounded-xl p-8 flex flex-col items-center justify-center text-center flex-shrink-0"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/15 backdrop-blur-sm flex items-center justify-center mb-4 border border-accent/20">
                <featured.icon className="w-7 h-7 text-accent" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-body tracking-wider mb-3">{featured.year}</span>
              <h3 className="text-lg font-serif text-primary-foreground mb-2">{featured.name}</h3>
              {featured.source && (
                <p className="text-accent font-body text-xs mb-2">{featured.source}</p>
              )}
              <p className="text-secondary/60 font-body text-xs leading-relaxed">{featured.desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Grid - right: 2x2 */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {gridAwards.map((a, i) => (
              <ScrollAnimationWrapper key={a.name + a.year + i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-primary/40 backdrop-blur-sm border border-secondary/10 rounded-xl p-5 hover:border-accent/30 transition-all cursor-pointer h-full flex flex-col"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center mb-3">
                    <a.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="text-sm font-serif text-primary-foreground mb-1">{a.name}</h4>
                  <p className="text-secondary/50 font-body text-xs">{a.year}</p>
                </motion.div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prev} className="w-8 h-8 rounded-full border border-secondary/20 flex items-center justify-center text-primary-foreground hover:bg-accent hover:border-accent transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <div className="flex gap-1.5">
            {awards.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-accent w-6" : "bg-secondary/30 w-1.5 hover:bg-secondary/50"}`} />
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={next} className="w-8 h-8 rounded-full border border-secondary/20 flex items-center justify-center text-primary-foreground hover:bg-accent hover:border-accent transition-colors">
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
