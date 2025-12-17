import { useState } from 'react';
import { format } from 'date-fns';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useMessages, Message } from '@/hooks/useMessages';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { IgnoreModal } from '@/components/admin/messages/IgnoreModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, X, Mail, Phone, Calendar, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MessagesPending() {
  const { messages, isLoading, markAsDone, ignoreMessage } = useMessages(['pending']);
  const { user } = useAdminAuth();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showIgnoreModal, setShowIgnoreModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleMarkAsDone = async (id: string) => {
    if (!user) return;
    setActionLoading(id);
    await markAsDone(id, user.id);
    setActionLoading(null);
  };

  const handleIgnore = async (reason: string) => {
    if (!selectedMessage || !user) return;
    setActionLoading(selectedMessage.id);
    await ignoreMessage(selectedMessage.id, reason, user.id);
    setActionLoading(null);
    setShowIgnoreModal(false);
    setSelectedMessage(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <AdminLayout title="Messages - Inbox">
      <div className="space-y-4">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] rounded-lg" />
            ))}
          </>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Pending Messages</h3>
              <p className="text-muted-foreground text-center">
                All messages have been processed.
              </p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => {
            const isExpanded = expandedId === message.id;
            return (
              <Card key={message.id}>
                <CardHeader 
                  className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleExpand(message.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <CardTitle className="text-lg">{message.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {message.service_type}
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
                      <a href={`mailto:${message.email}`} className="hover:underline">
                        {message.email}
                      </a>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${message.phone}`} className="hover:underline">
                          {message.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Submitted: {format(new Date(message.submitted_at), 'PPP p')}
                    </div>
                  </div>

                  {message.message && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-muted-foreground">{message.message}</p>
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
                        setSelectedMessage(message);
                        setShowIgnoreModal(true);
                      }}
                      disabled={actionLoading === message.id}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Ignore
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsDone(message.id);
                      }}
                      disabled={actionLoading === message.id}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      {actionLoading === message.id ? 'Processing...' : 'Mark as Done'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <IgnoreModal
        open={showIgnoreModal}
        onOpenChange={setShowIgnoreModal}
        onConfirm={handleIgnore}
        isLoading={actionLoading !== null}
      />
    </AdminLayout>
  );
}
