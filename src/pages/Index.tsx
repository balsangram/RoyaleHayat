import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsRow from "@/components/StatsRow";
import IntelligentBooking from "@/components/IntelligentBooking";
import SpecializedCare from "@/components/SpecializedCare";
import DepartmentsSection from "@/components/DepartmentsSection";
import DoctorsSection from "@/components/DoctorsSection";
import WhyRoyaleHayat from "@/components/WhyRoyaleHayat";
import AwardsSection from "@/components/AwardsSection";
import InsurancePartners from "@/components/InsurancePartners";
import TestimonialsSection from "@/components/TestimonialsSection";

import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsRow />
      <IntelligentBooking />
      <SpecializedCare />
      <DepartmentsSection />
      <DoctorsSection />
      <WhyRoyaleHayat />
      <AwardsSection />
      <InsurancePartners />
      <TestimonialsSection />
      
      <Footer />
      <ChatButton />
      <ScrollToTop />
    </div>
  );
};

export default Index;
