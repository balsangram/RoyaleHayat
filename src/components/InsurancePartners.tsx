import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const partners = [
  "National Health Insurance",
  "Cigna Global",
  "Allianz Care",
  "Bupa Arabia",
  "AXA",
  "MetLife",
  "GlobeMed",
  "Warba Insurance",
];

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="relative overflow-hidden py-3 group">
    <motion.div
      className="flex gap-5 w-max"
      animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      style={{ willChange: "transform" }}
    >
      {[...partners, ...partners].map((p, i) => (
        <div
          key={`${p}-${i}`}
          className="bg-popover border border-border/50 rounded-xl px-7 py-5 flex items-center gap-3 min-w-[200px] hover:shadow-md transition-shadow group-hover:[animation-play-state:paused]"
        >
          <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-sm text-foreground">{p.charAt(0)}</span>
          </div>
          <div>
            <p className="font-body text-sm font-medium text-foreground">{p}</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-accent font-body">
              <CheckCircle className="w-3 h-3" />Verified
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
);

const InsurancePartners = () => {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollAnimationWrapper>
          <div className="text-center mb-8">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">Trusted By</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">Insurance Partners</h2>
          </div>
        </ScrollAnimationWrapper>
      </div>

      {/* Marquee */}
      <MarqueeRow />
      <MarqueeRow reverse />

      <div className="container mx-auto px-6 mt-6">
        <p className="text-center text-muted-foreground font-body text-sm">
          Don't see your insurance provider?{" "}
          <a href="#contact" className="text-primary underline hover:text-accent transition-colors">
            Contact us
          </a>{" "}
          to verify your coverage.
        </p>
      </div>
    </section>
  );
};

export default InsurancePartners;
