import ProductCard from '../component/ProductCard/ProductCard';

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

const allProducts: Product[] = [
  {
    name: 'Obeslim 10 Kapsul',
    image: '/placeholder.jpg',
    priceRange: [134300, 142100],
    category: 'Obat',
    description: 'Diet medicine for weight management',
  },
  {
    name: 'Vistat 120 mg 10 Kapsul',
    image: '/placeholder.jpg',
    priceRange: [121900, 121900],
    category: 'Obat',
    description: 'Treatment for various conditions',
  },
  {
    name: 'Vitamin C 1000mg',
    image: '/placeholder.jpg',
    priceRange: [50000, 50000],
    category: 'Suplemen',
    description: 'High dose vitamin C supplement',
  },
  {
    name: 'Nutrisi Diet Pack',
    image: '/placeholder.jpg',
    priceRange: [250000, 250000],
    category: 'Nutrisi & Detoks',
    description: 'Complete nutrition pack for diet program',
  },
  {
    name: 'Redoxon Double Action',
    image: '/placeholder.jpg',
    priceRange: [45000, 45000],
    category: 'Suplemen',
    description: 'Vitamin C and Zinc supplement',
  },
  {
    name: 'Covid-19 Home Test Kit',
    image: '/placeholder.jpg',
    priceRange: [75000, 75000],
    category: 'Alat Penunjang',
    description: 'Rapid test kit for Covid-19',
  },
];

export default function MedicineGrid({
  category,
  searchTerm,
}: ProductGridProps) {
  const filteredProducts = allProducts.filter((product) => {
    // Category filter
    const categoryMatch =
      category === 'Weight Management' ? true : product.category === category;

    // Search filter - check both name and description
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
            src="/medicine-icon.png"
            alt="Medicine icon"
            className="w-6 h-6 text-white"
          />
        </div>
        <h2 className="text-xl font-semibold">
          {category}
          {searchTerm && (
            <span className="text-gray-500 text-base ml-2">
              Search results for "{searchTerm}"
            </span>
          )}
        </h2>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? (
            <>
              No products found matching "{searchTerm}" in {category}
              <p className="text-sm mt-2">
                Try different keywords or browse other categories
              </p>
            </>
          ) : (
            'No products found in this category'
          )}
        </div>
      )}
    </div>
  );
}
