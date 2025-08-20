"use client";

import { useSidebar } from "@/components/ui/sidebar";
import type * as React from "react";
import {
  UserPlus,
  Calendar,
  ChevronDown,
  PieChart,
  Star,
  Award,
  HeartHandshake,
  Church,
  UserCheck,
  Building2,
  School,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";

// Updated data structure to support unlimited nesting and icons
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Thống kê học viên",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Đảng viên",
          url: "/cpv",
          icon: UserCheck,
        },
        {
          title: "Đoàn viên",
          url: "/hcyu",
          icon: UserPlus,
        },
        {
          title: "Dân tộc thiểu số",
          url: "/ethnic-minority",
          icon: Star,
        },
        {
          title: "Tôn giáo",
          url: "/religion",
          icon: Church,
        },
      ],
    },
    {
      title: "Sự kiện học viên",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Sinh nhật đồng đội",
          url: "/birthday",
          icon: Award,
        },
        {
          title: "Chuyển Đảng chính thức ",
          url: "/chuyen-dang-chinh-thuc",
          icon: HeartHandshake,
        },
      ],
    },
  ],
};

// Type definition for navigation items
interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
  items?: NavItem[];
  search?: { [k: string]: string };
  icon?: React.ElementType;
}

// Recursive component to render nested menu items
function NavMenuItems({
  items,
  level = 0,
}: {
  items: NavItem[];
  level?: number;
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  if (level === 0) {
    // Top level items
    return (
      <SidebarMenu>
        {items.map((item) => (
          <NavMenuItem key={item.title} item={item} level={level} />
        ))}
      </SidebarMenu>
    );
  } else {
    // Nested items use SidebarMenuSub
    return (
      <SidebarMenuSub>
        {items.map((item) => (
          <NavMenuItem key={item.title} item={item} level={level} />
        ))}
      </SidebarMenuSub>
    );
  }
}

// Individual menu item component
function NavMenuItem({ item, level }: { item: NavItem; level: number }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const hasChildren = item.items && item.items.length > 0;
  const Icon = item.icon;

  if (level === 0) {
    // Top level menu item
    if (hasChildren) {
      return (
        <SidebarMenuItem>
          <Collapsible className="group/collapsible" defaultOpen={!isCollapsed}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="flex items-center gap-3 rounded-xl px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:bg-blue-100 cursor-pointer">
                {Icon && <Icon className="w-5 h-5" />}
                {!isCollapsed && <span>{item.title}</span>}
                {!isCollapsed && (
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent>
                <NavMenuItems items={item.items!} level={level + 1} />
              </CollapsibleContent>
            )}
          </Collapsible>
        </SidebarMenuItem>
      );
    } else {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={item.isActive}
            className="flex items-center gap-3 rounded-xl px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:bg-blue-100 cursor-pointer"
          >
            <Link href={item.url} className="flex items-center gap-3 w-full">
              {Icon && <Icon className="w-5 h-5" />}
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }
  }

  return (
    <SidebarMenuSubItem>
      {hasChildren ? (
        <Collapsible className="group/collapsible" defaultOpen>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton className="flex items-center gap-3 rounded-xl px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:bg-blue-100 cursor-pointer">
              {Icon && <Icon className="w-5 h-5  " />}
              {!isCollapsed && <span>{item.title}</span>}
              {!isCollapsed && (
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              )}
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          {!isCollapsed && (
            <CollapsibleContent>
              <NavMenuItems items={item.items!} level={level + 1} />
            </CollapsibleContent>
          )}
        </Collapsible>
      ) : (
        <SidebarMenuSubButton
          asChild
          isActive={item.isActive}
          className="flex items-center gap-3 rounded-xl px-4 py-2 font-medium text-gray-700 transition-colors  hover:bg-gray-200  focus:bg-blue-100 "
        >
          <Link href={item.url} className="flex items-center gap-3 w-full">
            {Icon && <Icon className="w-5 h-5  " />}
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        </SidebarMenuSubButton>
      )}
    </SidebarMenuSubItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { tenants, loading, error } = useTenants();
  if (loading) return <div>Loading tenants...</div>;
  if (error) return <div>Error: {error}</div>;

  const tenantsNavbar = tenants?.map(
    (tenant) =>
      ({
        title: tenant.name,
        url: `/tenant-slugs/${tenant.slug}`,
        icon: School,
      }) as NavItem,
  );

  const newData = {
    version: data.versions,
    navMain: [
      { title: "Các phòng ban", url: "#", items: tenantsNavbar },
      ...data.navMain,
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary-foreground">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="Logo Trường Cao đẳng hậu cần 2"
              className="h-6 w-6"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                Hệ thống quản lý học viên
              </span>
              <span className="text-xs text-muted-foreground">
                Trường Cao đẳng hậu cần 2
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {newData.navMain.map((item) => (
          <Collapsible
            key={item.title}
            className="group/collapsible"
            defaultOpen={!isCollapsed}
          >
            <SidebarGroup>
              {!isCollapsed && (
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                    {item.title}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
              )}
              {isCollapsed ? (
                <SidebarGroupContent>
                  <NavMenuItems items={item.items || []} />
                </SidebarGroupContent>
              ) : (
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <NavMenuItems items={item.items || []} />
                  </SidebarGroupContent>
                </CollapsibleContent>
              )}
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  // Add other tenant fields based on your schema
}

const useTenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tenants?limit=1000"); // Adjust limit as needed

      if (!response.ok) {
        throw new Error("Failed to fetch tenants");
      }

      const data = await response.json();
      setTenants(data.docs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return { tenants, loading, error, refetch: () => fetchTenants() };
};
