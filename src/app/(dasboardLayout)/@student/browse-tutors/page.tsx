import FilterSction from "@/components/ui/FilterSction";
import TutorsGrid from "@/components/ui/TutorsGrid";

export default function StudentBrowseTutors() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#173e72]">Browse Tutors</h1>
                <p className="text-muted-foreground">Find the perfect tutor for your learning goals.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <FilterSction />
                <TutorsGrid />
            </div>
        </div>
    );
}
