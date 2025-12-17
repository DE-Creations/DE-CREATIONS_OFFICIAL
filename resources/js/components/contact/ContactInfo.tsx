import { siteData } from "@/lib/siteData";
import { Mail, Phone, MapPin } from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: siteData.company.email,
    href: `mailto:${siteData.company.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteData.company.phone,
    href: `tel:${siteData.company.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteData.company.location,
    href: "#",
  },
];

export function ContactInfo() {
  return (
    <div className="bg-primary rounded-2xl p-8 md:p-10 text-primary-foreground h-full">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
      <p className="text-primary-foreground/80 mb-10 leading-relaxed">
        Ready to start your next project? Contact us today and let's discuss how we can help transform your digital
        presence.
      </p>

      <div className="space-y-6">
        {contactDetails.map((detail) => (
          <a key={detail.label} href={detail.href} className="flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-foreground/20 transition-colors">
              <detail.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-primary-foreground/60 mb-1">{detail.label}</div>
              <div className="font-medium group-hover:text-secondary transition-colors">{detail.value}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/20">
        <h3 className="font-display text-lg font-semibold mb-4">Business Hours</h3>
        <div className="space-y-2 text-sm text-primary-foreground/80">
          <p>Monday - Friday: 9:00 AM - 11:00 PM</p>
          <p>Saturday: 9:00 AM - 1:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}
