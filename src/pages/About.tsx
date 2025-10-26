import { motion } from "framer-motion";
import { ImageIcon, Sparkles, Zap, Shield, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";

const About = () => {
  const features = [
    {
      icon: ImageIcon,
      title: "8 Image Formats",
      description: "Transform images into JPEG, PNG, WebP, GIF, BMP, TIFF, AVIF, and ICO",
    },
    {
      icon: Sparkles,
      title: "Quality Control",
      description: "Adjust image quality to find the perfect balance between size and clarity",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Convert images in seconds with our powerful client-side processing",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "All conversions happen in your browser — your images never leave your device",
    },
    {
      icon: Download,
      title: "Flexible Downloads",
      description: "Download files individually or as a ZIP archive in one seamless experience",
    },
  ];

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
              <Sparkles className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your all-in-one solution for fast, smooth, and high-quality image conversion
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="backdrop-blur-sm bg-card/50">
              <CardContent className="p-8 md:p-12 space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Welcome to <span className="font-semibold text-foreground">Image Converter</span> —
                  your all-in-one solution for fast, smooth, and high-quality image conversion.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  We built this app to make image format conversion simple for everyone. Whether you're
                  a designer, developer, photographer, or just someone who wants their images in the right
                  format — Image Converter helps you do it in seconds.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  With our powerful converter, you can easily transform your images into 8 different formats,
                  including JPEG, PNG, WebP, GIF, BMP, TIFF, AVIF, and ICO. You can also adjust image quality,
                  preview before downloading, and choose to download files individually or as a ZIP archive —
                  all in one seamless experience.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our goal is to give you a beautifully simple interface that feels effortless while delivering
                  professional-grade results. Every action is designed to be fast, secure, and smooth — so you
                  can focus on creativity, not conversion.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're constantly improving the app to add more formats, features, and performance optimizations
                  to make your experience even better.
                </p>

                <p className="text-lg font-medium text-center pt-4">
                  Thank you for choosing <span className="bg-gradient-primary bg-clip-text text-transparent">Image Converter</span> —
                  where your images get the perfect format, effortlessly.
                </p>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full backdrop-blur-sm bg-card/50 hover:bg-card/80 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-primary">
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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

export default About;
