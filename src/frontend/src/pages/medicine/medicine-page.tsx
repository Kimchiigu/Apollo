import SearchBar from '../../components/component/SearchBar/SearchBar';
import Sidebar from '../../components/partials/medicine-sidebar';
import ProductGrid from '../../components/partials/medicine-grid';
import { useState } from 'react';

export default function MedicinePage() {
  const [selectedCategory, setSelectedCategory] = useState('Obat');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // You can implement filtering logic here
    console.log('Selected category:', category);
  };
  return (
    <div className="min-h-screen bg-white">
      <SearchBar />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <Sidebar
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          </div>

          {/* Product Grid */}
          <div className="col-span-9">
            <ProductGrid category={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
