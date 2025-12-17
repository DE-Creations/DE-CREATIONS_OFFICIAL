import { Link } from "react-router-dom";
import { siteData } from "@/lib/siteData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Code, TrendingUp, ArrowRight } from "lucide-react";

const iconMap = {
  globe: Globe,
  code: Code,
  "trending-up": TrendingUp,
};

export function ServicesPreview() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to accelerate your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteData.services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Card
                key={service.id}
                className="card-hover border-border/50 bg-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-display text-xl">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link to={`/services#${service.id}`}>
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
