
import { Tool } from "../data/toolsData";

interface ScrollingBannerProps {
  tools: Tool[];
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({ tools }) => {
  // Duplicate the tools array to create a seamless scroll effect
  const duplicatedTools = [...tools, ...tools];
  
  return (
    <div className="bg-muted py-10 overflow-hidden">
      <div className="scrolling-wrapper">
        <div className="scrolling-content">
          {duplicatedTools.map((tool, index) => (
            <span 
              key={`${tool.id}-${index}`} 
              className="inline-block mx-8 text-xl md:text-2xl font-bold"
            >
              <span className="text-accent">{tool.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
