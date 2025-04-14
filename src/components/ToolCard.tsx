
import { Tool } from "../data/toolsData";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="tool-card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-foreground">{tool.name}</h3>
        <div className="flex gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${tool.free ? 
            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
            'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'}`}>
            {tool.free ? 'Free' : 'Paid'}
          </span>
          <span className="category-pill">{tool.category}</span>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{tool.description}</p>
      <a 
        href={tool.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-accent hover:text-accent/80 flex items-center text-sm"
      >
        Visit Website
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  );
};

export default ToolCard;
