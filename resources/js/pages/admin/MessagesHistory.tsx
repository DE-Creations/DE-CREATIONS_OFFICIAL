import { useState } from 'react';
import { format } from 'date-fns';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useMessages } from '@/hooks/useMessages';
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
import { MessageSquare, Search, ChevronDown, ChevronUp, Mail, Phone, Calendar, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MessagesHistory() {
  const { messages, isLoading } = useMessages(['completed', 'ignored']);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.service_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <AdminLayout title="Messages - History">
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
        ) : filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Message History</h3>
              <p className="text-muted-foreground text-center">
                {searchQuery
                  ? 'No messages match your search criteria.'
                  : 'Completed and ignored messages will appear here.'}
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
                    <TableHead>Submitted At</TableHead>
                    <TableHead>Processed At</TableHead>
                    <TableHead>Processed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => {
                    const isExpanded = expandedId === message.id;
                    const isIgnored = message.status === 'ignored';
                    return (
                      <>
                        <TableRow 
                          key={message.id} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => toggleExpand(message.id)}
                        >
                          <TableCell>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{message.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{message.service_type}</Badge>
                          </TableCell>
                          <TableCell>
                            {isIgnored ? (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                Ignored
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                Completed
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {format(new Date(message.submitted_at), 'PPP p')}
                          </TableCell>
                          <TableCell>
                            {message.completed_at
                              ? format(new Date(message.completed_at), 'PPP p')
                              : '-'}
                          </TableCell>
                          <TableCell>
                            {message.acted_by_profile
                              ? `${message.acted_by_profile.first_name} ${message.acted_by_profile.last_name}`
                              : '-'}
                          </TableCell>
                        </TableRow>
                        {isExpanded && (
                          <TableRow key={`${message.id}-details`}>
                            <TableCell colSpan={7} className="bg-muted/30 p-4">
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <a href={`mailto:${message.email}`} className="hover:underline text-foreground">
                                      {message.email}
                                    </a>
                                  </div>
                                  {message.phone && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Phone className="h-4 w-4" />
                                      <a href={`tel:${message.phone}`} className="hover:underline text-foreground">
                                        {message.phone}
                                      </a>
                                    </div>
                                  )}
                                </div>
                                {message.message && (
                                  <div className="bg-background rounded-lg p-3 border">
                                    <div className="flex items-start gap-2">
                                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                                      <p className="text-sm">{message.message}</p>
                                    </div>
                                  </div>
                                )}
                                {isIgnored && message.decline_reason && (
                                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                    <div className="flex items-start gap-2">
                                      <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                                      <div>
                                        <p className="text-sm font-medium text-orange-700">Ignore Reason:</p>
                                        <p className="text-sm text-orange-600">{message.decline_reason}</p>
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
