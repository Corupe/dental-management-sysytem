"use client";

import type { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  DollarSign,
  Settings,
  Upload,
  LogOut,
  SmileIcon as Tooth,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    title: "Dashboard",
    url: "/patient/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    url: "/patient/appointments",
    icon: Calendar,
  },
  {
    title: "Medical Records",
    url: "/patient/records",
    icon: FileText,
  },
  {
    title: "Billing",
    url: "/patient/billing",
    icon: DollarSign,
  },
  {
    title: "Documents",
    url: "/patient/documents",
    icon: Upload,
  },
  {
    title: "Profile",
    url: "/patient/profile",
    icon: Settings,
  },
];

interface PatientLayoutProps {
  children: ReactNode;
}

export function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Tooth className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold">DentalCare</h2>
              <p className="text-xs text-gray-500">Patient Portal</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Patient Portal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  fetch("/api/auth/logout", {
                    method: "POST",
                  });
                }}
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
