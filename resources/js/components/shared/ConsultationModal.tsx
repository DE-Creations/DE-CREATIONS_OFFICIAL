import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { serviceOptions } from "@/lib/siteData";
import { countryCodes } from "@/lib/countryCodes";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const consultationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address").max(255),
  countryCode: z.string().min(1, "Please select a country code"),
  phone: z.string().min(6, "Please enter a valid phone number").max(20),
  service: z.string().min(1, "Please select a service"),
  appointmentDate: z.date({ required_error: "Please select a date" }),
  appointmentTime: z.string().min(1, "Please select a time"),
  message: z.string().max(1000).optional(),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

interface ConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

export function ConsultationModal({ open, onOpenChange }: ConsultationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+94",
      phone: "",
      service: "",
      message: "",
      appointmentTime: "",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        country_code: data.countryCode,
        phone: data.phone,
        requested_service: data.service,
        appointment_date: format(data.appointmentDate, "yyyy-MM-dd"),
        appointment_time: data.appointmentTime,
        message: data.message || null,
        form_type: "consultation",
      });

      if (error) throw error;

      toast({
        title: "Consultation Request Sent!",
        description: `We'll confirm your appointment for ${format(data.appointmentDate, "PPP")} at ${data.appointmentTime}.`,
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Failed to submit request",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = () => {
    toast({
      title: "Please check your form",
      description: "Some required fields are missing or invalid.",
      variant: "destructive",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Book a Free Consultation</DialogTitle>
          <DialogDescription>
            Fill in your details and select a convenient time for your consultation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4 mt-4">
            <div className={`transition-opacity duration-300 ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="John" {...field} disabled={isSubmitting} />
                            {isSubmitting && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-md" />}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Doe" {...field} disabled={isSubmitting} />
                            {isSubmitting && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-md" />}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="email" placeholder="john@example.com" {...field} disabled={isSubmitting} />
                          {isSubmitting && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-md" />}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code *</FormLabel>
                        <div className="relative">
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <FormControl>
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Code" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover max-h-[200px]">
                              {countryCodes.map((country) => (
                                <SelectItem key={country.code} value={country.dial}>
                                  {country.dial} {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {isSubmitting && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-md" />}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="tel" placeholder="77 123 4567" {...field} disabled={isSubmitting} />
                            {isSubmitting && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-md" />}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Service *</FormLabel>
                      <div className="relative">
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-popover">
                            {serviceOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isSubmitting && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-md" />}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="appointmentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col h-full">
                        <FormLabel>Appointment Date *</FormLabel>
                        <div className="relative">
                          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                            <PopoverTrigger asChild disabled={isSubmitting}>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                  disabled={isSubmitting}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setDatePickerOpen(false);
                                }}
                                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          {isSubmitting && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-md" />}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="appointmentTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col h-full">
                        <FormLabel>Appointment Time *</FormLabel>
                        <div className="flex-1 flex items-end relative">
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <FormControl>
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Select time">
                                  {field.value && (
                                    <span className="flex items-center gap-2">
                                      <Clock className="h-4 w-4" />
                                      {field.value}
                                    </span>
                                  )}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover max-h-[200px]">
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {isSubmitting && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-md" />}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Tell us about your project or any specific requirements..."
                            className="min-h-[80px] resize-none"
                            {...field}
                            disabled={isSubmitting}
                          />
                          {isSubmitting && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-md" />}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Book Consultation
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
