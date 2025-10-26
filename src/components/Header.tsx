import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

export const Header = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="border-b border-border/40 sticky top-0 bg-background/80 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          {/* Left - Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 min-w-[200px]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center gap-3 min-w-[150px]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-xs font-medium transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 hover:opacity-80 transition-opacity">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 rounded-xl bg-gradient-primary">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ImageFormatX
                </h1>
                <p className="text-xs text-muted-foreground">Universal Image Converter</p>
              </div>
            </motion.div>
          </Link>

          {/* Right - Theme Toggle */}
          <div className="flex items-center min-w-[200px] md:min-w-[200px] justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
