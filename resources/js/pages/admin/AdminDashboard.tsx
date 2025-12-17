import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { useAppointmentStats } from '@/hooks/useAppointments';
import { FileText, Clock, CalendarCheck, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboard() {
  const { stats, isLoading } = useAppointmentStats();

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[120px] rounded-lg" />
              ))}
            </>
          ) : (
            <>
              <StatCard
                title="Total Client Requests"
                value={stats.total}
                icon={FileText}
                iconBgColor="bg-blue-100"
                iconColor="text-blue-600"
              />
              <StatCard
                title="Pending to Accept"
                value={stats.pending}
                icon={Clock}
                iconBgColor="bg-orange-100"
                iconColor="text-orange-600"
              />
              <StatCard
                title="Scheduled for Future"
                value={stats.scheduled}
                icon={CalendarCheck}
                iconBgColor="bg-purple-100"
                iconColor="text-purple-600"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                icon={CheckCircle}
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
              />
            </>
          )}
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Overview</h2>
          <p className="text-muted-foreground">
            Welcome to the DE Creations admin panel. Use the sidebar to navigate between
            appointments, manage ongoing tasks, view history, and manage users.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
