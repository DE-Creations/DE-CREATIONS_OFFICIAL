import { useState } from 'react';
import { format } from 'date-fns';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAppointments } from '@/hooks/useAppointments';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { History, Search, ChevronDown, ChevronUp, Mail, Phone, Calendar, MessageSquare, AlertCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AppointmentsHistory() {
  const { appointments, isLoading } = useAppointments(['completed', 'declined']);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAppointments = appointments.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.service_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <AdminLayout title="Appointment History">
      <div className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <Skeleton className="h-[400px] rounded-lg" />
        ) : filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <History className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Appointment History</h3>
              <p className="text-muted-foreground text-center">
                {searchQuery
                  ? 'No appointments match your search criteria.'
                  : 'Completed and declined appointments will appear here.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled At</TableHead>
                    <TableHead>Processed At</TableHead>
                    <TableHead>Processed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => {
                    const isExpanded = expandedId === appointment.id;
                    const isDeclined = appointment.status === 'declined';
                    return (
                      <>
                        <TableRow 
                          key={appointment.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => toggleExpand(appointment.id)}
                        >
                          <TableCell>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{appointment.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{appointment.service_type}</Badge>
                          </TableCell>
                          <TableCell>
                            {isDeclined ? (
                              <Badge variant="secondary" className="bg-red-100 text-red-700">
                                Declined
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                Completed
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {appointment.scheduled_at
                              ? format(new Date(appointment.scheduled_at), 'PPP p')
                              : '-'}
                          </TableCell>
                          <TableCell>
                            {appointment.completed_at
                              ? format(new Date(appointment.completed_at), 'PPP p')
                              : '-'}
                          </TableCell>
                          <TableCell>
                            {appointment.acted_by_profile
                              ? `${appointment.acted_by_profile.first_name} ${appointment.acted_by_profile.last_name}`
                              : '-'}
                          </TableCell>
                        </TableRow>
                        {isExpanded && (
                          <TableRow key={`${appointment.id}-details`}>
                            <TableCell colSpan={7} className="bg-muted/30 p-4">
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <a href={`mailto:${appointment.email}`} className="hover:underline text-foreground">
                                      {appointment.email}
                                    </a>
                                  </div>
                                  {appointment.phone && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Phone className="h-4 w-4" />
                                      <a href={`tel:${appointment.phone}`} className="hover:underline text-foreground">
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
                                  <div className="bg-background rounded-lg p-3 border">
                                    <div className="flex items-start gap-2">
                                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                                      <p className="text-sm">{appointment.message}</p>
                                    </div>
                                  </div>
                                )}
                                {isDeclined && appointment.decline_reason && (
                                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                    <div className="flex items-start gap-2">
                                      <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                                      <div>
                                        <p className="text-sm font-medium text-red-700">Decline Reason:</p>
                                        <p className="text-sm text-red-600">{appointment.decline_reason}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {!isDeclined && appointment.notes && (
                                  <div className="bg-background rounded-lg p-3 border">
                                    <div className="flex items-start gap-2">
                                      <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                      <div>
                                        <p className="text-sm font-medium">Completion Note:</p>
                                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
