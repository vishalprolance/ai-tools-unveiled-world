
import { useState } from "react";
import { Tool } from "../data/toolsData";
import ToolCard from "./ToolCard";

interface ToolListProps {
  tools: Tool[];
}

const ToolList: React.FC<ToolListProps> = ({ tools }) => {
  const [visibleToolCount, setVisibleToolCount] = useState(12);
  
  const handleLoadMore = () => {
    setVisibleToolCount(prevCount => prevCount + 12);
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.slice(0, visibleToolCount).map((tool) => (
          <div key={tool.id} className="animate-fade-in">
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
      
      {visibleToolCount < tools.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-accent hover:bg-accent/80 text-white py-3 px-6 rounded-md transition-colors"
          >
            Load More Tools
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolList;
