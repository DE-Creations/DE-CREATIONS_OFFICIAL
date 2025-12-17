import { Layout } from "@/components/layout/Layout";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Contact Us - DE Creations | Get a Free Consultation</title>
        <meta
          name="description"
          content="Contact DE Creations for your web development, software, or digital marketing needs. Get a free consultation and quote for your project."
        />
      </Helmet>

      <section className="section-padding bg-gradient-to-b from-muted/50 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-slide-up">
              Have a project in mind? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <ContactInfo />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="bg-card rounded-2xl p-8 md:p-10 border border-border/50 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
