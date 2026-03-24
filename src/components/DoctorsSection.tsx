import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const doctors = [
  {
    name: "Dr. Hanan Al-Shammari",
    specialty: "Obstetrics & Gynecology",
    title: "Consultant Obstetrician & Gynecologist",
    bio: "With over 20 years of experience in maternal and fetal medicine, Dr. Al-Shammari is renowned for her compassionate approach and clinical excellence in high-risk pregnancies.",
    expertise: ["High-Risk Pregnancy Management", "Minimally Invasive Gynecological Surgery", "Prenatal Diagnostics & Counseling"],
    languages: ["English", "Arabic"],
    initials: "HA",
    color: "bg-primary",
  },
  {
    name: "Dr. Ahmed Al-Sabah",
    specialty: "Cardiology",
    title: "Senior Consultant Cardiologist",
    bio: "A pioneer in interventional cardiology in Kuwait, Dr. Al-Sabah brings over 15 years of experience in diagnosing and treating complex cardiovascular conditions.",
    expertise: ["Interventional Cardiology", "Cardiac Imaging", "Heart Failure Management"],
    languages: ["English", "Arabic", "French"],
    initials: "AS",
    color: "bg-accent",
  },
  {
    name: "Dr. Fatima Al-Rashidi",
    specialty: "Pediatrics & Neonatology",
    title: "Consultant Pediatrician & Neonatologist",
    bio: "Dr. Al-Rashidi specializes in neonatal intensive care and pediatric development, ensuring the youngest patients receive world-class medical attention in a nurturing environment.",
    expertise: ["Neonatal Intensive Care", "Pediatric Development", "Childhood Immunization Programs"],
    languages: ["English", "Arabic"],
    initials: "FR",
    color: "bg-primary",
  },
  {
    name: "Dr. Khalid Al-Mutairi",
    specialty: "General & Laparoscopic Surgery",
    title: "Chief of Surgery",
    bio: "An internationally trained surgeon with expertise in minimally invasive techniques, Dr. Al-Mutairi leads the surgical department with a commitment to precision and patient safety.",
    expertise: ["Minimally Invasive Surgery", "Bariatric Surgery", "Advanced Laparoscopic Procedures"],
    languages: ["English", "Arabic"],
    initials: "KM",
    color: "bg-accent",
  },
  {
    name: "Dr. Noor Al-Ahmad",
    specialty: "Dermatology",
    title: "Consultant Dermatologist",
    bio: "Dr. Al-Ahmad combines medical dermatology expertise with cosmetic innovation, offering comprehensive skin care solutions using the latest technologies and evidence-based treatments.",
    expertise: ["Medical Dermatology", "Cosmetic Procedures", "Skin Cancer Screening"],
    languages: ["English", "Arabic", "Hindi"],
    initials: "NA",
    color: "bg-primary",
  },
];

const DoctorsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % doctors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => { setAutoPlay(false); setCurrentIndex((p) => (p + 1) % doctors.length); };
  const prev = () => { setAutoPlay(false); setCurrentIndex((p) => (p - 1 + doctors.length) % doctors.length); };

  // Show 3 cards in a stacked/deck style
  const getStackedDoctors = () => {
    const result = [];
    for (let i = 0; i < Math.min(3, doctors.length); i++) {
      result.push({ doc: doctors[(currentIndex + i) % doctors.length], offset: i });
    }
    return result;
  };

  return (
    <section className="py-24 bg-background" id="our-doctors">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <ScrollAnimationWrapper>
            <div>
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">Our Team</p>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground">Meet Our Doctors</h2>
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.1}>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <a href="#" className="hidden md:inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3 rounded-full font-body text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300 ml-2">
                View All Doctors
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Doctor Cards - Staggered Reveal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {getStackedDoctors().map(({ doc, offset }) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: offset * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(74,20,35,0.15)" }}
                className="bg-popover rounded-2xl overflow-hidden border border-border/50 group cursor-pointer"
              >
                {/* Avatar area */}
                <div className={`${doc.color} h-48 flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + offset * 0.12, duration: 0.4 }}
                    className="w-24 h-24 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center border-2 border-popover/30"
                  >
                    <span className="text-3xl font-serif text-primary-foreground">{doc.initials}</span>
                  </motion.div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-accent text-xs tracking-[0.2em] uppercase font-body mb-2">{doc.specialty}</p>
                  <h3 className="text-xl font-serif text-foreground mb-1">{doc.name}</h3>
                  <p className="text-muted-foreground font-body text-xs mb-4">{doc.title}</p>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 line-clamp-3">{doc.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {doc.languages.map((l) => (
                      <span key={l} className="px-3 py-1 rounded-full bg-secondary/40 text-xs font-body text-foreground">{l}</span>
                    ))}
                  </div>

                  <motion.a
                    href="#"
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 text-primary font-body text-sm tracking-wide hover:text-accent transition-colors"
                  >
                    View Profile →
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {doctors.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAutoPlay(false); setCurrentIndex(i); }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-accent w-8" : "bg-border w-2.5 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
