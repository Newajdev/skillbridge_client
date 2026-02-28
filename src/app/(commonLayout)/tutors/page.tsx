import { publicService } from "@/services/public.service";
import { categoryService } from "@/services/categories.service";
import TutorsModule from "@/components/modules/tutors";

export default async function TutorsPage() {
  const [tutorsRes, categoriesRes] = await Promise.all([
    publicService.getTutors(),
    categoryService.getAllCategories(),
  ]);

  const tutorsData = tutorsRes.data?.data;
  const tutors = tutorsData?.data || [];
  const meta = tutorsData?.meta;
  const categories = categoriesRes.data?.data || [];

  return (
    <TutorsModule
      initialTutors={tutors}
      categories={categories}
      initialMeta={meta}
    />
  );
}
