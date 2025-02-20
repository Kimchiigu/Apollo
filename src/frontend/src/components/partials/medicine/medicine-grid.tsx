import { useEffect, useState } from 'react';
import ProductCard from '../../component/ProductCard/ProductCard';

interface Product {
  name: string;
  image: string;
  priceRange: [number, number];
  category: string;
  description?: string;
}

interface ProductGridProps {
  category: string;
  searchTerm: string;
}

export default function MedicineGrid({
  category,
  searchTerm,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);

  //TODO
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/public/temp_db/medicine.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      category === 'Weight Management' ? true : product.category === category;

    const search = searchTerm.toLowerCase();
    const searchMatch =
      search === '' ||
      product.name.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <img
            src="https://cdn-icons-png.flaticon.com/512/483/483462.png"
            alt="Medicine icon"
            className="w-6 h-6"
          />
        </div>
        <h2 className="text-xl font-semibold font-poppins">
          {category}
          {searchTerm && (
            <span className="text-gray-500 text-base ml-2">
              Search results for "{searchTerm}"
            </span>
          )}
        </h2>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-poppins">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              image={product.image}
              priceRange={product.priceRange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 font-poppins">
          {searchTerm ? (
            <>
              No products found matching "{searchTerm}" in {category}
              <p className="text-sm mt-2">
                Try different keywords or browse other categories.
              </p>
            </>
          ) : (
            'No products found in this category.'
          )}
        </div>
      )}
    </div>
  );
}
