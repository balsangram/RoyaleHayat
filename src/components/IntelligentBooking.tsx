import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Sparkles, ShieldCheck } from "lucide-react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const chipSuggestions = ["Headache", "Chest Pain", "Fever", "Dizziness", "Back Pain", "Fatigue"];

const IntelligentBooking = () => {
  const [focused, setFocused] = useState(false);

  return (
    <section className="py-14 bg-primary" id="book">
      <div className="container mx-auto px-6 text-center">
        <ScrollAnimationWrapper>
          <div className="inline-flex items-center gap-2 bg-popover/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body">
              AI-Powered Symptom Checker
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground mb-3">
            Tell Us Your Symptoms
          </h2>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.15}>
          <p className="text-secondary/70 font-body max-w-xl mx-auto mb-6 text-sm">
            Our AI analyzes your symptoms and matches you with the right specialist — instantly and confidentially.
          </p>
        </ScrollAnimationWrapper>

        {/* Card */}
        <ScrollAnimationWrapper delay={0.2}>
          <div className="max-w-2xl mx-auto bg-background rounded-2xl p-8 text-left shadow-2xl border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-serif text-foreground">How are you feeling?</h3>
            </div>
            <p className="text-muted-foreground font-body text-xs mb-4 ml-12">
              Describe your symptoms or select from common ones below.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-4 ml-12">
              {chipSuggestions.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                  className="px-3 py-1.5 rounded-full bg-secondary/30 text-xs font-body text-foreground cursor-pointer hover:bg-accent/20 hover:text-accent transition-colors"
                >
                  {chip}
                </motion.span>
              ))}
            </div>

            <textarea
              placeholder="e.g., I've been experiencing headaches and dizziness for the past week..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`w-full h-28 bg-muted/30 border rounded-xl p-4 font-body text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none transition-all duration-500 ${
                focused
                  ? "border-accent/50 ring-2 ring-accent/20 shadow-[0_0_20px_-5px_hsl(var(--accent)/0.3)]"
                  : "border-border"
              }`}
            />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span className="font-body text-[10px]">Encrypted & confidential</span>
              </div>
              <Link to="/book-appointment">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-body text-xs tracking-widest uppercase hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Analyze Symptoms
                </motion.span>
              </Link>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default IntelligentBooking;
