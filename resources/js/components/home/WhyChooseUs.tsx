import { siteData } from "@/lib/siteData";
import { CheckCircle } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground">
              What sets us apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteData.whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="flex gap-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
