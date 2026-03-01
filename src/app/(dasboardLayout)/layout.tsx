import { AppSidebar } from "@/components/layout/app-sidebar";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { ProfileCompletePopup } from "@/components/modules/dashboard/ProfileCompletePopup";
export default async function DashboardLayout({
  admin,
  tutor,
  student,
}: {
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {

  const { data } = await userService.getSession();

  const userInfo = data?.user;

  if (!userInfo) {
    redirect("/login");
  }

  const { data: profileData } = await userService.getProfile();

  let isProfileComplete = true;
  let profileUrl = "/";

  if (userInfo.role.toUpperCase() === Roles.tutor) {
    profileUrl = "/tutor-dashboard/profile";
    const tp = profileData?.tutorProfile;
    // Check if tutor profile is complete (bio, phone, rate, and experience are mandatory)
    if (!tp || !tp.bio || !tp.phone || tp.hourlyRate === null || tp.experience === null) {
      isProfileComplete = false;
    }
  } else if (userInfo.role.toUpperCase() === Roles.student) {
    profileUrl = "/student-dashboard/profile";
    const sp = profileData?.studentProfile;
    // Check if student profile is complete (phone and bio are good to have)
    if (!sp || !sp.phone || !sp.bio) {
      isProfileComplete = false;
    }
  } else if (userInfo.role.toUpperCase() === Roles.admin) {
    profileUrl = "/admin-dashboard/settings";
  }


  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        {/* Mobile Header with Sidebar Trigger */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden bg-white sticky top-0 z-50">
          <SidebarTrigger className="-ml-1" />
          <div className="font-black text-xl tracking-tight text-[#173e72] ml-2">SkillBridge</div>
        </header>

        <div className="flex flex-1 flex-col gap-4">
          {userInfo.role.toUpperCase() === Roles.admin && admin}
          {userInfo.role.toUpperCase() === Roles.tutor && tutor}
          {userInfo.role.toUpperCase() === Roles.student && student}
          <ProfileCompletePopup isComplete={isProfileComplete} profileUrl={profileUrl} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
