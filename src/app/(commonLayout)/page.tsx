import HeroSection from "@/components/modules/homepage/HeroSection";
import StatesSections from "@/components/modules/homepage/StatesSections";
import Categories from "@/components/modules/homepage/Categories";
import FeaturedTutors from "@/components/modules/homepage/FeaturedTutors";
import HowItWorks from "@/components/modules/homepage/HowItWorks";
import { tutorService } from "@/services/tutor.service";
import { categoryService } from "@/services/categories.service";

export default async function HomePage() {
  const [tutorsRes, categoriesRes] = await Promise.all([
    tutorService.getTutors(),
    categoryService.getAllCategories(),
  ]);

  const tutors = tutorsRes.data?.data;
  const categories = categoriesRes.data?.data;

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatesSections />
      <Categories categories={categories} />
      <FeaturedTutors tutors={tutors} />
      <HowItWorks />
    </div>
  );
}
