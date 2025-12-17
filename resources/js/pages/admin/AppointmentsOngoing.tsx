import { useState } from 'react';
import { format } from 'date-fns';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAppointments, Appointment } from '@/hooks/useAppointments';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { CompleteModal } from '@/components/admin/appointments/CompleteModal';
import { RescheduleModal } from '@/components/admin/appointments/RescheduleModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Calendar, Clock, Mail, Phone, MessageSquare } from 'lucide-react';

export default function AppointmentsOngoing() {
  const { appointments, isLoading, completeAppointment, rescheduleAppointment } = useAppointments(['accepted', 'ongoing']);
  const { user } = useAdminAuth();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleComplete = async (note: string) => {
    if (!selectedAppointment || !user) return;
    setActionLoading(true);
    await completeAppointment(selectedAppointment.id, note, user.id);
    setActionLoading(false);
    setShowCompleteModal(false);
    setSelectedAppointment(null);
  };

  const handleReschedule = async (scheduledAt: Date) => {
    if (!selectedAppointment || !user) return;
    setActionLoading(true);
    await rescheduleAppointment(selectedAppointment.id, scheduledAt, user.id);
    setActionLoading(false);
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
  };

  return (
    <AdminLayout title="Ongoing Appointments">
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
              <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Ongoing Appointments</h3>
              <p className="text-muted-foreground text-center">
                There are no scheduled or ongoing appointments at the moment.
              </p>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{appointment.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {appointment.service_type}
                    </Badge>
                  </div>
                  <Badge 
                    variant={appointment.status === 'ongoing' ? 'default' : 'secondary'}
                  >
                    {appointment.status === 'ongoing' ? 'Ongoing' : 'Scheduled'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {appointment.email}
                  </div>
                  {appointment.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {appointment.phone}
                    </div>
                  )}
                </div>

                {appointment.scheduled_at && (
                  <div className="bg-primary/5 rounded-lg p-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">
                      Scheduled: {format(new Date(appointment.scheduled_at), 'PPP')} at{' '}
                      {format(new Date(appointment.scheduled_at), 'p')}
                    </span>
                  </div>
                )}

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
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowRescheduleModal(true);
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Reschedule
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowCompleteModal(true);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <CompleteModal
        open={showCompleteModal}
        onOpenChange={setShowCompleteModal}
        onConfirm={handleComplete}
        isLoading={actionLoading}
      />

      <RescheduleModal
        open={showRescheduleModal}
        onOpenChange={setShowRescheduleModal}
        onConfirm={handleReschedule}
        currentDate={selectedAppointment?.scheduled_at ? new Date(selectedAppointment.scheduled_at) : null}
        isLoading={actionLoading}
      />
    </AdminLayout>
  );
}
