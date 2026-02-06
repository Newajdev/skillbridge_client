import FilterSction from "@/components/ui/FilterSction";
import TutorsGrid from "@/components/ui/TutorsGrid";


export default function TutorsPage() {


  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-24">     

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSction/>     
          <TutorsGrid/>
        </div>
      </div>
    </div>
  );
}
