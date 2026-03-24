import { MessageCircle, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const knowledgeBase: { keywords: string[]; response: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "assalam"],
    response: "Hello! Welcome to Royale Hayat Hospital. I'm your AI Health Assistant. How can I help you today?\n\nI can assist with:\n• **Booking appointments**\n• **Department information**\n• **Doctor recommendations**\n• **Hospital services & facilities**\n• **Insurance queries**\n• **Emergency guidance**",
  },
  {
    keywords: ["appointment", "book", "booking", "schedule", "reserve"],
    response: "I'd be happy to help you book an appointment! You can:\n\n1. **Online Booking** — Use our [Book Appointment](/book-appointment) page for instant scheduling\n2. **Phone Booking** — Call our 24/7 hotline: **+965 2536 0000**\n3. **Walk-in** — Visit our reception for same-day availability\n\nWould you like to know which department or doctor you need?",
  },
  {
    keywords: ["department", "departments", "specialt", "services", "what do you offer"],
    response: "Royale Hayat Hospital has **21 specialized departments** including:\n\n🏥 **Core Departments:**\n• Obstetrics & Gynecology\n• Pediatrics & Neonatology\n• Internal Medicine\n• General Surgery\n• Cardiology\n• Orthopedics\n\n🦷 **Specialty Clinics:**\n• Dental Clinic\n• Dermatology\n• ENT (Ear, Nose & Throat)\n• Ophthalmology\n• Urology\n• Neurology\n\nWould you like details about a specific department?",
  },
  {
    keywords: ["doctor", "doctors", "physician", "specialist", "dr"],
    response: "We have over **200+ specialist doctors** across all departments. Our medical team includes internationally trained physicians with expertise in:\n\n👨‍⚕️ **Top Specialties:**\n• Obstetrics & Gynecology\n• Pediatric Surgery\n• Cardiology\n• Orthopedic Surgery\n• Dermatology\n• Internal Medicine\n\nYou can browse our doctors on the homepage or tell me your symptoms and I'll recommend the right specialist.",
  },
  {
    keywords: ["emergency", "urgent", "ambulance", "accident", "critical"],
    response: "🚨 **Emergency Services — Available 24/7**\n\n📞 **Emergency Hotline:** +965 2536 0000\n🚑 **Ambulance:** +965 2536 0001\n\nOur emergency department is fully equipped with:\n• Trauma care\n• Critical care unit\n• Pediatric emergency\n• Cardiac emergency response\n\n⚠️ If this is a life-threatening emergency, please call the ambulance immediately.",
  },
  {
    keywords: ["insurance", "coverage", "covered", "insurance partner", "pay"],
    response: "Royale Hayat Hospital works with **major insurance providers** in Kuwait:\n\n✅ **Accepted Insurance:**\n• Gulf Insurance Group\n• Al Ahlia Insurance\n• Warba Insurance\n• Kuwait Insurance Company\n• BUPA Arabia\n• And many more\n\nPlease bring your insurance card during your visit. Our billing team can verify your coverage before treatment.\n\nFor questions: **info@royalehayat.com**",
  },
  {
    keywords: ["location", "address", "where", "directions", "map", "find you"],
    response: "📍 **Royale Hayat Hospital**\nP.O. Box 179, Hawalli 32002\nHawalli, Kuwait\n\n📞 **Phone:** +965 2536 0000\n📧 **Email:** info@royalehayat.com\n\n🕐 **Operating Hours:**\n• Outpatient: 8:00 AM – 10:00 PM\n• Emergency: 24/7\n• Pharmacy: 24/7",
  },
  {
    keywords: ["maternity", "pregnancy", "pregnant", "baby", "birth", "obstetric", "gynecol", "neonatal"],
    response: "👶 **Maternity & Neonatal Services**\n\nRoyale Hayat is renowned for its premium maternity care:\n\n• **Prenatal Care** — Regular checkups & ultrasound monitoring\n• **Luxury Birthing Suites** — VIP private rooms\n• **NICU** — Level III Neonatal Intensive Care Unit\n• **Postnatal Care** — Mother & baby wellness programs\n• **Lactation Support** — Expert breastfeeding guidance\n\nOur maternity packages include everything from delivery to recovery in a 5-star setting.",
  },
  {
    keywords: ["vip", "luxury", "suite", "room", "private", "amenities", "facility"],
    response: "🌟 **VIP & Luxury Services**\n\nEvery patient at Royale Hayat receives premium care:\n\n• **VIP Suites** — Hotel-like private rooms with family accommodation\n• **Personal Concierge** — Dedicated patient coordinator\n• **Gourmet Dining** — Chef-prepared meals\n• **Private Nursing** — One-on-one care\n• **Spa & Wellness** — Post-treatment relaxation\n\nOur patient satisfaction rate is **86%** — because luxury and care go hand in hand.",
  },
  {
    keywords: ["award", "accreditation", "certif", "quality", "standard"],
    response: "🏆 **Awards & Accreditations**\n\nRoyale Hayat maintains the highest global standards:\n\n• **Diamond Award** — Healthcare excellence\n• **CAP Accredited** — Laboratory standards\n• **PCC Award** — Patient-centered care\n• **Service Hero** — Customer service excellence\n• **JCI Accredited** — International quality standards\n\nSince 2006, we've been committed to world-class medical care in Kuwait.",
  },
  {
    keywords: ["symptom", "pain", "sick", "fever", "cough", "headache", "stomach", "feeling"],
    response: "I understand you're not feeling well. While I can help guide you, please remember I'm not a substitute for professional medical advice.\n\n🩺 **Here's what I recommend:**\n1. Use our **Symptom Analyzer** — [Start Here](/book-appointment) to get AI-powered department suggestions\n2. For urgent symptoms, visit our **24/7 Emergency**\n3. Call **+965 2536 0000** to speak with a nurse\n\nCan you tell me more about your symptoms so I can suggest the right department?",
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "see you"],
    response: "You're welcome! 😊 Thank you for choosing Royale Hayat Hospital.\n\nIf you need anything else, I'm always here to help. Wishing you good health!\n\n📞 **24/7 Hotline:** +965 2536 0000\n🌐 **Website:** royalehayat.com",
  },
  {
    keywords: ["cost", "price", "fee", "charges", "how much", "expensive"],
    response: "💰 **Pricing & Packages**\n\nCosts vary by department and treatment. Here's a general guide:\n\n• **Consultation:** Starting from 15–25 KD\n• **Maternity Packages:** Customized — contact us\n• **Surgical Procedures:** Based on complexity\n• **Health Checkups:** Comprehensive packages available\n\nFor detailed pricing:\n📞 Call: +965 2536 0000\n📧 Email: info@royalehayat.com\n\nWe accept most major insurance providers in Kuwait.",
  },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const item of knowledgeBase) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.response;
    }
  }
  return "Thank you for your question! I can help with:\n\n• **Appointments** — Booking & scheduling\n• **Departments** — Finding the right specialty\n• **Doctors** — Specialist recommendations\n• **Emergency** — 24/7 urgent care\n• **Insurance** — Coverage information\n• **Facilities** — VIP suites & amenities\n\nPlease ask about any of these topics, or call **+965 2536 0000** for immediate assistance.";
}

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! 👋 I'm your **Royale Hayat AI Health Assistant**.\n\nHow can I help you today? You can ask about appointments, departments, doctors, insurance, or describe your symptoms.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      let processed = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent underline hover:text-accent/80">$1</a>');

      if (line.startsWith("•")) {
        processed = processed.replace("•", "");
        return <li key={i} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: processed }} />;
      }
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[560px] bg-background rounded-2xl shadow-2xl border border-border/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-primary-foreground font-serif text-sm font-semibold">Royale Hayat Assistant</p>
                <p className="text-primary-foreground/60 text-xs font-body">AI Health Concierge</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-h-[380px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-body leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary/30 text-foreground rounded-bl-md"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-secondary/30 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {["Book Appointment", "Departments", "Emergency", "Insurance"].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => {
                        const userMsg: Message = { role: "user", content: q };
                        setMessages((prev) => [...prev, userMsg]);
                        setInput("");
                        setIsTyping(true);
                        setTimeout(() => {
                          setMessages((prev) => [...prev, { role: "assistant", content: getResponse(q) }]);
                          setIsTyping(false);
                        }, 800);
                      }, 50);
                    }}
                    className="text-xs font-body px-3 py-1.5 rounded-full border border-border hover:bg-secondary/30 hover:border-accent text-muted-foreground hover:text-foreground transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about appointments, symptoms..."
                  className="flex-1 bg-secondary/20 rounded-xl px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors duration-300"
        aria-label="Chat with us"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ChatButton;
