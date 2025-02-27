
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calculator, Home, FileText, HelpCircle, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/calculator", label: "Calculator", icon: Calculator },
    { path: "/guide", label: "Guide", icon: HelpCircle },
    { path: "/invoice", label: "Invoice", icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-8 flex items-center space-x-2">
            <Calculator className="h-6 w-6" />
            <span className="font-bold">EMI Wise</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[#31473A] hover:bg-[#EDF4F2] px-3 py-2 rounded-md",
                  path === location.pathname
                    ? "text-[#31473A] bg-[#EDF4F2]"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4">
          <div className="flex flex-col space-y-3">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[#31473A] hover:bg-[#EDF4F2] px-3 py-2 rounded-md",
                  path === location.pathname
                    ? "text-[#31473A] bg-[#EDF4F2]"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
