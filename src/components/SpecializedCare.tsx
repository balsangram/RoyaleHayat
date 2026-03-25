import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const SpecializedCare = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  const services = [
    {
      num: "01",
      titleKey: "womensHealth",
      descKey: "womensHealthDesc",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=250&fit=crop&crop=faces",
    },
    {
      num: "02",
      titleKey: "childrens",
      descKey: "childrensDesc",
      img: "http://kpfamilybirthcenter.org/sites/kpfamilybirthcenter/files/2017-03/nicu-5.jpg",
    },
    {
      num: "03",
      titleKey: "cardiology",
      descKey: "cardiologyDesc",
      img: "https://drpalvehospital.com/wp-content/uploads/2024/08/Comprehensive-Cardiology-Care.jpg",
    },
    {
      num: "04",
      titleKey: "orthopedics",
      descKey: "orthopedicsDesc",
      img: "https://spacecoastortho.com/wp-content/uploads/sites/270/2020/11/Space_Nov-1536x960.jpg.optimal.jpg",
    },
    {
      num: "05",
      titleKey: "cosmetic",
      descKey: "cosmeticDesc",
      img: "https://xivents.com/wp-content/uploads/2023/05/Differences-Between-Plastic-Surgery-and-Reconstructive-Surgery.jpg",
    },
    {
      num: "06",
      titleKey: "ivf",
      descKey: "ivfDesc",
      img: "https://www.zeiss.com/content/dam/rms/reference-master/applications/reproductive-medicine/axio-observer_ivf_narishige-micromanipulation_5.jpg/_jcr_content/renditions/original.image_file.1707.1280.107,0,1814,1280.file/axio-observer_ivf_narishige-micromanipulation_5.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background" id="services" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-12">
          <ScrollAnimationWrapper>
            <div>
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{t("whatWeOffer")}</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground">{t("specializedCare")}</h2>
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.15}>
            <p className="text-muted-foreground font-body max-w-md mt-4 md:mt-0 leading-relaxed text-sm">
              {t("specializedDesc")}
            </p>
          </ScrollAnimationWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, boxShadow: "0 24px 48px -16px rgba(74,20,35,0.14)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-popover rounded-2xl overflow-hidden border border-border/50 cursor-pointer group transition-all duration-300"
            >
              <div className="relative h-32 md:h-36 overflow-hidden">
                <img
                  src={s.img}
                  alt={t(s.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-popover/70 to-transparent" />
                <span className="absolute top-3 left-3 text-2xl font-serif text-primary-foreground/80 drop-shadow-lg">{s.num}</span>
              </div>
              <div className="p-4 md:p-5">
                <h3 className="text-sm md:text-base font-serif text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{t(s.titleKey)}</h3>
                <p className="text-muted-foreground font-body text-xs leading-relaxed mb-3">{t(s.descKey)}</p>
                <motion.a
                  href="#"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-1.5 text-primary font-body text-xs tracking-wide hover:text-accent transition-colors"
                >
                  {t("learnMore")} <ArrowRight className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializedCare;
