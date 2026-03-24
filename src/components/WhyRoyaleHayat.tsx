import luxuryRoom from "@/assets/luxury-room.jpg";
import { Shield, Star, Award, Heart } from "lucide-react";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const features = [
  { icon: Shield, title: "Internationally Accredited", desc: "Diamond Award & CAP Accredited — the highest global standards." },
  { icon: Star, title: "VIP Experience", desc: "Every patient treated with personalized attention and luxury comfort." },
  { icon: Award, title: "Award-Winning Care", desc: "Service Hero & PCC Award recipients for patient-centered excellence." },
  { icon: Heart, title: "Compassionate Approach", desc: "From birth to every stage — comprehensive, compassionate care." },
];

const WhyRoyaleHayat = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image with overlay stat */}
          <ScrollAnimationWrapper direction="left" className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={luxuryRoom}
                alt="Luxury hospital suite at Royale Hayat"
                className="w-full h-auto"
                loading="lazy"
                width={1280}
                height={960}
              />
              {/* Floating stat card matching screenshot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-6 right-6 bg-primary rounded-xl px-8 py-5 text-center shadow-2xl"
              >
                <p className="text-3xl font-serif text-primary-foreground">86%</p>
                <p className="text-xs tracking-[0.2em] uppercase font-body text-primary-foreground/80">Patient Satisfaction</p>
              </motion.div>
            </div>
          </ScrollAnimationWrapper>

          {/* Content */}
          <div className="lg:w-1/2">
            <ScrollAnimationWrapper direction="right">
              <div className="w-12 h-0.5 bg-accent mb-6" />
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">Why Royale Hayat</p>
              <h2 className="text-4xl font-serif text-foreground mb-2 leading-tight">
                Where Luxury Meets <span className="text-accent italic">World-Class</span>
              </h2>
              <h2 className="text-4xl font-serif text-foreground mb-6 leading-tight">Medicine</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-10">
                Since 2006, Royale Hayat Hospital has grown into Kuwait's leading multi-disciplinary healthcare provider, delivering exceptional care in a setting that prioritizes privacy, comfort, and personalized attention.
              </p>
            </ScrollAnimationWrapper>

            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <ScrollAnimationWrapper key={f.title} delay={i * 0.1} direction="right">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex gap-4 p-4 rounded-xl bg-popover border border-border/30 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm text-foreground mb-1">{f.title}</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRoyaleHayat;
