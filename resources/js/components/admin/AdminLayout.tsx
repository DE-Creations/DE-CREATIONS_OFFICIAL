import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

interface AdminLayoutProps {
  title: string;
  children?: React.ReactNode;
}

export function AdminLayout({ title, children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar title={title} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
