import SearchBar from '../../components/component/SearchBar/SearchBar';
import Sidebar from '../../components/partials/medicine/medicine-sidebar';
import ProductGrid from '../../components/partials/medicine/medicine-grid';
import { useState } from 'react';
import Navbar from '../../components/partials/navbar/navbar';

export default function MedicinePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // You can implement filtering logic here
    console.log('Selected category:', category);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-2 md:col-span-3">
            <Sidebar
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          </div>

          {/* Product Grid */}
          <div className="col-span-10 md:col-span-9">
            <ProductGrid category={selectedCategory} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  );
}
