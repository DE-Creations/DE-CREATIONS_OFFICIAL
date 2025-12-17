import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConsultationModal } from "@/contexts/ConsultationModalContext";

export function CTABand() {
  const { openModal } = useConsultationModal();

  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Let's discuss how we can help you achieve your digital goals.
            Get a free consultation today.
          </p>
          <Button
            variant="secondary"
            size="xl"
            className="shadow-lg"
            onClick={openModal}
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
