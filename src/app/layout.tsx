'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { MainNav } from '@/components/layout/main-nav';
import { useTheme } from '@/hooks/use-theme';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <head>
        <title>Med TechAI Academy</title>
        <meta name="description" content="Enhance your healthcare skills with personalized learning paths." />
      </head>
      <body className={cn("font-sans antialiased", inter.variable)}>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <MainNav />
            <SidebarInset>
                <main className="flex-1 bg-muted/30">{children}</main>
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
