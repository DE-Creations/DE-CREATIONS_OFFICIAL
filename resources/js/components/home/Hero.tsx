import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConsultationModal } from "@/contexts/ConsultationModalContext";

export function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <div className="container section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Your One-Stop{" "}
            <span className="text-primary">Digital Transformation</span> Partner
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            • Web Development • Software Development • Digital Marketing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="cta" size="lg" onClick={openModal}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#portfolio">View Our Work</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
