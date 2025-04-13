
import { useState, useEffect } from "react";
import { toolsData } from "../data/toolsData";
import Navbar from "../components/Navbar";
import ToolList from "../components/ToolList";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";

const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState(toolsData);

  useEffect(() => {
    let result = toolsData;
    
    // Apply category filter if selected
    if (selectedCategory) {
      result = result.filter(tool => tool.category === selectedCategory);
    }
    
    // Apply search filter if query exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredTools(result);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Tools Header */}
      <section className="bg-card py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Explore AI Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Search, filter, and discover the perfect AI tools for your needs.
          </p>
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>
      
      {/* Tools Content */}
      <section className="py-16 px-4 flex-grow">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Sidebar Filters */}
            <div className="md:col-span-1">
              <CategoryFilter 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
              />
              
              {/* Results Count */}
              <div className="mb-8 p-4 bg-card rounded-lg">
                <h3 className="font-medium mb-2">Results</h3>
                <div className="text-2xl font-bold text-accent">{filteredTools.length}</div>
                <div className="text-sm text-muted-foreground">tools found</div>
              </div>
            </div>
            
            {/* Tools Grid */}
            <div className="md:col-span-3">
              {filteredTools.length > 0 ? (
                <ToolList tools={filteredTools} />
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No tools found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
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

export default Tools;
