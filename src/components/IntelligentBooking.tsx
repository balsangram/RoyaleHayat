import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, ShieldCheck, ArrowRight, Stethoscope, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const chipSuggestions = ["Headache", "Chest Pain", "Fever", "Dizziness", "Back Pain", "Fatigue", "Nausea", "Cough", "Joint Pain", "Shortness of Breath"];

const departmentMap: Record<string, { name: string; category: string }[]> = {
  headache: [{ name: "Neurology", category: "Nervous System" }, { name: "ENT", category: "Head & Neck" }],
  "chest pain": [{ name: "Cardiology", category: "Heart & Vascular" }, { name: "Emergency Medicine", category: "Emergency" }],
  fever: [{ name: "Internal Medicine", category: "General" }, { name: "Pediatrics", category: "Children" }],
  dizziness: [{ name: "Neurology", category: "Nervous System" }, { name: "ENT", category: "Head & Neck" }],
  "back pain": [{ name: "Orthopedics", category: "Bones & Joints" }, { name: "Physiotherapy", category: "Rehabilitation" }],
  fatigue: [{ name: "Internal Medicine", category: "General" }, { name: "Endocrinology", category: "Hormones" }],
  nausea: [{ name: "Gastroenterology", category: "Digestive" }, { name: "Obstetrics & Gynecology", category: "Women's Health" }],
  cough: [{ name: "Pulmonology", category: "Lungs" }, { name: "ENT", category: "Head & Neck" }],
  "joint pain": [{ name: "Orthopedics", category: "Bones & Joints" }, { name: "Rheumatology", category: "Bones & Joints" }],
  "shortness of breath": [{ name: "Pulmonology", category: "Lungs" }, { name: "Cardiology", category: "Heart & Vascular" }],
};

const conditionHints: Record<string, string> = {
  headache: "Possible tension headache or migraine",
  "chest pain": "Could indicate cardiac or musculoskeletal issue",
  fever: "Possible viral or bacterial infection",
  dizziness: "May relate to vertigo or blood pressure",
  "back pain": "Possible muscular strain or disc issue",
  fatigue: "Could indicate anemia or thyroid conditions",
  nausea: "May relate to gastrointestinal or inner ear condition",
  cough: "Possible upper respiratory infection",
  "joint pain": "May indicate arthritis or strain",
  "shortness of breath": "Could relate to respiratory or cardiac conditions",
};

const IntelligentBooking = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [focused, setFocused] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [symptomText, setSymptomText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{ departments: { name: string; category: string }[]; conditions: string[] } | null>(null);

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
    setResults(null);
  };

  const handleAnalyze = () => {
    const allSymptoms = [...selectedChips, ...(symptomText.trim() ? [symptomText.trim()] : [])];
    if (allSymptoms.length === 0) return;

    setAnalyzing(true);
    setTimeout(() => {
      const depts = new Map<string, { name: string; category: string }>();
      const conditions: string[] = [];
      allSymptoms.forEach((s) => {
        const key = s.toLowerCase();
        const matches = departmentMap[key] || [];
        matches.forEach((m) => depts.set(m.name, m));
        if (conditionHints[key]) conditions.push(conditionHints[key]);
      });
      if (depts.size === 0) {
        depts.set("Internal Medicine", { name: "Internal Medicine", category: "General" });
        depts.set("General Surgery", { name: "General Surgery", category: "Surgery" });
      }
      if (conditions.length === 0) conditions.push("General checkup recommended");
      setResults({
        departments: Array.from(depts.values()).slice(0, 4),
        conditions: conditions.slice(0, 3),
      });
      setAnalyzing(false);
    }, 1500);
  };

  const handleBookFromResults = () => {
    navigate("/book-appointment");
  };

  const allSymptoms = [...selectedChips, ...(symptomText.trim() ? [symptomText.trim()] : [])];

  return (
    <section className="py-14 bg-primary" id="book">
      <div className="container mx-auto px-6 text-center">
        <ScrollAnimationWrapper>
          <div className="inline-flex items-center gap-2 bg-popover/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body">{t("aiPowered")}</p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground mb-3">{t("tellUsSymptoms")}</h2>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.15}>
          <p className="text-secondary/70 font-body max-w-xl mx-auto mb-6 text-sm">{t("symptomDesc")}</p>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.2}>
          <div className="max-w-2xl mx-auto bg-background rounded-2xl p-8 text-left shadow-2xl border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-serif text-foreground">{t("howFeeling")}</h3>
            </div>
            <p className="text-muted-foreground font-body text-xs mb-4 ml-12">{t("describeSymptoms")}</p>

            <div className="flex flex-wrap gap-2 mb-4 ml-12">
              {chipSuggestions.map((chip, i) => (
                <motion.button
                  key={chip}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleChip(chip)}
                  className={`px-3 py-1.5 rounded-full text-xs font-body cursor-pointer transition-all duration-200 border ${
                    selectedChips.includes(chip)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary/30 text-foreground border-transparent hover:bg-accent/20 hover:text-accent"
                  }`}
                >
                  {chip}
                </motion.button>
              ))}
            </div>

            <textarea
              value={symptomText}
              onChange={(e) => { setSymptomText(e.target.value); setResults(null); }}
              placeholder={t("describeInDetail")}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`w-full h-28 bg-muted/30 border rounded-xl p-4 font-body text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none transition-all duration-500 ${
                focused
                  ? "border-accent/50 ring-2 ring-accent/20 shadow-[0_0_20px_-5px_hsl(var(--accent)/0.3)]"
                  : "border-border"
              }`}
            />

            <AnimatePresence>
              {analyzing && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 overflow-hidden">
                  <div className="bg-accent/5 rounded-xl p-6 border border-accent/10 flex items-center justify-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="w-6 h-6 rounded-full border-2 border-accent/20 border-t-accent" />
                    <span className="font-body text-sm text-accent">{t("analyzing")}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {results && !analyzing && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4">
                  <div className="bg-accent/5 rounded-xl p-5 border border-accent/10">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-4 h-4 text-accent" />
                        <span className="font-body text-sm font-medium text-accent">{t("possibleConditions")}</span>
                      </div>
                      <div className="space-y-1.5 mb-4">
                        {results.conditions.map((c, i) => (
                          <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="font-body text-xs text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1 flex-shrink-0" />
                            {c}
                          </motion.p>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-accent" />
                      <span className="font-body text-sm font-medium text-accent">{t("recommendedDepts")}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {results.departments.map((dept, i) => (
                        <motion.div key={dept.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 bg-popover rounded-lg p-3 border border-border">
                          <div>
                            <p className="font-body text-xs font-medium text-foreground">{dept.name}</p>
                            <p className="font-body text-[10px] text-muted-foreground">{dept.category}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleBookFromResults}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                      {t("continueToBook")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span className="font-body text-[10px]">{t("encrypted")}</span>
              </div>
              {!results && (
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleAnalyze}
                  disabled={allSymptoms.length === 0 || analyzing}
                  className={`px-6 py-2.5 rounded-lg font-body text-xs tracking-widest uppercase transition-all flex items-center gap-2 ${
                    allSymptoms.length > 0 && !analyzing
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("analyzeSymptoms")}
                </motion.button>
              )}
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default IntelligentBooking;
