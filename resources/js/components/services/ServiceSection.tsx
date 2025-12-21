import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/contexts/ConsultationModalContext";

interface ServiceSectionProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  isReversed?: boolean;
}

export function ServiceSection({
  id,
  title,
  description,
  features,
  image,
  isReversed = false,
}: ServiceSectionProps) {
  const { openModal } = useConsultationModal();

  return (
    <section id={id} className="section-padding scroll-mt-20">
      <div className="container">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
            isReversed && "lg:flex-row-reverse"
          )}
        >
          <div className={cn(isReversed && "lg:order-2")}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {description}
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="cta" size="lg" onClick={openModal}>
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className={cn("lg:order-1", isReversed && "lg:order-1")}>
            <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
