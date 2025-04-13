
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const isMobile = useIsMobile();

  const navigationLinks = [
    { label: "Home", path: "/" },
    { label: "Explore Tools", path: "/tools" }
  ];

  const renderDesktopNav = () => (
    <>
      <div className="flex space-x-4">
        {navigationLinks.map(link => (
          <Link 
            key={link.path} 
            to={link.path} 
            className="text-foreground hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <ThemeToggle />
    </>
  );

  const renderMobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 text-foreground hover:text-accent">
          <Menu size={24} />
          <span className="sr-only">Toggle menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] bg-background">
        <div className="flex flex-col mt-6 space-y-6">
          {navigationLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-foreground hover:text-accent transition-colors text-lg"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="bg-card border-b border-border py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-foreground flex items-center">
          <span className="text-accent">AI</span>
          <span className="ml-1">Hub</span>
        </Link>
        <div className="flex items-center space-x-6">
          {isMobile ? renderMobileNav() : renderDesktopNav()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
