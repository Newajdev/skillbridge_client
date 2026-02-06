import HeroSection from "@/components/ui/HeroSection";
import StatesSections from "@/components/ui/StatesSections";
import Categories from "@/components/ui/Categories";
import FeaturedTutors from "@/components/ui/FeaturedTutors";
import HowItWorks from "@/components/ui/HowItWorks";


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      <HeroSection/>


      <StatesSections/>


      <Categories/>

      <FeaturedTutors/>

      <HowItWorks/>
    </div>
  );
}
