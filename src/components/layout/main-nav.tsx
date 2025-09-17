
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard, HeartPulse, BrainCircuit, Zap, FileSearch, Library, GraduationCap, User, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { UserNav } from './user-nav';

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/courses', label: 'Courses', icon: BookOpen },
    { href: '/personalized-path', label: 'Learning Path', icon: GraduationCap },
  ];

  const aiTools = [
     { href: '/ai-in-medicine', label: 'AI in Medicine', icon: BrainCircuit },
    { href: '/explainer', label: 'AI Explainer', icon: Zap },
    { href: '/research', label: 'AI Research', icon: FileSearch },
    { href: '/content-assistant', label: 'Content Assistant', icon: Library },
  ]

  const userMenuItems = [
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2.5">
          <HeartPulse className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tighter text-foreground group-data-[collapsible=icon]:hidden">
            MediConnect
          </h1>
        </Link>
      </SidebarHeader>
      
      <SidebarMenu className="flex-1">
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
        <SidebarSeparator />
         {aiTools.map((item) => (
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

      <SidebarFooter>
        <SidebarSeparator />
         {userMenuItems.map((item) => (
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
        <div className="p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:w-min group-data-[collapsible=icon]:mx-auto">
            <UserNav />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
