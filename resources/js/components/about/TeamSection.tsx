import { siteData } from "@/lib/siteData";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Team images
import dilushaImg from "@/assets/team/dilusha.png";
import aminduImg from "@/assets/team/amindu.png";
import sasinduImg from "@/assets/team/sasindu.png";

const teamImages: Record<string, string> = {
  dilusha: dilushaImg,
  amindu: aminduImg,
  sasindu: sasinduImg,
};

export function TeamSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center">
            The talented people behind our success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {siteData.team.map((member, index) => (
            <Card
              key={member.id}
              className="card-hover text-center border-border/50 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={teamImages[member.image]}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="font-display text-lg">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-secondary font-medium">
                  {member.role}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
