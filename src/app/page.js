import Banner from "@/components/shared/Banner";
import AvailableTutors from "@/components/tutor/AvailableTutors";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <AvailableTutors />
    </div>
  );
}
