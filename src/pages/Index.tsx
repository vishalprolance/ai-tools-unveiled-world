
import { Link } from "react-router-dom";
import { toolsData } from "../data/toolsData";
import Navbar from "../components/Navbar";
import ScrollingBanner from "../components/ScrollingBanner";
import ToolCard from "../components/ToolCard";

const Index = () => {
  // Get 6 featured tools
  const featuredTools = toolsData.slice(0, 6);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-card to-background py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-accent">AI Tools</span> Unveiled World
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Your comprehensive directory of artificial intelligence tools from around the world.
          </p>
          <Link 
            to="/tools" 
            className="bg-accent hover:bg-accent/80 text-white py-3 px-8 rounded-md text-lg transition-colors"
          >
            Explore All Tools
          </Link>
        </div>
      </section>
      
      {/* Scrolling Banner */}
      <ScrollingBanner tools={toolsData} />
      
      {/* Featured Tools */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured AI Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover some of the most powerful and popular AI tools available today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <div key={tool.id} className="animate-fade-in">
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/tools" 
              className="text-accent hover:text-accent/80 flex items-center justify-center text-lg"
            >
              View All Tools
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-card py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-accent mb-2">{toolsData.length}+</div>
              <div className="text-muted-foreground">AI Tools Cataloged</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-accent mb-2">{new Set(toolsData.map(tool => tool.category)).size}</div>
              <div className="text-muted-foreground">Different Categories</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-muted-foreground">Updated Regularly</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-8 px-4 border-t border-border mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} AI Tools Unveiled World. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
