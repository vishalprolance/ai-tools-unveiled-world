
import { useTheme } from "./ThemeProvider";
import { Switch } from "./ui/switch";
import { Moon, Sun } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex items-center ${isMobile ? 'justify-between w-full' : 'space-x-2'}`}>
      {isMobile && <span className="text-foreground">Toggle theme</span>}
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch 
          checked={theme === "light"} 
          onCheckedChange={toggleTheme} 
          aria-label="Toggle theme"
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default ThemeToggle;
