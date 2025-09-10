import { UserNav } from './user-nav';

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>
  );
}
