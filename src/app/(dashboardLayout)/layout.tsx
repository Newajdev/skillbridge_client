import { AppSidebar } from "@/components/layout/app-sidebar";
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

export default function DashboardLayout({
  admin,
  tutor,
  student,
}: {
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {
  // Mocking user info for now. In a real app, this would come from an auth hook/provider.
  const userInfo = {
    role: "ADMIN", // Change this to "TUTOR" or "STUDENT" to test
    name: "Admin User",
    email: "admin@skillbridge.com",
  };

  const renderDashboard = () => {
    switch (userInfo.role.toUpperCase()) {
      case "ADMIN":
        return admin;
      case "TUTOR":
        return tutor;
      case "STUDENT":
        return student;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{renderDashboard()}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
