
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calculator, Home, FileText, HelpCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();

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
          <div className="flex gap-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                  path === location.pathname
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
