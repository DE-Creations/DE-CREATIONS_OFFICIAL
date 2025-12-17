import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Portfolio } from "@/components/home/Portfolio";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTABand } from "@/components/home/CTABand";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>DE Creations - Web Development, Software & Digital Marketing Agency</title>
        <meta
          name="description"
          content="DE Creations is your one-stop digital transformation partner. We offer web development, software development, and digital marketing services in Sri Lanka."
        />
      </Helmet>
      <Hero />
      <ServicesPreview />
      <Portfolio />
      <WhyChooseUs />
      <CTABand />
    </Layout>
  );
};

export default Index;
