import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Clock, 
  History, 
  Users,
  MessageSquare,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { cn } from '@/lib/utils';

interface AdminMobileNavProps {
  onClose: () => void;
}

const navItems = [
  { 
    label: 'Dashboard', 
    path: '/admin', 
    icon: LayoutDashboard,
    exact: true 
  },
];

const appointmentItems = [
  { label: 'Pending', path: '/admin/appointments/pending', icon: CalendarClock },
  { label: 'Ongoing', path: '/admin/appointments/ongoing', icon: Clock },
  { label: 'History', path: '/admin/appointments/history', icon: History },
];

const messageItems = [
  { label: 'Inbox', path: '/admin/messages/pending', icon: MessageSquare },
  { label: 'History', path: '/admin/messages/history', icon: History },
];

export function AdminMobileNav({ onClose }: AdminMobileNavProps) {
  const location = useLocation();
  const { isSuperAdmin } = useAdminAuth();
  const [appointmentsOpen, setAppointmentsOpen] = useState(
    location.pathname.includes('/admin/appointments')
  );
  const [messagesOpen, setMessagesOpen] = useState(
    location.pathname.includes('/admin/messages')
  );

  const isAppointmentActive = location.pathname.includes('/admin/appointments');
  const isMessageActive = location.pathname.includes('/admin/messages');

  return (
    <div className="flex flex-col h-full bg-sidebar">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">DE Creations</h1>
        <p className="text-sm text-sidebar-foreground/60">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}

        {/* Appointments Section */}
        <div>
          <button
            onClick={() => setAppointmentsOpen(!appointmentsOpen)}
            className={cn(
              'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
              isAppointmentActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            )}
          >
            <div className="flex items-center gap-3">
              <CalendarClock className="h-5 w-5" />
              Appointments
            </div>
            {appointmentsOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {appointmentsOpen && (
            <div className="ml-4 mt-1 space-y-1">
              {appointmentItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Messages Section */}
        <div>
          <button
            onClick={() => setMessagesOpen(!messagesOpen)}
            className={cn(
              'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
              isMessageActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            )}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5" />
              Messages
            </div>
            {messagesOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {messagesOpen && (
            <div className="ml-4 mt-1 space-y-1">
              {messageItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Users - Super Admin Only */}
        {isSuperAdmin && (
          <NavLink
            to="/admin/users"
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )
            }
          >
            <Users className="h-5 w-5" />
            Users
          </NavLink>
        )}
      </nav>
    </div>
  );
}
