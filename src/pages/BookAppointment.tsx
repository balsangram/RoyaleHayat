import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain, Sparkles, Stethoscope, Building2, User, CalendarDays, CheckCircle2,
  Search, ArrowRight, ArrowLeft, Clock, Shield, Zap, Star,
  Activity, Heart, Baby, Eye, Bone, Pill, Microscope, Scissors, Smile,
  AlertCircle, PartyPopper, FileText, Thermometer, Info, ClipboardList
} from "lucide-react";
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
  previouslyConsulted?: boolean;
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
    previouslyConsulted: i === 0 && dept.id <= 5,
  }));
});

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let h = 8; h <= 17; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 17) slots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const getNext7Days = () => {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const nationalities = [
  "Kuwaiti", "Saudi", "Emirati", "Bahraini", "Omani", "Qatari",
  "Egyptian", "Jordanian", "Lebanese", "Syrian", "Iraqi", "Palestinian",
  "Indian", "Pakistani", "Filipino", "Bangladeshi", "Sri Lankan",
  "British", "American", "Canadian", "Australian", "French", "German",
  "Other",
];

const steps = [
  { label: "Symptoms", icon: Stethoscope },
  { label: "Department", icon: Building2 },
  { label: "Doctor", icon: User },
  { label: "Schedule", icon: CalendarDays },
  { label: "Patient Info", icon: ClipboardList },
  { label: "Confirm", icon: CheckCircle2 },
];

// ─── AI SIMULATION HELPERS ───────────────────────────────────────────────────

function getAIDepartmentSuggestions(symptoms: string[]): number[] {
  const lower = symptoms.map((s) => s.toLowerCase());
  const scores: Record<number, number> = {};
  departments.forEach((dept) => {
    const hits = dept.keywords.filter((k) => lower.some((s) => s.includes(k) || k.includes(s))).length;
    if (hits > 0) scores[dept.id] = hits;
  });
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => Number(id));
}

function getAIDoctorRecommendations(deptId: number, _symptoms: string[]): number[] {
  const docs = doctorsData[deptId] || [];
  const sorted = [...docs].sort((a, b) => {
    if (a.previouslyConsulted && !b.previouslyConsulted) return -1;
    if (!a.previouslyConsulted && b.previouslyConsulted) return 1;
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

  // Step 3: Schedule
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [unavailableSlots] = useState<string[]>(() => {
    const count = 3 + Math.floor(Math.random() * 4);
    const shuffled = [...timeSlots].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  });

  // Step 4: Patient Details
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientCountryCode, setPatientCountryCode] = useState("+965");
  const [patientNationality, setPatientNationality] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientErrors, setPatientErrors] = useState<Record<string, string>>({});

  // Done
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
      setAiRecommendedDocs(getAIDoctorRecommendations(selectedDept, allSymptoms));
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
  const dates = getNext7Days();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const validatePatientDetails = () => {
    const errors: Record<string, string> = {};
    if (!patientName.trim()) errors.name = "Full name is required";
    if (!patientPhone.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{7,15}$/.test(patientPhone.trim())) errors.phone = "Enter a valid phone number";
    if (!patientNationality) errors.nationality = "Please select your nationality";
    setPatientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const canProceed = () => {
    switch (step) {
      case 0: return allSymptoms.length > 0;
      case 1: return selectedDept !== null;
      case 2: return selectedDoctor !== null && (isRequestMode || (doctors.find(d => d.id === selectedDoctor)?.available ?? false));
      case 3: return selectedDate !== null && selectedTime !== null;
      case 4: return patientName.trim() !== "" && patientPhone.trim() !== "" && patientNationality !== "";
      default: return true;
    }
  };

  const handleNext = () => {
    if (step === 0) { handleSymptomContinue(); return; }
    if (step === 4) {
      if (!validatePatientDetails()) return;
    }
    if (step === 5) { setBooked(true); return; }
    // In request mode, skip schedule (step 3) — go from doctor (2) to patient details (4)
    if (step === 2 && isRequestMode) {
      setStep(4);
      return;
    }
    setStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => {
    // In request mode, going back from patient details (4) should go to doctor (2)
    if (step === 4 && isRequestMode) {
      setStep(2);
      return;
    }
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
        <div className="container mx-auto px-6 py-20 max-w-3xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <PartyPopper className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl font-serif text-foreground mb-3">
              {isRequestMode ? "Appointment Request Submitted!" : "Appointment Confirmed!"}
            </h1>
            <p className="text-muted-foreground font-body">
              {isRequestMode
                ? "Your appointment request has been submitted. We will get back to you within 6–12 hours."
                : "Your booking has been successfully registered."}
            </p>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-popover rounded-2xl border border-border p-8 mb-8 shadow-sm"
          >
            <h3 className="font-serif text-lg text-foreground mb-4">Booking Summary</h3>
            <div className="grid grid-cols-2 gap-4 font-body text-sm">
              <div><span className="text-muted-foreground">Patient:</span><br /><span className="text-foreground font-medium">{patientName}</span></div>
              <div><span className="text-muted-foreground">Phone:</span><br /><span className="text-foreground font-medium">{patientCountryCode} {patientPhone}</span></div>
              <div><span className="text-muted-foreground">Department:</span><br /><span className="text-foreground font-medium">{selectedDeptObj?.name}</span></div>
              <div><span className="text-muted-foreground">Doctor:</span><br /><span className="text-foreground font-medium">{selectedDoctorObj?.name}</span></div>
              {!isRequestMode && (
                <>
                  <div><span className="text-muted-foreground">Date:</span><br /><span className="text-foreground font-medium">{selectedDate && `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`}</span></div>
                  <div><span className="text-muted-foreground">Time:</span><br /><span className="text-foreground font-medium">{selectedTime}</span></div>
                </>
              )}
              {isRequestMode && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Status:</span><br />
                  <span className="text-accent font-medium">Pending — We will contact you within 6–12 hours</span>
                </div>
              )}
              <div className="col-span-2"><span className="text-muted-foreground">Symptoms:</span><br /><span className="text-foreground font-medium">{allSymptoms.join(", ")}</span></div>
            </div>
          </motion.div>

          {/* AI Health Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-primary/5 border border-primary/10 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground">AI Health Insights</h3>
                <p className="text-muted-foreground font-body text-xs">Personalized analysis based on your symptoms</p>
              </div>
            </div>
            <div className="space-y-4">
              {insights.map((ins, i) => (
                <div key={i} className="bg-popover rounded-xl p-4 border border-border">
                  <p className="font-body text-sm font-medium text-foreground mb-1">{ins.condition}</p>
                  <p className="font-body text-xs text-muted-foreground">{ins.precaution}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preparation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-popover rounded-2xl border border-border p-8 mb-8"
          >
            <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Before Your Appointment
            </h3>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              {[
                "Bring a valid ID and insurance card",
                "List of current medications",
                "Previous medical reports or lab results",
                "Arrive 15 minutes before your scheduled time",
                "Wear comfortable clothing for examination",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="bg-primary text-primary-foreground px-10 py-3.5 rounded-lg font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </button>
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

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs tracking-[0.3em] uppercase font-body">AI-Assisted Booking</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground">Book Your Appointment</h1>
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

        {/* AI Loading Overlay */}
        <AnimatePresence>
          {aiLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-popover rounded-2xl p-10 shadow-xl border border-border text-center max-w-sm"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-2 border-accent/20 border-t-accent mx-auto mb-4"
                />
                <h3 className="font-serif text-lg text-foreground mb-2">AI Analyzing Symptoms</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Cross-referencing medical databases to find the best departments and specialists for you...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* ─── STEP 0: SYMPTOMS ─── */}
          {step === 0 && (
            <motion.div key="s0" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-popover rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif text-foreground">Tell Us Your Symptoms</h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground font-body text-sm mb-6 ml-[52px]">
                    Our AI analyzes patterns across millions of medical cases to recommend the right specialist for you.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6 ml-[52px]">
                    {[
                      { icon: Zap, text: "Instant AI Analysis" },
                      { icon: Shield, text: "Clinically Validated" },
                      { icon: Clock, text: "24/7 Available" },
                    ].map((f) => (
                      <div key={f.text} className="flex items-center gap-1.5 text-muted-foreground">
                        <f.icon className="w-3.5 h-3.5 text-accent" />
                        <span className="font-body text-xs">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  <textarea
                    value={symptomText}
                    onChange={(e) => setSymptomText(e.target.value)}
                    placeholder="Describe your symptoms in detail, e.g., 'I've been experiencing headaches and dizziness for the past week...'"
                    className="w-full h-28 bg-muted/20 border border-border rounded-xl p-5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all mb-6"
                  />

                  <p className="font-body text-xs text-muted-foreground mb-3 uppercase tracking-wider">Quick select symptoms</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {symptomChips.map((chip) => (
                      <motion.button
                        key={chip}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => toggleChip(chip)}
                        className={`px-4 py-2 rounded-full text-xs font-body tracking-wide transition-all duration-200 border ${
                          selectedChips.includes(chip)
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background border-border text-muted-foreground hover:border-accent hover:text-accent"
                        }`}
                      >
                        {chip}
                      </motion.button>
                    ))}
                  </div>

                  {selectedChips.length > 0 && (
                    <div className="bg-accent/5 rounded-xl p-4 border border-accent/10 mb-4">
                      <p className="font-body text-xs text-accent font-medium mb-1">
                        <Sparkles className="w-3 h-3 inline mr-1" />
                        {selectedChips.length} symptom{selectedChips.length > 1 ? "s" : ""} selected
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {selectedChips.join(", ")}
                        {symptomText.trim() && `, ${symptomText.trim()}`}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Shield className="w-4 h-4 text-accent" />
                      <span className="font-body text-xs">Your data is encrypted and confidential</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 1: DEPARTMENTS ─── */}
          {step === 1 && (
            <motion.div key="s1" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-4xl mx-auto">
                {aiSuggestedDepts.length > 0 && (
                  <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-accent" />
                      <h3 className="font-body text-sm font-medium text-accent">AI Recommended Departments</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {aiSuggestedDepts.slice(0, 6).map((id) => {
                        const dept = departments.find((d) => d.id === id)!;
                        return (
                          <motion.button
                            key={dept.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDept(dept.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                              selectedDept === dept.id
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-popover border-accent/20 hover:border-accent text-foreground"
                            }`}
                          >
                            <dept.icon className="w-5 h-5 flex-shrink-0" />
                            <div>
                              <p className="font-body text-sm font-medium">{dept.name}</p>
                              <p className={`font-body text-xs ${selectedDept === dept.id ? "text-primary-foreground/70" : "text-accent"}`}>
                                <Sparkles className="w-3 h-3 inline mr-1" />AI Match
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
                  <input
                    type="text"
                    value={deptSearch}
                    onChange={(e) => setDeptSearch(e.target.value)}
                    placeholder="Search departments..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-popover font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredDepts.map((dept) => {
                    const isAI = aiSuggestedDepts.includes(dept.id);
                    return (
                      <motion.button
                        key={dept.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDept(dept.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                          selectedDept === dept.id
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : isAI
                            ? "bg-accent/5 border-accent/20 hover:border-accent text-foreground"
                            : "bg-popover border-border hover:border-accent/40 text-foreground"
                        }`}
                      >
                        <dept.icon className={`w-5 h-5 flex-shrink-0 ${selectedDept === dept.id ? "" : "text-accent"}`} />
                        <div className="min-w-0">
                          <p className="font-body text-sm font-medium truncate">{dept.name}</p>
                          <p className={`font-body text-xs ${selectedDept === dept.id ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                            {dept.category}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: DOCTORS ─── */}
          {step === 2 && (
            <motion.div key="s2" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-4xl mx-auto">
                {doctors.some((d) => d.previouslyConsulted) && (
                  <div className="bg-accent/5 rounded-2xl p-5 border border-accent/10 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-accent" />
                      <h3 className="font-body text-sm font-medium text-accent">Previously Consulted</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {doctors.filter((d) => d.previouslyConsulted).map((doc) => (
                        <motion.button
                          key={doc.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedDoctor(doc.id)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                            selectedDoctor === doc.id
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-popover border-accent/20 hover:border-accent text-foreground"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-sm">
                            {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                          </div>
                          <div className="text-left">
                            <p className="font-body text-sm font-medium">{doc.name}</p>
                            <p className={`font-body text-xs ${selectedDoctor === doc.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>Your previous doctor</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {aiRecommendedDocs.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-accent" />
                      <h3 className="font-body text-sm font-medium text-accent">AI Recommended Doctors</h3>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doc) => {
                    const isRecommended = aiRecommendedDocs.includes(doc.id);
                    return (
                      <motion.div
                        key={doc.id}
                        whileHover={{ y: -3 }}
                        className={`relative rounded-2xl border p-5 transition-all cursor-pointer ${
                          selectedDoctor === doc.id
                            ? "bg-primary/5 border-primary shadow-md"
                            : "bg-popover border-border hover:border-accent/40"
                        }`}
                        onClick={() => {
                          setSelectedDoctor(doc.id);
                          setIsRequestMode(!doc.available);
                        }}
                      >
                        {isRecommended && (
                          <div className="absolute top-3 right-3 bg-accent/10 text-accent px-2 py-0.5 rounded-full text-[10px] font-body tracking-wide flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> AI Pick
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
                                <span className="font-body text-xs">Available</span>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="flex items-center gap-1.5 text-destructive">
                                  <div className="w-2 h-2 rounded-full bg-destructive" />
                                  <span className="font-body text-xs">Not Available</span>
                                </div>
                                {!(selectedDoctor === doc.id && isRequestMode) ? (
                                  <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedDoctor(doc.id);
                                      setIsRequestMode(true);
                                    }}
                                    className="font-body text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                                  >
                                    Request Appointment
                                  </motion.button>
                                ) : (
                                  <div>
                                    <p className="font-body text-xs text-accent flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Request Sent
                                    </p>
                                    <p className="font-body text-[10px] text-muted-foreground mt-1">
                                      We will get back to you within 6–12 hours
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Doctor not available CTA */}
                <div className="mt-8 bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center">
                  <h3 className="font-serif text-lg text-foreground mb-2">Doctor not available?</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Can't find a suitable time? Submit a request and our team will arrange an appointment for you.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (selectedDoctor) {
                        setIsRequestMode(true);
                        setStep(4); // Skip to patient details
                      }
                    }}
                    disabled={!selectedDoctor}
                    className={`px-8 py-3 rounded-lg font-body text-sm tracking-widest uppercase transition-colors inline-flex items-center gap-2 ${
                      selectedDoctor
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    Request Appointment
                  </motion.button>
                  <p className="font-body text-xs text-muted-foreground mt-3">
                    We will get back to you within 6–12 hours
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 3: SCHEDULE ─── */}
          {step === 3 && (
            <motion.div key="s3" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-popover rounded-2xl p-8 border border-border shadow-sm">
                  <h2 className="font-serif text-xl text-foreground mb-6">Select Date & Time</h2>

                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-3">Available Dates</p>
                  <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                    {dates.map((d) => (
                      <motion.button
                        key={d.toISOString()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDate(d)}
                        className={`flex flex-col items-center px-5 py-3 rounded-xl border transition-all flex-shrink-0 ${
                          selectedDate?.toDateString() === d.toDateString()
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:border-accent/40 text-foreground"
                        }`}
                      >
                        <span className="font-body text-xs uppercase">{dayNames[d.getDay()]}</span>
                        <span className="font-serif text-xl">{d.getDate()}</span>
                        <span className="font-body text-[10px] uppercase">{monthNames[d.getMonth()]}</span>
                      </motion.button>
                    ))}
                  </div>

                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-3">Available Time Slots</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {timeSlots.map((t) => {
                      const disabled = unavailableSlots.includes(t);
                      return (
                        <motion.button
                          key={t}
                          whileHover={!disabled ? { scale: 1.05 } : {}}
                          whileTap={!disabled ? { scale: 0.95 } : {}}
                          disabled={disabled}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2.5 rounded-lg border font-body text-sm transition-all ${
                            disabled
                              ? "bg-muted/20 text-muted-foreground/30 border-border cursor-not-allowed line-through"
                              : selectedTime === t
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border hover:border-accent/40 text-foreground"
                          }`}
                        >
                          {t}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 4: PATIENT DETAILS ─── */}
          {step === 4 && (
            <motion.div key="s4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-popover rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <ClipboardList className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif text-foreground">Patient Details</h2>
                      <p className="text-muted-foreground font-body text-xs">Please provide your information to complete the booking</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => { setPatientName(e.target.value); setPatientErrors(prev => ({ ...prev, name: "" })); }}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.name ? "border-destructive" : "border-border"}`}
                      />
                      {patientErrors.name && <p className="font-body text-xs text-destructive mt-1">{patientErrors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={patientCountryCode}
                          onChange={(e) => setPatientCountryCode(e.target.value)}
                          className="w-24 px-3 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                        >
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
                        <input
                          type="tel"
                          value={patientPhone}
                          onChange={(e) => { setPatientPhone(e.target.value.replace(/\D/g, "")); setPatientErrors(prev => ({ ...prev, phone: "" })); }}
                          placeholder="Phone number"
                          className={`flex-1 px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.phone ? "border-destructive" : "border-border"}`}
                        />
                      </div>
                      {patientErrors.phone && <p className="font-body text-xs text-destructive mt-1">{patientErrors.phone}</p>}
                    </div>

                    {/* Nationality */}
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Nationality <span className="text-destructive">*</span>
                      </label>
                      <select
                        value={patientNationality}
                        onChange={(e) => { setPatientNationality(e.target.value); setPatientErrors(prev => ({ ...prev, nationality: "" })); }}
                        className={`w-full px-4 py-3 rounded-xl border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${patientErrors.nationality ? "border-destructive" : "border-border"}`}
                      >
                        <option value="">Select nationality</option>
                        {nationalities.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      {patientErrors.nationality && <p className="font-body text-xs text-destructive mt-1">{patientErrors.nationality}</p>}
                    </div>

                    {/* Optional fields */}
                    <div className="pt-2 border-t border-border">
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-4">Optional Information</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="font-body text-xs text-muted-foreground mb-1.5 block">Email</label>
                          <input
                            type="email"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
                          />
                        </div>
                        <div>
                          <label className="font-body text-xs text-muted-foreground mb-1.5 block">Gender</label>
                          <select
                            value={patientGender}
                            onChange={(e) => setPatientGender(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-body text-xs text-muted-foreground mb-1.5 block">Age</label>
                          <input
                            type="number"
                            min="0"
                            max="150"
                            value={patientAge}
                            onChange={(e) => setPatientAge(e.target.value)}
                            placeholder="Age"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 5: CONFIRM ─── */}
          {step === 5 && (
            <motion.div key="s5" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-popover rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                  <h2 className="font-serif text-xl text-foreground mb-2">
                    {isRequestMode ? "Review & Submit Request" : "Review & Confirm"}
                  </h2>
                  {isRequestMode && (
                    <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 mb-6">
                      <p className="font-body text-sm text-accent font-medium">Appointment Request</p>
                      <p className="font-body text-xs text-muted-foreground">
                        The selected doctor is currently not available. We will get back to you within 6–12 hours with a confirmed slot.
                      </p>
                    </div>
                  )}

                  <div className="space-y-5">
                    {[
                      { label: "Symptoms", value: allSymptoms.join(", "), icon: Thermometer, show: true },
                      { label: "Department", value: selectedDeptObj?.name || "", icon: Building2, show: true },
                      { label: "Doctor", value: selectedDoctorObj?.name || "", icon: User, show: true },
                      { label: "Date", value: selectedDate ? `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}` : "", icon: CalendarDays, show: !isRequestMode },
                      { label: "Time", value: selectedTime || "", icon: Clock, show: !isRequestMode },
                      { label: "Patient", value: patientName, icon: ClipboardList, show: true },
                      { label: "Phone", value: `${patientCountryCode} ${patientPhone}`, icon: Stethoscope, show: true },
                      { label: "Nationality", value: patientNationality, icon: Shield, show: true },
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
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={step === 0 ? () => navigate("/") : handleBack}
            className="flex items-center gap-2 text-muted-foreground font-body text-sm hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 0 ? "Back to Home" : "Previous"}
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
            }`}
          >
            {step === 5 ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                {isRequestMode ? "Submit Request" : "Confirm Booking"}
              </>
            ) : step === 0 ? (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze Symptoms
              </>
            ) : step === 2 && isRequestMode ? (
              <>
                <Clock className="w-4 h-4" />
                Request Appointment
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
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
