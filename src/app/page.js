import HeroStatsSection from "@/components/heroStats/HeroStats";
import Banner from "@/components/shared/Banner";
import TestimonialsSection from "@/components/testimonials/Testimonials";
import AvailableTutors from "@/components/tutor/AvailableTutors";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Find Expert Medical Tutors | MediQueue",
  description: "Connect with expert medical tutors for comprehensive USMLE, anatomy, and clinical preparation. Book sessions with verified professionals.",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <AvailableTutors />
      <HeroStatsSection />
      <TestimonialsSection />
    </div>
  );
}
