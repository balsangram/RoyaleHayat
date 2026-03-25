import { useState, useRef } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const departments = [
  { name: "Obstetrics & Gynecology", nameAr: "التوليد وأمراض النساء", desc: "Complete maternity care from prenatal through postpartum recovery.", descAr: "رعاية أمومة شاملة من ما قبل الولادة حتى التعافي بعدها." },
  { name: "Gynaecology", nameAr: "أمراض النساء", desc: "Specialized women's health diagnostics and minimally invasive surgical procedures.", descAr: "تشخيصات متخصصة لصحة المرأة وإجراءات جراحية طفيفة التوغل." },
  { name: "Women's Health", nameAr: "صحة المرأة", desc: "Holistic wellness programs tailored for women at every stage of life.", descAr: "برامج صحية شاملة مصممة للمرأة في كل مرحلة من حياتها." },
  { name: "IVF & Reproductive Medicine", nameAr: "أطفال الأنابيب والطب التناسلي", desc: "Advanced fertility treatments with state-of-the-art laboratory technology.", descAr: "علاجات خصوبة متقدمة بأحدث تقنيات المختبرات." },
  { name: "Pediatrics", nameAr: "طب الأطفال", desc: "Compassionate child healthcare from infancy through adolescence.", descAr: "رعاية صحية للأطفال من الرضاعة حتى المراهقة." },
  { name: "Neonatal Unit", nameAr: "وحدة حديثي الولادة", desc: "Intensive care for newborns requiring specialized medical attention.", descAr: "رعاية مركزة لحديثي الولادة الذين يحتاجون عناية طبية متخصصة." },
  { name: "Internal Medicine", nameAr: "الطب الباطني", desc: "Comprehensive diagnosis and treatment of complex adult diseases.", descAr: "تشخيص وعلاج شامل لأمراض البالغين المعقدة." },
  { name: "General & Laparoscopic Surgery", nameAr: "الجراحة العامة والمنظار", desc: "Minimally invasive surgical solutions for faster recovery times.", descAr: "حلول جراحية طفيفة التوغل لأوقات تعافٍ أسرع." },
  { name: "Plastic & Cosmetic Surgery", nameAr: "الجراحة التجميلية", desc: "Reconstructive and aesthetic procedures by board-certified surgeons.", descAr: "إجراءات ترميمية وتجميلية من قبل جراحين معتمدين." },
  { name: "Dermatology", nameAr: "الأمراض الجلدية", desc: "Advanced skin care treatments and medical dermatology services.", descAr: "علاجات متقدمة للعناية بالبشرة وخدمات الأمراض الجلدية." },
  { name: "Cardiology", nameAr: "أمراض القلب", desc: "Heart health diagnostics, interventional cardiology, and rehabilitation.", descAr: "تشخيصات صحة القلب وأمراض القلب التدخلية وإعادة التأهيل." },
  { name: "Orthopedics", nameAr: "العظام", desc: "Joint replacement, sports medicine, and musculoskeletal care.", descAr: "استبدال المفاصل والطب الرياضي ورعاية الجهاز العضلي الهيكلي." },
  { name: "ENT (Ear, Nose & Throat)", nameAr: "الأنف والأذن والحنجرة", desc: "Diagnosis and treatment of ear, nose, and throat conditions.", descAr: "تشخيص وعلاج أمراض الأنف والأذن والحنجرة." },
  { name: "Ophthalmology", nameAr: "طب العيون", desc: "Comprehensive eye care including LASIK and cataract surgery.", descAr: "رعاية شاملة للعيون بما في ذلك الليزك وجراحة المياه البيضاء." },
  { name: "Urology", nameAr: "المسالك البولية", desc: "Advanced urological treatments and minimally invasive procedures.", descAr: "علاجات المسالك البولية المتقدمة والإجراءات طفيفة التوغل." },
  { name: "Dental Clinic", nameAr: "عيادة الأسنان", desc: "Full-spectrum dental services from cosmetic to restorative care.", descAr: "خدمات أسنان شاملة من التجميل إلى الترميم." },
  { name: "Radiology & Imaging", nameAr: "الأشعة والتصوير", desc: "State-of-the-art diagnostic imaging and interventional radiology.", descAr: "تصوير تشخيصي متطور وأشعة تدخلية." },
  { name: "Physiotherapy", nameAr: "العلاج الطبيعي", desc: "Rehabilitation programs to restore mobility and reduce pain.", descAr: "برامج إعادة تأهيل لاستعادة الحركة وتقليل الألم." },
  { name: "Nutrition & Dietetics", nameAr: "التغذية", desc: "Personalized nutrition plans for optimal health and wellness.", descAr: "خطط تغذية مخصصة لصحة وعافية مثالية." },
  { name: "Psychiatry", nameAr: "الطب النفسي", desc: "Mental health services including therapy and medication management.", descAr: "خدمات الصحة النفسية بما في ذلك العلاج وإدارة الأدوية." },
  { name: "Gastroenterology", nameAr: "أمراض الجهاز الهضمي", desc: "Digestive health diagnostics and advanced endoscopic procedures.", descAr: "تشخيصات صحة الجهاز الهضمي وإجراءات التنظير المتقدمة." },
  { name: "Neurology", nameAr: "الأعصاب", desc: "Expert care for neurological disorders and brain health.", descAr: "رعاية متخصصة للاضطرابات العصبية وصحة الدماغ." },
  { name: "Pulmonology", nameAr: "أمراض الرئة", desc: "Respiratory care including diagnostics and chronic disease management.", descAr: "رعاية الجهاز التنفسي بما في ذلك التشخيص وإدارة الأمراض المزمنة." },
  { name: "Endocrinology", nameAr: "الغدد الصماء", desc: "Hormonal and metabolic disorder treatments by specialists.", descAr: "علاجات الاضطرابات الهرمونية والأيضية من قبل متخصصين." },
  { name: "Nephrology", nameAr: "أمراض الكلى", desc: "Kidney health management including dialysis and transplant care.", descAr: "إدارة صحة الكلى بما في ذلك غسيل الكلى ورعاية الزراعة." },
];

const INITIAL_COUNT = 10;

const DepartmentsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { lang, t } = useLanguage();

  const visibleDepts = showAll ? departments : departments.slice(0, INITIAL_COUNT);
  const leftColumn = visibleDepts.filter((_, i) => i % 2 === 0);
  const rightColumn = visibleDepts.filter((_, i) => i % 2 === 1);

  const DeptCard = ({ d, index, fromLeft }: { d: typeof departments[0]; index: number; fromLeft: boolean }) => (
    <motion.div
      key={d.name}
      initial={{ opacity: 0, y: 30, x: fromLeft ? -20 : 20 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="bg-secondary/50 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300"
    >
      {/* Placeholder top area */}
      <div className="h-20 md:h-24 bg-secondary/80 rounded-t-xl" />

      {/* Content */}
      <div className="p-3 md:p-4">
        <h3 className="font-serif text-sm md:text-base text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {lang === "ar" ? d.nameAr : d.name}
        </h3>
        <p className="text-muted-foreground font-body text-[11px] md:text-xs leading-relaxed mb-2">
          {lang === "ar" ? d.descAr : d.desc}
        </p>
        <motion.a
          href="#"
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-1 text-primary font-body text-[11px] font-medium tracking-wide hover:text-accent transition-colors"
        >
          {t("learnMore")} <ArrowRight className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 md:py-24 bg-background" ref={sectionRef} id="departments">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">{t("ourSpecialties")}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">{t("medicalDepartments")}</h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm md:text-base">
            {t("deptCount")}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={showAll ? "all" : "initial"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4"
          >
            {visibleDepts.map((d, i) => (
              <DeptCard key={d.name} d={d} index={i} fromLeft={i % 2 === 0} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 md:mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 border border-primary text-primary px-6 md:px-8 py-2.5 md:py-3 rounded-full font-body text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {showAll ? t("showLess") : t("viewAllDepts")}
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
