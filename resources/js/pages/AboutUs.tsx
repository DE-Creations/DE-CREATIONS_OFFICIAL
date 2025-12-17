import { Layout } from "@/components/layout/Layout";
import { CompanyIntro } from "@/components/about/CompanyIntro";
import { StatsStrip } from "@/components/about/StatsStrip";
import { TeamSection } from "@/components/about/TeamSection";
import { CTABand } from "@/components/home/CTABand";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us - DE Creations | Digital Agency Sri Lanka</title>
        <meta
          name="description"
          content="Learn about DE Creations, a leading digital agency in Sri Lanka. Meet our team and discover our mission to transform businesses through technology."
        />
      </Helmet>
      <CompanyIntro />
      <StatsStrip />
      <TeamSection />
      <CTABand />
    </Layout>
  );
};

export default AboutUs;
