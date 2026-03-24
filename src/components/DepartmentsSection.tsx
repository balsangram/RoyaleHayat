import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

const departments = [
  { name: "Obstetrics & Gynecology", desc: "Comprehensive maternity care, high-risk pregnancy management, and advanced gynecological surgeries." },
  { name: "Gynaecology", desc: "Specialized women's health diagnostics and minimally invasive surgical procedures." },
  { name: "Women's Health", desc: "Holistic wellness programs, preventive screenings, and personalized care plans." },
  { name: "IVF & Reproductive Medicine", desc: "World-class fertility treatments and assisted reproduction services." },
  { name: "Pediatrics", desc: "Compassionate children's healthcare in a warm, family-centered environment." },
  { name: "Neonatal Unit", desc: "State-of-the-art NICU providing round-the-clock intensive care for newborns." },
  { name: "Internal Medicine", desc: "Expert diagnosis and management of complex adult medical conditions." },
  { name: "General & Laparoscopic Surgery", desc: "Advanced minimally invasive surgical techniques for faster recovery." },
  { name: "Plastic & Cosmetic Surgery", desc: "Aesthetic and reconstructive procedures by board-certified surgeons." },
  { name: "Dermatology", desc: "Complete skin care from medical dermatology to cosmetic treatments." },
  { name: "Cardiology", desc: "Advanced cardiac diagnostics and interventional heart procedures." },
  { name: "Orthopedics", desc: "Joint replacement, sports medicine, and musculoskeletal care." },
  { name: "ENT (Ear, Nose & Throat)", desc: "Comprehensive ear, nose, and throat diagnostics and surgeries." },
  { name: "Ophthalmology", desc: "Advanced eye care including LASIK, cataract, and retinal treatments." },
  { name: "Urology", desc: "Specialized urinary tract and male reproductive health services." },
  { name: "Dental Clinic", desc: "Full-spectrum dental care from cosmetic to restorative dentistry." },
  { name: "Radiology & Imaging", desc: "State-of-the-art MRI, CT, and ultrasound diagnostics." },
  { name: "Physiotherapy", desc: "Rehabilitation and recovery programs for optimal physical health." },
  { name: "Nutrition & Dietetics", desc: "Personalized nutrition plans and dietary consultation services." },
  { name: "Psychiatry", desc: "Mental health support, therapy, and psychiatric treatment." },
  { name: "Gastroenterology", desc: "Digestive system diagnostics, endoscopy, and advanced GI treatments." },
  { name: "Neurology", desc: "Brain and nervous system disorders diagnosis and specialized treatment." },
  { name: "Pulmonology", desc: "Respiratory care, sleep disorders, and lung function diagnostics." },
  { name: "Endocrinology", desc: "Diabetes management, thyroid disorders, and hormonal health." },
  { name: "Nephrology", desc: "Kidney health, dialysis support, and renal disease management." },
];

const pillBg = [
  "bg-[hsl(30_20%_85%)]",
  "bg-[hsl(30_10%_88%)]",
  "bg-[hsl(30_20%_83%)]",
  "bg-[hsl(30_10%_86%)]",
  "bg-[hsl(30_20%_85%)]",
  "bg-[hsl(30_10%_88%)]",
  "bg-[hsl(30_20%_83%)]",
  "bg-[hsl(30_10%_86%)]",
  "bg-[hsl(30_20%_85%)]",
  "bg-[hsl(30_10%_88%)]",
];

const VISIBLE_COUNT = 12;

const DepartmentsSection = () => {
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const visibleDepts = showAll ? departments : departments.slice(0, VISIBLE_COUNT);

  return (
    <section className="py-24 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">Our Specialties</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Medical Departments</h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            {departments.length} specialized departments led by internationally renowned physicians.
          </p>
        </motion.div>

        {/* Desktop: pill row */}
        <div className="hidden lg:flex gap-2 items-stretch justify-center h-[420px]">
          {visibleDepts.slice(0, VISIBLE_COUNT).map((d, i) => {
            const isActive = active === i;

            return (
              <motion.div
                key={d.name}
                layout
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  width: isActive ? 380 : 80,
                } : { opacity: 0, y: 60 }}
                transition={{
                  opacity: { duration: 0.5, delay: i * 0.06 },
                  y: { duration: 0.6, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
                  width: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                  layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                }}
                onClick={() => setActive(isActive ? null : i)}
                className={`relative rounded-[2rem] cursor-pointer overflow-hidden flex-shrink-0 transition-colors duration-500 ${
                  isActive ? "bg-secondary/50" : pillBg[i % pillBg.length]
                }`}
              >
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="h-full flex flex-col justify-end p-10"
                    >
                      <h3 className="text-3xl font-serif text-foreground mb-3 leading-tight">{d.name}</h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">{d.desc}</p>
                      <motion.a
                        href="#"
                        whileHover={{ x: 4 }}
                        className="inline-flex items-center gap-2 text-foreground font-body text-sm font-medium hover:text-accent transition-colors"
                      >
                        Learn More <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full flex items-center justify-center"
                    >
                      <span className="font-serif text-sm text-foreground/70 whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
                        {d.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Additional departments revealed on "View All" */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 overflow-hidden"
            >
              {departments.slice(VISIBLE_COUNT).map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/50 transition-colors cursor-pointer group"
                >
                  <h4 className="text-sm font-serif text-foreground mb-1 group-hover:text-primary transition-colors">{d.name}</h4>
                  <p className="text-muted-foreground font-body text-xs leading-relaxed line-clamp-2">{d.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All button - desktop */}
        <div className="hidden lg:flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3 rounded-xl font-body text-sm tracking-wider uppercase hover:bg-secondary/30 transition-all"
          >
            {showAll ? "Show Less" : `View All ${departments.length} Departments`}
            <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ArrowRight className="w-4 h-4 rotate-90" />
            </motion.span>
          </motion.button>
        </div>

        {/* Mobile select + card */}
        <div className="lg:hidden mt-6">
          <select
            value={active ?? 0}
            onChange={(e) => setActive(Number(e.target.value))}
            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground mb-6"
          >
            {departments.map((d, i) => (
              <option key={d.name} value={i}>{d.name}</option>
            ))}
          </select>
          <div className="bg-secondary/30 rounded-2xl p-8">
            <h3 className="text-2xl font-serif text-foreground mb-3">{departments[active ?? 0].name}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{departments[active ?? 0].desc}</p>
            <a href="#" className="inline-flex items-center gap-2 text-foreground font-body text-sm font-medium">
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
