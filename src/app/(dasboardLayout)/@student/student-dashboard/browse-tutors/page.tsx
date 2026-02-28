import { publicService } from "@/services/public.service";
import { categoryService } from "@/services/categories.service";
import StudentBrowseClient from "./StudentBrowseClient";
import { TopDesign } from "@/components/ui/topDesign";
import { Search } from "lucide-react";

export default async function StudentBrowseTutors() {
    const [tutorsRes, categoriesRes] = await Promise.all([
        publicService.getTutors(),
        categoryService.getAllCategories(),
    ]);

    const tutorsData = tutorsRes.data?.data;
    const tutors = tutorsData?.data || [];
    const meta = tutorsData?.meta;
    const categories = categoriesRes.data?.data || [];

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <TopDesign />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20 space-y-8 animate-in fade-in duration-700">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                        <Search className="h-8 w-8" />
                    </div>
                    <div className="text-white">
                        <h1 className="text-3xl font-black text-white tracking-tight">Browse Tutors</h1>
                        <p className="text-white/60 font-medium">Find the perfect expert for your learning path.</p>
                    </div>
                </div>

                <StudentBrowseClient
                    initialTutors={tutors}
                    categories={categories}
                    initialMeta={meta}
                />
            </div>
        </div>
    );
}
