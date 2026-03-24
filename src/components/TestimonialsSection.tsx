import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const testimonials = [
  {
    stars: 5,
    text: "The care I received at Royale Hayat was truly exceptional. From the moment I arrived, the staff treated me with warmth and professionalism. The VIP suite was like a five-star hotel.",
    name: "Sarah Al-Mutairi",
  },
  {
    stars: 5,
    text: "Dr. Al-Shammari and her team made my pregnancy journey stress-free and comfortable. The neonatal unit gave us complete peace of mind. Highly recommend their maternity services.",
    name: "Fatima Al-Rashidi",
  },
  {
    stars: 5,
    text: "World-class medical care in Kuwait. The international accreditations speak volumes about their quality standards. My entire family trusts Royale Hayat for all our healthcare needs.",
    name: "Ahmed Al-Sabah",
  },
  {
    stars: 5,
    text: "The pediatric department was outstanding. My children felt comfortable and safe. The doctors were incredibly patient and thorough with their examinations.",
    name: "Noura Al-Hajri",
  },
  {
    stars: 5,
    text: "From consultation to recovery, every step was handled with care and precision. The surgical team was world-class and the post-operative care was exceptional.",
    name: "Mohammed Al-Enezi",
  },
  {
    stars: 5,
    text: "I traveled from abroad specifically for treatment here. The international patient services made everything seamless. Truly a premium healthcare experience.",
    name: "Layla Hassan",
  },
];

// Duplicate for seamless loop
const duplicated = [...testimonials, ...testimonials];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-24 bg-popover overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollAnimationWrapper>
          <div className="text-center mb-16">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">Patient Feedback</h2>
          </div>
        </ScrollAnimationWrapper>
      </div>

      {/* Scrolling marquee of testimonials */}
      <div
        ref={containerRef}
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6 w-max px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {duplicated.map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(74,20,35,0.1)" }}
              className="bg-background rounded-2xl p-8 border border-border/50 w-[360px] flex-shrink-0"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground font-body leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <p className="font-serif text-foreground text-sm">{t.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
