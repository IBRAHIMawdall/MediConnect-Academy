'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard, HeartPulse } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/courses', label: 'Courses', icon: BookOpen },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2.5">
          <HeartPulse className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tighter text-foreground group-data-[collapsible=icon]:hidden">
            MediConnect
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  );
}
