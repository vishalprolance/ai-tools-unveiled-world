
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-card border-b border-border py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-foreground flex items-center">
          <span className="text-accent">AI</span>
          <span className="ml-1">Hub</span>
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-foreground hover:text-accent transition-colors">
            Home
          </Link>
          <Link to="/tools" className="text-foreground hover:text-accent transition-colors">
            Explore Tools
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
