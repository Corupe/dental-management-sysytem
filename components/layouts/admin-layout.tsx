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
  Users,
  Settings,
  BarChart3,
  Package,
  LogOut,
  SmileIcon as Tooth,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Inventory",
    url: "/admin/inventory",
    icon: Package,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
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
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
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
