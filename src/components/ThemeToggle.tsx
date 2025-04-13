
import { useTheme } from "./ThemeProvider";
import { Switch } from "./ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-amber-500' : 'text-muted-foreground'}`} />
      <Switch 
        checked={theme === "dark"} 
        onCheckedChange={toggleTheme} 
        aria-label="Toggle theme"
      />
      <Moon className={`h-4 w-4 ${theme === 'dark' ? 'text-indigo-300' : 'text-muted-foreground'}`} />
    </div>
  );
};

export default ThemeToggle;
