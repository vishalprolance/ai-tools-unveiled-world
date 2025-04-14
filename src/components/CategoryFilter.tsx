
interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory,
  categories
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            selectedCategory === null 
              ? "bg-accent text-accent-foreground" 
              : "bg-card text-muted-foreground hover:bg-muted"
          }`}
          onClick={() => onSelectCategory(null)}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === category 
                ? "bg-accent text-accent-foreground" 
                : "bg-card text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
