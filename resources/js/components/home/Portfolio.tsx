import { useState } from "react";
import { siteData } from "@/lib/siteData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Portfolio images
import hafsaImg from "@/assets/portfolio/hafsa.jpg";
import parisImg from "@/assets/portfolio/paris.jpg";
import apexImg from "@/assets/portfolio/apex.jpg";
import ediriImg from "@/assets/portfolio/ediri.jpg";
import taxImg from "@/assets/portfolio/tax.jpg";
import jayaminiImg from "@/assets/portfolio/jayamini.jpg";
import huwamaruImg from "@/assets/portfolio/huwamaru.jpg";
import parisMarketingImg from "@/assets/portfolio/paris-marketing.jpg";
import amityImg from "@/assets/portfolio/amity.jpg";

const portfolioImages: Record<string, string> = {
  hafsa: hafsaImg,
  paris: parisImg,
  apex: apexImg,
  ediri: ediriImg,
  tax: taxImg,
  jayamini: jayaminiImg,
  huwamaru: huwamaruImg,
  "paris-marketing": parisMarketingImg,
  amity: amityImg,
};

const tabs = [
  { id: "web", label: "Web Development" },
  { id: "software", label: "Software Development" },
  { id: "marketing", label: "Digital Marketing" },
];

export function Portfolio() {
  const [activeTab, setActiveTab] = useState("web");

  const projects = siteData.portfolio[activeTab as keyof typeof siteData.portfolio];

  return (
    <section id="portfolio" className="section-padding bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our latest projects across different domains
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-muted-foreground hover:bg-accent border border-border"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="card-hover overflow-hidden border-border/50 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                {portfolioImages[project.image] ? (
                  <img
                    src={portfolioImages[project.image]}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="font-display text-lg font-semibold text-primary/60">
                      {project.title}
                    </span>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-lg">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
