import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const services = [
  {
    num: "01",
    title: "Women's Health & Obstetrics",
    desc: "Comprehensive maternity and women's healthcare services with state-of-the-art facilities, personalized birth plans, and a dedicated team of specialists ensuring comfort at every stage.",
  },
  {
    num: "02",
    title: "Children's Care & Neonatology",
    desc: "Expert pediatric and neonatal care in a warm, family-centered environment. Our NICU and pediatric teams provide round-the-clock specialized medical attention for your little ones.",
  },
  {
    num: "03",
    title: "Cardiology & Heart Care",
    desc: "Advanced cardiac diagnostics, interventional cardiology, and comprehensive heart health programs. From preventive screenings to complex procedures, our cardiologists deliver world-class care.",
  },
  {
    num: "04",
    title: "Orthopedics & Sports Medicine",
    desc: "Joint replacement, sports injury rehabilitation, and musculoskeletal treatments. Our orthopedic surgeons use minimally invasive techniques for faster recovery and optimal outcomes.",
  },
  {
    num: "05",
    title: "Cosmetic & Reconstructive Surgery",
    desc: "Board-certified plastic surgeons offering aesthetic and reconstructive procedures. From body contouring to facial rejuvenation, delivered in a luxurious, private setting.",
  },
  {
    num: "06",
    title: "IVF & Reproductive Medicine",
    desc: "World-class fertility treatments and assisted reproduction services with cutting-edge technology. Personalized care plans to support your journey to parenthood with compassion and expertise.",
  },
];

const SpecializedCare = () => {
  return (
    <section className="py-24 bg-background" id="services">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <ScrollAnimationWrapper>
            <div>
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">What We Offer</p>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground">Specialized Care</h2>
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.15}>
            <p className="text-muted-foreground font-body max-w-md mt-4 md:mt-0 leading-relaxed">
              Tailored, premium, and patient-focused medical services designed around your individual needs, delivered with compassion and clinical excellence.
            </p>
          </ScrollAnimationWrapper>
        </div>

        <div className="space-y-6">
          {services.map((s, i) => (
            <ScrollAnimationWrapper key={s.num} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(74,20,35,0.1)" }}
                transition={{ duration: 0.3 }}
                className="bg-secondary/30 rounded-2xl p-10 md:p-12 flex flex-col md:flex-row md:items-center gap-8 border border-border/50"
              >
                <span className="text-6xl font-serif text-accent/40">{s.num}</span>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{s.desc}</p>
                </div>
                <motion.a
                  href="#"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-primary font-body text-sm tracking-wide hover:text-accent transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializedCare;
