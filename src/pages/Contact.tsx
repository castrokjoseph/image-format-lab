import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
              <Mail className="w-4 h-4" />
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="backdrop-blur-sm bg-card/50">
              <CardContent className="p-8 md:p-12 space-y-6">
                <p className="text-lg text-muted-foreground">
                  Whether you have a question, feedback, or need help using our Image Converter App,
                  our team is here to assist you.
                </p>

                <p className="text-lg text-muted-foreground">
                  If you're facing any issues, have feature suggestions, or just want to share your
                  experience, don't hesitate to get in touch.
                </p>

                <div className="pt-6">
                  <div className="flex items-center gap-3 justify-center p-6 rounded-xl bg-gradient-primary/10 border border-primary/20">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a
                        href="mailto:info@imageconverter.com"
                        className="text-xl font-semibold text-primary hover:underline"
                      >
                        info@imageconverter.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-4 text-center">
                  <p className="text-muted-foreground">
                    We aim to respond to all queries as quickly as possible.
                  </p>

                  <p className="text-lg font-medium">
                    Thank you for using <span className="bg-gradient-primary bg-clip-text text-transparent">Image Converter</span> —
                    your trusted tool for seamless and high-quality image conversions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>All conversions happen in your browser. Your images never leave your device.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
