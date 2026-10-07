import { Layout } from "@/components/layout/Layout";
import { ServiceSection } from "@/components/services/ServiceSection";
import { CTABand } from "@/components/home/CTABand";
import { siteData } from "@/lib/siteData";
import { Helmet } from "react-helmet-async";

const Services = () => {
  return (
    <Layout>
      <Helmet>
        <title>Our Services - DE Creations | Web, Software & Marketing</title>
        <meta
          name="description"
          content="Explore our comprehensive digital services including web development, custom software solutions, and data-driven digital marketing strategies."
        />
      </Helmet>

      <section className="section-padding bg-linear-to-b from-muted/50 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-slide-up">
              Comprehensive digital solutions designed to accelerate your business
              growth and maximize your online presence.
            </p>
          </div>
        </div>
      </section>

      {siteData.services.map((service, index) => (
        <div
          key={service.id}
          className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
        >
          <ServiceSection
            id={service.id}
            title={service.title}
            description={service.shortDescription}
            features={service.features}
            image={service.image}
            isReversed={index % 2 === 1}
          />
        </div>
      ))}

      <CTABand />
    </Layout>
  );
};

export default Services;
