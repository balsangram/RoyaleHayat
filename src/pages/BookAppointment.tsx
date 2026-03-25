import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain, Sparkles, Stethoscope, Building2, User, CheckCircle2,
  Search, ArrowRight, ArrowLeft, Clock, Shield, Zap, Star,
  Activity, Heart, Baby, Eye, Bone, Pill, Microscope, Scissors, Smile,
  AlertCircle, FileText, Thermometer, ClipboardList, UserPlus, LogIn
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// ─── DATA ────────────────────────────────────────────────────────────────────

const symptomChips = [
  "Headache", "Chest Pain", "Fever", "Cough", "Fatigue", "Dizziness",
  "Nausea", "Back Pain", "Shortness of Breath", "Joint Pain",
  "Abdominal Pain", "Skin Rash", "Sore Throat", "Blurred Vision",
  "Insomnia", "Weight Loss", "Anxiety", "Palpitations",
];

const departments = [
  { id: 1, name: "Obstetrics & Gynecology", icon: Heart, category: "Women's Health", keywords: ["abdominal pain", "nausea"] },
  { id: 2, name: "Pediatrics", icon: Baby, category: "Children", keywords: ["fever", "cough", "sore throat"] },
  { id: 3, name: "Internal Medicine", icon: Activity, category: "General", keywords: ["fatigue", "fever", "weight loss", "chest pain"] },
  { id: 4, name: "Cardiology", icon: Heart, category: "Heart & Vascular", keywords: ["chest pain", "palpitations", "shortness of breath"] },
  { id: 5, name: "Orthopedics", icon: Bone, category: "Bones & Joints", keywords: ["back pain", "joint pain"] },
  { id: 6, name: "Dermatology", icon: Smile, category: "Skin", keywords: ["skin rash"] },
  { id: 7, name: "Ophthalmology", icon: Eye, category: "Eye", keywords: ["blurred vision"] },
  { id: 8, name: "ENT", icon: Stethoscope, category: "Head & Neck", keywords: ["sore throat", "dizziness", "headache"] },
  { id: 9, name: "Neurology", icon: Brain, category: "Nervous System", keywords: ["headache", "dizziness", "insomnia"] },
  { id: 10, name: "General Surgery", icon: Scissors, category: "Surgery", keywords: ["abdominal pain"] },
  { id: 11, name: "Pulmonology", icon: Activity, category: "Lungs", keywords: ["cough", "shortness of breath"] },
  { id: 12, name: "Gastroenterology", icon: Pill, category: "Digestive", keywords: ["nausea", "abdominal pain"] },
  { id: 13, name: "Urology", icon: Stethoscope, category: "Urinary", keywords: ["back pain", "abdominal pain"] },
  { id: 14, name: "Psychiatry", icon: Brain, category: "Mental Health", keywords: ["anxiety", "insomnia"] },
  { id: 15, name: "Nephrology", icon: Microscope, category: "Kidney", keywords: ["fatigue", "back pain"] },
  { id: 16, name: "Endocrinology", icon: Activity, category: "Hormones", keywords: ["weight loss", "fatigue"] },
  { id: 17, name: "Oncology", icon: Microscope, category: "Cancer Care", keywords: ["weight loss", "fatigue"] },
  { id: 18, name: "Dental Clinic", icon: Smile, category: "Dental", keywords: ["headache"] },
  { id: 19, name: "Plastic & Cosmetic Surgery", icon: Scissors, category: "Cosmetic", keywords: [] },
  { id: 20, name: "Neonatal Unit (NICU)", icon: Baby, category: "Children", keywords: [] },
  { id: 21, name: "IVF & Reproductive Medicine", icon: Heart, category: "Women's Health", keywords: [] },
  { id: 22, name: "Physiotherapy", icon: Bone, category: "Rehabilitation", keywords: ["back pain", "joint pain"] },
  { id: 23, name: "Radiology", icon: Microscope, category: "Diagnostics", keywords: [] },
  { id: 24, name: "Laboratory", icon: Microscope, category: "Diagnostics", keywords: [] },
  { id: 25, name: "Nutrition & Dietetics", icon: Pill, category: "Wellness", keywords: ["weight loss"] },
  { id: 26, name: "Emergency Medicine", icon: AlertCircle, category: "Emergency", keywords: ["chest pain", "shortness of breath"] },
  { id: 27, name: "Rheumatology", icon: Bone, category: "Bones & Joints", keywords: ["joint pain"] },
  { id: 28, name: "Hematology", icon: Microscope, category: "Blood", keywords: ["fatigue"] },
  { id: 29, name: "Allergy & Immunology", icon: Shield, category: "Immunity", keywords: ["skin rash", "cough"] },
  { id: 30, name: "Pain Management", icon: Pill, category: "Wellness", keywords: ["back pain", "headache", "joint pain"] },
];

const doctorsData: Record<number, Array<{
  id: number; name: string; specialty: string; available: boolean;
  languages: string[]; experience: string; rating: number;
}>> = {};

departments.forEach((dept) => {
  const firstNames = ["Dr. Ahmed", "Dr. Hanan", "Dr. Khalid", "Dr. Fatima", "Dr. Omar", "Dr. Sara", "Dr. Mohammed"];
  const lastNames = ["Al-Khaled", "Al-Shammari", "Al-Rashidi", "Al-Mutairi", "Al-Dosari", "Al-Sabah", "Al-Fahad"];
  const count = 3 + Math.floor(Math.random() * 3);
  doctorsData[dept.id] = Array.from({ length: count }, (_, i) => ({
    id: dept.id * 100 + i,
    name: `${firstNames[i % firstNames.length]} ${lastNames[(i + dept.id) % lastNames.length]}`,
    specialty: dept.name,
    available: Math.random() > 0.3,
    languages: i % 2 === 0 ? ["English", "Arabic"] : ["English", "Arabic", "Hindi"],
    experience: `${8 + Math.floor(Math.random() * 15)}+ Years`,
    rating: 4.2 + Math.round(Math.random() * 8) / 10,
  }));
});

// Steps: Symptoms → Department → Doctor → Patient Info → Confirm (NO schedule)
const steps = [
  { label: "Symptoms", icon: Stethoscope },
  { label: "Department", icon: Building2 },
  { label: "Doctor", icon: User },
  { label: "Patient Info", icon: ClipboardList },
  { label: "Confirm", icon: CheckCircle2 },
];

function getAIDepartmentSuggestions(symptoms: string[]): number[] {
  const lower = symptoms.map((s) => s.toLowerCase());
  const scores: Record<number, number> = {};
  departments.forEach((dept) => {
    const hits = dept.keywords.filter((k) => lower.some((s) => s.includes(k) || k.includes(s))).length;
    if (hits > 0) scores[dept.id] = hits;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([id]) => Number(id));
}

function getAIDoctorRecommendations(deptId: number): number[] {
  const docs = doctorsData[deptId] || [];
  const sorted = [...docs].sort((a, b) => {
    if (a.available && !b.available) return -1;
    if (!a.available && b.available) return 1;
    return b.rating - a.rating;
  });
  return sorted.slice(0, 3).map((d) => d.id);
}

function getAIInsights(symptoms: string[]) {
  const insightsMap: Record<string, { condition: string; precaution: string }> = {
    headache: { condition: "Tension headache or migraine", precaution: "Stay hydrated, avoid bright screens" },
    "chest pain": { condition: "Possible cardiac or musculoskeletal issue", precaution: "Avoid heavy physical activity" },
    fever: { condition: "Possible viral or bacterial infection", precaution: "Rest well, stay hydrated" },
    cough: { condition: "Upper respiratory tract infection", precaution: "Avoid cold beverages" },
    fatigue: { condition: "Could indicate anemia or thyroid issues", precaution: "Ensure adequate sleep" },
    dizziness: { condition: "Vertigo or blood pressure fluctuation", precaution: "Avoid sudden movements" },
    nausea: { condition: "Gastrointestinal or inner ear condition", precaution: "Eat light meals" },
    "back pain": { condition: "Muscular strain or disc issue", precaution: "Maintain good posture" },
  };
  const found = symptoms.flatMap((s) => {
    const key = s.toLowerCase();
    return insightsMap[key] ? [insightsMap[key]] : [];
  });
  return found.length > 0 ? found.slice(0, 3) : [{ condition: "General checkup recommended", precaution: "Bring previous medical records" }];
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const BookAppointment = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);

  // Step 0: Symptoms
  const [symptomText, setSymptomText] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  // Step 1: Department
  const [deptSearch, setDeptSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState<number | null>(null);
  const [aiSuggestedDepts, setAiSuggestedDepts] = useState<number[]>([]);

  // Step 2: Doctor
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [aiRecommendedDocs, setAiRecommendedDocs] = useState<number[]>([]);
  const [isRequestMode, setIsRequestMode] = useState(false);

  // Step 3: Patient Details
  const [patientType, setPatientType] = useState<"returning" | "new" | null>(null);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientCountryCode, setPatientCountryCode] = useState("+965");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientErrors, setPatientErrors] = useState<Record<string, string>>({});

  const [booked, setBooked] = useState(false);

  const allSymptoms = [...selectedChips, ...(symptomText.trim() ? [symptomText.trim()] : [])];

  const handleSymptomContinue = () => {
    if (allSymptoms.length === 0) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiSuggestedDepts(getAIDepartmentSuggestions(allSymptoms));
      setAiLoading(false);
      setStep(1);
    }, 1200);
  };

  useEffect(() => {
    if (selectedDept !== null) {
      setAiRecommendedDocs(getAIDoctorRecommendations(selectedDept));
    }
  }, [selectedDept]);

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const filteredDepts = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(deptSearch.toLowerCase()) ||
      d.category.toLowerCase().includes(deptSearch.toLowerCase())
  );

  const doctors = selectedDept ? doctorsData[selectedDept] || [] : [];
  const selectedDeptObj = departments.find((d) => d.id === selectedDept);
  const selectedDoctorObj = doctors.find((d) => d.id === selectedDoctor);

  const validatePatientDetails = () => {
    const errors: Record<string, string> = {};
    if (!patientName.trim()) errors.name = "Full name is required";
    if (!patientPhone.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{7,15}$/.test(patientPhone.trim())) errors.phone = "Enter a valid phone number";
    if (!patientAge.trim()) errors.age = "Age is required";
    else if (isNaN(Number(patientAge)) || Number(patientAge) < 0 || Number(patientAge) > 150) errors.age = "Enter a valid age";
    if (!patientGender) errors.gender = "Gender is required";
    setPatientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const canProceed = () => {
    switch (step) {
      case 0: return allSymptoms.length > 0;
      case 1: return selectedDept !== null;
      case 2: return selectedDoctor !== null;
      case 3: return patientType === "new" && patientName.trim() !== "" && patientPhone.trim() !== "" && patientAge.trim() !== "" && patientGender !== "";
      default: return true;
    }
  };

  const handleNext = () => {
    if (step === 0) { handleSymptomContinue(); return; }
    if (step === 3) {
      if (patientType !== "new") return;
      if (!validatePatientDetails()) return;
    }
    if (step === 4) { setBooked(true); return; }
    if (step === 2 && isRequestMode) { setStep(3); return; }
    setStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  // ─── BOOKED SUCCESS SCREEN ─────────────────────────────────────────────────
  if (booked) {
    const insights = getAIInsights(allSymptoms);
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-[76px]">
          {/* Full-width confirmation banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-primary py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-serif text-primary-foreground mb-3">
              {isRequestMode ? t("requestSubmitted") : t("appointmentConfirmed")}
            </h1>
            <p className="text-primary-foreground/70 font-body text-sm max-w-md mx-auto">
              {isRequestMode ? t("requestConfirmMsg") : t("bookingConfirmMsg")}
            </p>
          </motion.div>

          <div className="container mx-auto px-6 py-12 max-w-3xl">
            {/* Appointment Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-popover rounded-2xl border border-border p-8 mb-6 shadow-sm -mt-8"
            >
              <h3 className="font-serif text-lg text-foreground mb-5">{t("appointmentDetails")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-body text-sm">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">{t("doctor")}</p>
                    <p className="text-foreground font-medium">{selectedDoctorObj?.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">{t("department")}</p>
                    <p className="text-foreground font-medium">{selectedDeptObj?.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClipboardList className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">{t("patient")}</p>
                    <p className="text-foreground font-medium">{patientName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">{t("symptoms")}</p>
                    <p className="text-foreground font-medium">{allSymptoms.join(", ")}</p>
                  </div>
                </div>
                {isRequestMode && (
                  <div className="sm:col-span-2 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider">{t("status")}</p>
                      <p className="text-accent font-medium">{t("pendingStatus")}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="bg-popover rounded-2xl border border-border p-8 mb-6">
              <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                {t("nextSteps")}
              </h3>
              <ul className="space-y-3 font-body text-sm text-muted-foreground">
                {[t("step1"), t("step2"), t("step3"), t("step4"), t("step5")].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* AI Insights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="bg-primary/5 border border-primary/10 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-5 h-5 text-accent" />
                <h3 className="font-serif text-lg text-foreground">{t("aiHealthInsights")}</h3>
              </div>
              <div className="space-y-3">
                {insights.map((ins, i) => (
                  <div key={i} className="bg-popover rounded-xl p-4 border border-border">
                    <p className="font-body text-sm font-medium text-foreground mb-1">{ins.condition}</p>
                    <p className="font-body text-xs text-muted-foreground">{ins.precaution}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="text-center">
              <button onClick={() => navigate("/")}
                className="bg-primary text-primary-foreground px-10 py-3.5 rounded-lg font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors">
                {t("backToHome")}
              </button>
            </div>
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  // ─── MAIN BOOKING FLOW ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-12 max-w-5xl pt-[100px]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs tracking-[0.3em] uppercase font-body">{t("aiAssistedBooking")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground">{t("bookYourAppointment")}</h1>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-1 mb-12 flex-wrap">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <motion.button
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                whileHover={i < step ? { scale: 1.05 } : {}}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-body tracking-wide transition-all duration-300 ${
                  i === step
                    ? "bg-primary text-primary-foreground shadow-md"
                    : i < step
                    ? "bg-accent/10 text-accent cursor-pointer hover:bg-accent/20"
                    : "bg-muted/40 text-muted-foreground"
                }`}
              >
                <s.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
              </motion.button>
              {i < steps.length - 1 && (
                <div className={`w-6 h-0.5 mx-0.5 rounded ${i < step ? "bg-accent" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* AI Loading */}
        <AnimatePresence>
          {aiLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                className="bg-popover rounded-2xl p-10 shadow-xl border border-border text-center max-w-sm">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-2 border-accent/20 border-t-accent mx-auto mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">{t("analyzing")}</h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* STEP 0: SYMPTOMS */}
          {step === 0 && (
            <motion.div key="s0" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-popover rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="text-xl font-serif text-foreground">{t("tellUsSymptoms")}</h2>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-6 ml-[52px]">
                    {[{ icon: Zap, text: t("instantAI") }, { icon: Shield, text: t("clinicallyValidated") }, { icon: Clock, text: t("available247") }].map((f) => (
                      <div key={f.text} className="flex items-center gap-1.5 text-muted-foreground">
                        <f.icon className="w-3.5 h-3.5 text-accent" />
                        <span className="font-body text-xs">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <textarea
                    value={symptomText}
                    onChange={(e) => setSymptomText(e.target.value)}
                    placeholder={t("describeInDetail")}
                    className="w-full h-28 bg-muted/20 border border-border rounded-xl p-5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all mb-6"
                  />
                  <p className="font-body text-xs text-muted-foreground mb-3 uppercase tracking-wider">{t("quickSelect")}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {symptomChips.map((chip) => (
                      <motion.button key={chip} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        onClick={() => toggleChip(chip)}
                        className={`px-4 py-2 rounded-full text-xs font-body tracking-wide transition-all duration-200 border ${
                          selectedChips.includes(chip)
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background border-border text-muted-foreground hover:border-accent hover:text-accent"
                        }`}>
                        {chip}
                      </motion.button>
                    ))}
                  </div>
                  {selectedChips.length > 0 && (
                    <div className="bg-accent/5 rounded-xl p-4 border border-accent/10 mb-4">
                      <p className="font-body text-xs text-accent font-medium mb-1">
                        <Sparkles className="w-3 h-3 inline mr-1" />
                        {selectedChips.length} {t("symptomsSelected")}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {selectedChips.join(", ")}{symptomText.trim() && `, ${symptomText.trim()}`}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground pt-2">
                    <Shield className="w-4 h-4 text-accent" />
                    <span className="font-body text-xs">{t("dataEncrypted")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 1: DEPARTMENTS */}
          {step === 1 && (
            <motion.div key="s1" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-4xl mx-auto">
                {aiSuggestedDepts.length > 0 && (
                  <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-accent" />
                      <h3 className="font-body text-sm font-medium text-accent">{t("aiRecommendedDepts")}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {aiSuggestedDepts.slice(0, 6).map((id) => {
                        const dept = departments.find((d) => d.id === id)!;
                        return (
                          <motion.button key={dept.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDept(dept.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                              selectedDept === dept.id
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-popover border-accent/20 hover:border-accent text-foreground"
                            }`}>
                            <dept.icon className="w-5 h-5 flex-shrink-0" />
                            <div>
                              <p className="font-body text-sm font-medium">{dept.name}</p>
                              <p className={`font-body text-xs ${selectedDept === dept.id ? "text-primary-foreground/70" : "text-accent"}`}>
                                <Sparkles className="w-3 h-3 inline mr-1" />{t("aiMatch")}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={deptSearch} onChange={(e) => setDeptSearch(e.target.value)}
                    placeholder={t("searchDepartments")}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-popover font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredDepts.map((dept) => {
                    const isAI = aiSuggestedDepts.includes(dept.id);
                    return (
                      <motion.button key={dept.id} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDept(dept.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                          selectedDept === dept.id
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : isAI
                            ? "bg-accent/5 border-accent/20 hover:border-accent text-foreground"
                            : "bg-popover border-border hover:border-accent/40 text-foreground"
                        }`}>
                        <dept.icon className={`w-5 h-5 flex-shrink-0 ${selectedDept === dept.id ? "" : "text-accent"}`} />
                        <div className="min-w-0">
                          <p className="font-body text-sm font-medium truncate">{dept.name}</p>
                          <p className={`font-body text-xs ${selectedDept === dept.id ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{dept.category}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DOCTORS */}
          {step === 2 && (
            <motion.div key="s2" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-4xl mx-auto">
                {aiRecommendedDocs.length > 0 && (
                  <div className="mb-4 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-accent" />
                    <h3 className="font-body text-sm font-medium text-accent">{t("aiRecommendedDocs")}</h3>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doc) => {
                    const isRecommended = aiRecommendedDocs.includes(doc.id);
                    return (
                      <motion.div key={doc.id} whileHover={{ y: -3 }}
                        className={`relative rounded-2xl border p-5 transition-all cursor-pointer ${
                          selectedDoctor === doc.id
                            ? "bg-primary/5 border-primary shadow-md"
                            : "bg-popover border-border hover:border-accent/40"
                        }`}
                        onClick={() => {
                          setSelectedDoctor(doc.id);
                          setIsRequestMode(!doc.available);
                        }}>
                        {isRecommended && (
                          <div className="absolute top-3 right-3 bg-accent/10 text-accent px-2 py-0.5 rounded-full text-[10px] font-body tracking-wide flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> {t("aiPick")}
                          </div>
                        )}
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-lg flex-shrink-0">
                            {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-base text-foreground mb-0.5">{doc.name}</h4>
                            <p className="font-body text-xs text-muted-foreground mb-2">{doc.specialty}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <span className="font-body text-[10px] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">{doc.experience}</span>
                              <span className="font-body text-[10px] text-accent bg-accent/5 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                <Star className="w-3 h-3" /> {doc.rating}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {doc.languages.map((l) => (
                                <span key={l} className="font-body text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded-full">{l}</span>
                              ))}
                            </div>
                            {doc.available ? (
                              <div className="flex items-center gap-1.5 text-green-600">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="font-body text-xs">{t("available")}</span>
                              </div>
                            ) : (
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-destructive">
                                  <div className="w-2 h-2 rounded-full bg-destructive" />
                                  <span className="font-body text-xs">{t("currentlyUnavailable")}</span>
                                </div>
                                <p className="font-body text-[10px] text-muted-foreground">{t("clickToRequest")}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PATIENT INFO */}
          {step === 3 && (
            <motion.div key="s3" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto">
                {!patientType && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <motion.button
                      whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(74,20,35,0.12)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPatientType("returning")}
                      className="bg-popover rounded-2xl p-8 border border-border text-center transition-all hover:border-primary/40"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-serif text-lg text-foreground mb-2">{t("registeredPatient")}</h3>
                      <p className="font-body text-xs text-muted-foreground">{t("alreadyAccount")}</p>
                    </motion.button>
                    <motion.button
                      whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(74,20,35,0.12)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPatientType("new")}
                      className="bg-popover rounded-2xl p-8 border border-border text-center transition-all hover:border-primary/40"
                    >
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-serif text-lg text-foreground mb-2">{t("firstTimeVisitor")}</h3>
                      <p className="font-body text-xs text-muted-foreground">{t("newToRoyale")}</p>
                    </motion.button>
                  </div>
                )}

                {patientType === "new" && (
                  <div className="bg-popover rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-xl font-serif text-foreground">{t("patientDetails")}</h2>
                        <p className="text-muted-foreground font-body text-xs">{t("provideInfo")}</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          {t("fullName")} <span className="text-destructive">*</span>
                        </label>
                        <input type="text" value={patientName}
                          onChange={(e) => { setPatientName(e.target.value); setPatientErrors(prev => ({ ...prev, name: "" })); }}
                          placeholder={t("enterFullName")}
                          className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.name ? "border-destructive" : "border-border"}`} />
                        {patientErrors.name && <p className="font-body text-xs text-destructive mt-1">{patientErrors.name}</p>}
                      </div>
                      <div>
                        <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          {t("phoneNumber")} <span className="text-destructive">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select value={patientCountryCode} onChange={(e) => setPatientCountryCode(e.target.value)}
                            className="w-24 px-3 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30">
                            <option value="+965">+965</option>
                            <option value="+966">+966</option>
                            <option value="+971">+971</option>
                            <option value="+973">+973</option>
                            <option value="+968">+968</option>
                            <option value="+974">+974</option>
                            <option value="+20">+20</option>
                            <option value="+91">+91</option>
                            <option value="+44">+44</option>
                            <option value="+1">+1</option>
                          </select>
                          <input type="tel" value={patientPhone}
                            onChange={(e) => { setPatientPhone(e.target.value.replace(/\D/g, "")); setPatientErrors(prev => ({ ...prev, phone: "" })); }}
                            placeholder={t("phonePlaceholder")}
                            className={`flex-1 px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.phone ? "border-destructive" : "border-border"}`} />
                        </div>
                        {patientErrors.phone && <p className="font-body text-xs text-destructive mt-1">{patientErrors.phone}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            {t("age")} <span className="text-destructive">*</span>
                          </label>
                          <input type="number" min="0" max="150" value={patientAge}
                            onChange={(e) => { setPatientAge(e.target.value); setPatientErrors(prev => ({ ...prev, age: "" })); }}
                            placeholder={t("enterAge")}
                            className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.age ? "border-destructive" : "border-border"}`} />
                          {patientErrors.age && <p className="font-body text-xs text-destructive mt-1">{patientErrors.age}</p>}
                        </div>
                        <div>
                          <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            {t("gender")} <span className="text-destructive">*</span>
                          </label>
                          <select value={patientGender}
                            onChange={(e) => { setPatientGender(e.target.value); setPatientErrors(prev => ({ ...prev, gender: "" })); }}
                            className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.gender ? "border-destructive" : "border-border"}`}>
                            <option value="">{t("selectGender")}</option>
                            <option value="male">{t("male")}</option>
                            <option value="female">{t("female")}</option>
                          </select>
                          {patientErrors.gender && <p className="font-body text-xs text-destructive mt-1">{patientErrors.gender}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {patientType === "returning" && (
                  <div className="bg-popover rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <LogIn className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-serif text-foreground">{t("patientLogin")}</h2>
                        <p className="text-muted-foreground font-body text-xs">{t("loginToAccount")}</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("username")}</label>
                        <input type="text" placeholder={t("enterUsername")}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all" />
                      </div>
                      <div>
                        <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("password")}</label>
                        <input type="password" placeholder={t("enterPassword")}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all" />
                      </div>
                      <div className="flex items-center justify-between">
                        <button className="font-body text-xs text-accent hover:text-primary transition-colors">{t("forgotPassword")}</button>
                      </div>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                        <LogIn className="w-4 h-4" />
                        {t("login")}
                      </motion.button>
                    </div>
                  </div>
                )}

                {patientType && (
                  <button onClick={() => setPatientType(null)} className="mt-4 font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
                    ← {t("changeSelection")}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONFIRM */}
          {step === 4 && (
            <motion.div key="s4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-popover rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                  <h2 className="font-serif text-xl text-foreground mb-2">
                    {isRequestMode ? t("reviewSubmit") : t("reviewConfirm")}
                  </h2>
                  {isRequestMode && (
                    <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 mb-6">
                      <p className="font-body text-sm text-accent font-medium">{t("appointmentRequest")}</p>
                      <p className="font-body text-xs text-muted-foreground">{t("requestNote")}</p>
                    </div>
                  )}
                  <div className="space-y-5">
                    {[
                      { label: t("symptoms"), value: allSymptoms.join(", "), icon: Thermometer, show: true },
                      { label: t("department"), value: selectedDeptObj?.name || "", icon: Building2, show: true },
                      { label: t("doctor"), value: selectedDoctorObj?.name || "", icon: User, show: true },
                      { label: t("patient"), value: patientName, icon: ClipboardList, show: true },
                      { label: t("phone"), value: `${patientCountryCode} ${patientPhone}`, icon: Stethoscope, show: true },
                      { label: t("age"), value: patientAge, icon: User, show: true },
                      { label: t("gender"), value: patientGender === "male" ? t("male") : t("female"), icon: User, show: true },
                    ].filter(row => row.show).map((row) => (
                      <div key={row.label} className="flex items-start gap-4 py-3 border-b border-border last:border-0">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <row.icon className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{row.label}</p>
                          <p className="font-body text-sm text-foreground font-medium">{row.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="max-w-3xl mx-auto flex items-center justify-between mt-8">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={step === 0 ? () => navigate("/") : handleBack}
            className="flex items-center gap-2 text-muted-foreground font-body text-sm hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {step === 0 ? t("backToHome") : t("previous")}
          </motion.button>
          <motion.button
            whileHover={canProceed() ? { scale: 1.03 } : {}}
            whileTap={canProceed() ? { scale: 0.97 } : {}}
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-body text-sm tracking-widest uppercase transition-all duration-300 ${
              canProceed()
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}>
            {step === 4 ? (
              <><CheckCircle2 className="w-4 h-4" />{isRequestMode ? t("submitRequest") : t("confirmBooking")}</>
            ) : step === 0 ? (
              <><Sparkles className="w-4 h-4" />{t("analyzeSymptoms")}</>
            ) : step === 2 && isRequestMode ? (
              <><Clock className="w-4 h-4" />{t("requestAppointment")}</>
            ) : (
              <>{t("continue")} <ArrowRight className="w-4 h-4" /></>
            )}
          </motion.button>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BookAppointment;
