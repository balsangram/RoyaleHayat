import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const ChairmanMessage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">A Message From</p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8">The Chairman</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-popover rounded-2xl p-8 md:p-10 border border-border/50 relative"
          >
            <Quote className="w-8 h-8 text-accent/20 absolute top-6 left-6" />
            <blockquote className="font-serif text-base md:text-lg text-foreground leading-relaxed italic mb-6 relative z-10">
              "Our vision has always been to create a hospital that redefines healthcare in the region — where every patient receives not just treatment, but an experience of genuine compassion, luxury, and world-class expertise. Royale Hayat is the realization of that dream."
            </blockquote>
            <div>
              <p className="font-serif text-sm text-primary font-medium">Dr. Mohammed Al-Sharhan</p>
              <p className="font-body text-xs text-muted-foreground">Chairman, Royale Hayat Hospital</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanMessage;
