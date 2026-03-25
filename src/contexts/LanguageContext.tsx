import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface Translations {
  [key: string]: { en: string; ar: string };
}

const translations: Translations = {
  // Nav
  home: { en: "Home", ar: "الرئيسية" },
  about: { en: "About", ar: "عن المستشفى" },
  departments: { en: "Departments", ar: "الأقسام" },
  doctors: { en: "Doctors", ar: "الأطباء" },
  bookAppointment: { en: "Book Appointment", ar: "حجز موعد" },
  login: { en: "Login", ar: "تسجيل الدخول" },
  // Hero
  luxuriousHospital: { en: "The World's Most Luxurious Hospital", ar: "أفخم مستشفى في العالم" },
  exceptionalCare: { en: "Exceptional Care.", ar: "رعاية استثنائية." },
  everyStage: { en: "Every Stage.", ar: "كل مرحلة." },
  everyAge: { en: "Every Age.", ar: "كل عمر." },
  heroDesc: { en: "Where luxury meets world-class medicine. Since 2006, delivering the highest standard of personalized, compassionate care in Kuwait.", ar: "حيث يلتقي الفخامة بالطب العالمي. منذ 2006، نقدم أعلى معايير الرعاية الشخصية والرحيمة في الكويت." },
  bookAnAppointment: { en: "Book an Appointment", ar: "احجز موعداً" },
  exploreServices: { en: "Explore Services", ar: "استكشف الخدمات" },
  discover: { en: "Discover", ar: "اكتشف" },
  // Symptom checker
  aiPowered: { en: "AI-Powered Symptom Checker", ar: "فحص الأعراض بالذكاء الاصطناعي" },
  tellUsSymptoms: { en: "Tell Us Your Symptoms", ar: "أخبرنا بأعراضك" },
  symptomDesc: { en: "Our AI analyzes your symptoms and matches you with the right specialist -- instantly and confidentially.", ar: "يحلل الذكاء الاصطناعي أعراضك ويوصلك بالمختص المناسب فوراً وبسرية تامة." },
  howFeeling: { en: "How are you feeling?", ar: "كيف تشعر؟" },
  describeSymptoms: { en: "Describe your symptoms or select from common ones below.", ar: "صف أعراضك أو اختر من الأعراض الشائعة أدناه." },
  analyzeSymptoms: { en: "Analyze Symptoms", ar: "تحليل الأعراض" },
  analyzing: { en: "Analyzing symptoms...", ar: "جاري تحليل الأعراض..." },
  possibleConditions: { en: "Possible Conditions", ar: "حالات محتملة" },
  recommendedDepts: { en: "Recommended Departments", ar: "الأقسام الموصى بها" },
  continueToBook: { en: "Continue to Book Appointment", ar: "المتابعة لحجز موعد" },
  encrypted: { en: "Encrypted & confidential", ar: "مشفر وسري" },
  // Specialized care
  whatWeOffer: { en: "What We Offer", ar: "ما نقدمه" },
  specializedCare: { en: "Specialized Care", ar: "رعاية متخصصة" },
  specializedDesc: { en: "Tailored, premium medical services designed around your individual needs, delivered with compassion and clinical excellence.", ar: "خدمات طبية فاخرة مصممة حسب احتياجاتك الفردية، تُقدم بالرحمة والتميز السريري." },
  learnMore: { en: "Learn More", ar: "اعرف المزيد" },
  // Departments
  ourSpecialties: { en: "Our Specialties", ar: "تخصصاتنا" },
  medicalDepartments: { en: "Medical Departments", ar: "الأقسام الطبية" },
  deptCount: { en: "25 specialized departments led by internationally renowned physicians.", ar: "25 قسماً متخصصاً يقودها أطباء مشهورون عالمياً." },
  viewAllDepts: { en: "VIEW ALL 25 DEPARTMENTS", ar: "عرض جميع الأقسام الـ 25" },
  showLess: { en: "SHOW LESS", ar: "عرض أقل" },
  // Booking flow
  aiAssistedBooking: { en: "AI-Assisted Booking", ar: "حجز بمساعدة الذكاء الاصطناعي" },
  bookYourAppointment: { en: "Book Your Appointment", ar: "احجز موعدك" },
  symptoms: { en: "Symptoms", ar: "الأعراض" },
  department: { en: "Department", ar: "القسم" },
  doctor: { en: "Doctor", ar: "الطبيب" },
  patientInfo: { en: "Patient Info", ar: "بيانات المريض" },
  confirm: { en: "Confirm", ar: "تأكيد" },
  instantAI: { en: "Instant AI Analysis", ar: "تحليل فوري بالذكاء الاصطناعي" },
  clinicallyValidated: { en: "Clinically Validated", ar: "معتمد سريرياً" },
  available247: { en: "24/7 Available", ar: "متاح على مدار الساعة" },
  describeInDetail: { en: "Describe your symptoms in detail...", ar: "صف أعراضك بالتفصيل..." },
  quickSelect: { en: "Quick select symptoms", ar: "اختيار سريع للأعراض" },
  symptomsSelected: { en: "symptom(s) selected", ar: "عرض(أعراض) مختارة" },
  dataEncrypted: { en: "Your data is encrypted and confidential", ar: "بياناتك مشفرة وسرية" },
  aiRecommendedDepts: { en: "AI Recommended Departments", ar: "أقسام موصى بها" },
  aiMatch: { en: "AI Match", ar: "توصية ذكية" },
  searchDepartments: { en: "Search departments...", ar: "ابحث في الأقسام..." },
  aiRecommendedDocs: { en: "AI Recommended Doctors", ar: "أطباء موصى بهم" },
  aiPick: { en: "AI Pick", ar: "اختيار ذكي" },
  available: { en: "Available", ar: "متاح" },
  currentlyUnavailable: { en: "Currently Unavailable", ar: "غير متاح حالياً" },
  clickToRequest: { en: "Click to request an appointment (6-12 hr response)", ar: "انقر لطلب موعد (الرد خلال 6-12 ساعة)" },
  registeredPatient: { en: "Registered Royale Hayat Patient", ar: "مريض مسجل في رويال حياة" },
  alreadyAccount: { en: "Already have an account? Log in to continue.", ar: "لديك حساب؟ سجل دخولك للمتابعة." },
  firstTimeVisitor: { en: "First-Time Visitor", ar: "زائر لأول مرة" },
  newToRoyale: { en: "New to Royale Hayat? Fill in your details.", ar: "جديد في رويال حياة؟ أدخل بياناتك." },
  patientDetails: { en: "Patient Details", ar: "بيانات المريض" },
  provideInfo: { en: "Please provide your information to complete the booking", ar: "يرجى تقديم معلوماتك لإتمام الحجز" },
  fullName: { en: "Full Name", ar: "الاسم الكامل" },
  enterFullName: { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
  phoneNumber: { en: "Phone Number", ar: "رقم الهاتف" },
  phonePlaceholder: { en: "Phone number", ar: "رقم الهاتف" },
  age: { en: "Age", ar: "العمر" },
  enterAge: { en: "Enter your age", ar: "أدخل عمرك" },
  gender: { en: "Gender", ar: "الجنس" },
  selectGender: { en: "Select gender", ar: "اختر الجنس" },
  male: { en: "Male", ar: "ذكر" },
  female: { en: "Female", ar: "أنثى" },
  patientLogin: { en: "Patient Login", ar: "تسجيل دخول المريض" },
  loginToAccount: { en: "Log in to your Royale Hayat account", ar: "سجل دخولك إلى حساب رويال حياة" },
  username: { en: "Username", ar: "اسم المستخدم" },
  enterUsername: { en: "Enter your username", ar: "أدخل اسم المستخدم" },
  password: { en: "Password", ar: "كلمة المرور" },
  enterPassword: { en: "Enter your password", ar: "أدخل كلمة المرور" },
  forgotPassword: { en: "Forgot Password?", ar: "نسيت كلمة المرور؟" },
  changeSelection: { en: "Change selection", ar: "تغيير الاختيار" },
  reviewConfirm: { en: "Review & Confirm", ar: "مراجعة وتأكيد" },
  reviewSubmit: { en: "Review & Submit Request", ar: "مراجعة وإرسال الطلب" },
  appointmentRequest: { en: "Appointment Request", ar: "طلب موعد" },
  requestNote: { en: "The selected doctor is currently not available. We will get back to you within 6-12 hours.", ar: "الطبيب المختار غير متاح حالياً. سنتواصل معك خلال 6-12 ساعة." },
  patient: { en: "Patient", ar: "المريض" },
  phone: { en: "Phone", ar: "الهاتف" },
  confirmBooking: { en: "Confirm Booking", ar: "تأكيد الحجز" },
  submitRequest: { en: "Submit Request", ar: "إرسال الطلب" },
  requestAppointment: { en: "Request Appointment", ar: "طلب موعد" },
  continue: { en: "Continue", ar: "متابعة" },
  previous: { en: "Previous", ar: "السابق" },
  backToHome: { en: "Back to Home", ar: "العودة للرئيسية" },
  // Confirmation
  requestSubmitted: { en: "Request Submitted!", ar: "تم إرسال الطلب!" },
  appointmentConfirmed: { en: "Appointment Confirmed!", ar: "تم تأكيد الموعد!" },
  requestConfirmMsg: { en: "We will contact you within 6-12 hours to confirm your appointment.", ar: "سنتواصل معك خلال 6-12 ساعة لتأكيد موعدك." },
  bookingConfirmMsg: { en: "Your appointment has been successfully booked. See details below.", ar: "تم حجز موعدك بنجاح. انظر التفاصيل أدناه." },
  appointmentDetails: { en: "Appointment Details", ar: "تفاصيل الموعد" },
  date: { en: "Date", ar: "التاريخ" },
  time: { en: "Time", ar: "الوقت" },
  status: { en: "Status", ar: "الحالة" },
  pendingStatus: { en: "Pending - We will contact you within 6-12 hours", ar: "قيد الانتظار - سنتواصل معك خلال 6-12 ساعة" },
  nextSteps: { en: "Next Steps", ar: "الخطوات التالية" },
  step1: { en: "Bring a valid ID and insurance card", ar: "أحضر هوية سارية وبطاقة تأمين" },
  step2: { en: "List of current medications", ar: "قائمة الأدوية الحالية" },
  step3: { en: "Previous medical reports or lab results", ar: "التقارير الطبية السابقة أو نتائج المختبر" },
  step4: { en: "Arrive 15 minutes before your scheduled time", ar: "الوصول قبل 15 دقيقة من الموعد" },
  step5: { en: "Wear comfortable clothing for examination", ar: "ارتداء ملابس مريحة للفحص" },
  aiHealthInsights: { en: "AI Health Insights", ar: "رؤى صحية ذكية" },
  // Chairman
  chairmanMessage: { en: "Chairman's Message", ar: "رسالة رئيس مجلس الإدارة" },
  // International
  internationalPatients: { en: "International Patients", ar: "المرضى الدوليون" },
  // Footer / misc
  contact: { en: "Contact", ar: "اتصل بنا" },
  luxuryServices: { en: "Luxury Services", ar: "الخدمات الفاخرة" },
  services: { en: "Services", ar: "الخدمات" },
  // Specialized care items
  womensHealth: { en: "Women's Health & Obstetrics", ar: "صحة المرأة والتوليد" },
  womensHealthDesc: { en: "Comprehensive maternity and women's healthcare with personalized birth plans and dedicated specialists.", ar: "رعاية شاملة للأمومة وصحة المرأة مع خطط ولادة شخصية ومتخصصين." },
  childrens: { en: "Children's Care & Neonatology", ar: "رعاية الأطفال وحديثي الولادة" },
  childrensDesc: { en: "Expert pediatric and neonatal care in a warm, family-centered environment with 24/7 NICU support.", ar: "رعاية متخصصة للأطفال وحديثي الولادة في بيئة عائلية دافئة مع دعم وحدة العناية المركزة على مدار الساعة." },
  cardiology: { en: "Cardiology & Heart Care", ar: "أمراض القلب والرعاية القلبية" },
  cardiologyDesc: { en: "Advanced cardiac diagnostics and interventional cardiology for comprehensive heart health programs.", ar: "تشخيص قلبي متقدم وقسطرة تداخلية لبرامج صحة القلب الشاملة." },
  orthopedics: { en: "Orthopedics & Sports Medicine", ar: "العظام والطب الرياضي" },
  orthopedicsDesc: { en: "Joint replacement, sports injury rehab, and minimally invasive musculoskeletal treatments.", ar: "استبدال المفاصل وإعادة تأهيل الإصابات الرياضية وعلاجات العضلات والعظام." },
  cosmetic: { en: "Cosmetic & Reconstructive Surgery", ar: "الجراحة التجميلية والترميمية" },
  cosmeticDesc: { en: "Board-certified surgeons offering aesthetic and reconstructive procedures in a luxurious setting.", ar: "جراحون معتمدون يقدمون إجراءات تجميلية وترميمية في بيئة فاخرة." },
  ivf: { en: "IVF & Reproductive Medicine", ar: "أطفال الأنابيب والطب التناسلي" },
  ivfDesc: { en: "World-class fertility treatments with cutting-edge technology and personalized care plans.", ar: "علاجات خصوبة عالمية المستوى بتقنيات متطورة وخطط رعاية شخصية." },
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  dir: "ltr",
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string) => {
    return translations[key]?.[lang] || translations[key]?.en || key;
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir} className={lang === "ar" ? "font-body" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
