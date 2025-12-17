import { useState } from 'react';
import { format } from 'date-fns';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAppointments, Appointment } from '@/hooks/useAppointments';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { DeclineModal } from '@/components/admin/appointments/DeclineModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, X, Mail, Phone, Calendar, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AppointmentsPending() {
  const { appointments, isLoading, acceptAppointment, declineAppointment } = useAppointments(['pending']);
  const { user } = useAdminAuth();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAccept = async (appointment: Appointment) => {
    if (!user) return;
    setActionLoading(appointment.id);
    await acceptAppointment(appointment.id, user.id);
    setActionLoading(null);
  };

  const handleDecline = async (reason: string) => {
    if (!selectedAppointment || !user) return;
    setActionLoading(selectedAppointment.id);
    await declineAppointment(selectedAppointment.id, reason, user.id);
    setActionLoading(null);
    setShowDeclineModal(false);
    setSelectedAppointment(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <AdminLayout title="Pending Appointments">
      <div className="space-y-4">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] rounded-lg" />
            ))}
          </>
        ) : appointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Pending Appointments</h3>
              <p className="text-muted-foreground text-center">
                All appointment requests have been processed.
              </p>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment) => {
            const isExpanded = expandedId === appointment.id;
            return (
              <Card key={appointment.id}>
                <CardHeader 
                  className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleExpand(appointment.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <CardTitle className="text-lg">{appointment.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {appointment.service_type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Pending</Badge>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className={cn("space-y-4", !isExpanded && "hidden")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${appointment.email}`} className="hover:underline">
                        {appointment.email}
                      </a>
                    </div>
                    {appointment.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${appointment.phone}`} className="hover:underline">
                          {appointment.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Submitted: {format(new Date(appointment.submitted_at), 'PPP p')}
                    </div>
                  </div>

                  {appointment.message && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-muted-foreground">{appointment.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAppointment(appointment);
                        setShowDeclineModal(true);
                      }}
                      disabled={actionLoading === appointment.id}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(appointment);
                      }}
                      disabled={actionLoading === appointment.id}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      {actionLoading === appointment.id ? 'Processing...' : 'Accept'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <DeclineModal
        open={showDeclineModal}
        onOpenChange={setShowDeclineModal}
        onConfirm={handleDecline}
        isLoading={actionLoading !== null}
      />
    </AdminLayout>
  );
}
