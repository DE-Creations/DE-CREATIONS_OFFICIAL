import { Target, Eye, Heart } from "lucide-react";

export function CompanyIntro() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              About <span className="text-primary">DE Creations</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed animate-slide-up text-justify">
              We are a leading digital agency based in Sri Lanka, dedicated to helping
              businesses thrive in the digital age through innovative technology solutions
              and strategic marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="text-center p-6 animate-slide-up rounded-xl transition-all duration-300 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1 cursor-pointer group" 
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                To empower businesses with cutting-edge digital solutions that drive growth,
                efficiency, and sustainable success in an ever-evolving digital landscape.
              </p>
            </div>

            <div 
              className="text-center p-6 animate-slide-up rounded-xl transition-all duration-300 hover:bg-secondary/5 hover:shadow-lg hover:-translate-y-1 cursor-pointer group" 
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-secondary/20 group-hover:scale-110">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Our Vision
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                To be the most trusted digital transformation partner in the region, known
                for innovation, excellence, and unwavering commitment to client success.
              </p>
            </div>

            <div 
              className="text-center p-6 animate-slide-up rounded-xl transition-all duration-300 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1 cursor-pointer group" 
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Our Values
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                Innovation, integrity, collaboration, and excellence guide every project
                we undertake and every relationship we build with our clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
