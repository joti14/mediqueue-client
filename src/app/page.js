import HeroStatsSection from "@/components/heroStats/HeroStats";
import Banner from "@/components/shared/Banner";
import TestimonialsSection from "@/components/testimonials/Testimonials";
import AvailableTutors from "@/components/tutor/AvailableTutors";
import Image from "next/image";

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
