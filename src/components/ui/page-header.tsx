import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-xl text-muted-foreground">{description}</p>
    </div>
  );
}