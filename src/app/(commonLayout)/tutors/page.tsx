import { publicService } from "@/services/public.service";
import { categoryService } from "@/services/categories.service";
import TutorsModule from "@/components/modules/tutors";

export default async function TutorsPage() {
const [tutorsRes, categoriesRes] = await Promise.all([
  publicService.getTutors(),
  categoryService.getAllCategories(),
]);

const tutorsData = tutorsRes.data?.data;

return (
  <TutorsModule
    initialTutors={tutorsData?.data ?? []}
    categories={categoriesRes?.data ?? []}
    initialMeta={tutorsData?.meta ?? { total: 0, totalPage: 1 }}
  />
);
}
