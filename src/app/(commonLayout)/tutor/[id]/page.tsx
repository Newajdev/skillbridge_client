import { publicService } from "@/services/public.service";
import TutorDetails from "@/components/modules/tutor/TutorDetails";
import { notFound } from "next/navigation";

export default async function TutorPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const res = await publicService.getTutorById(id);


    if (!res.data?.data) {
        return notFound();
    }

    const tutor = res.data?.data;

    return <TutorDetails tutor={tutor} />;
}
