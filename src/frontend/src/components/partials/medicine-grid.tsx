import ProductCard from '../component/ProductCard/ProductCard';

interface ProductGridProps {
  category: string;
}

// Sample products data - in a real app, this would come from an API
const allProducts = [
  {
    name: 'Obeslim 10 Kapsul',
    image: '/placeholder.jpg',
    priceRange: [134300, 142100] as [number, number],
    category: 'Obat',
  },
  {
    name: 'Vistat 120 mg 10 Kapsul',
    image: '/placeholder.jpg',
    priceRange: [121900, 121900] as [number, number],
    category: 'Obat',
  },
  {
    name: 'Vitamin C 1000mg',
    image: '/placeholder.jpg',
    priceRange: [50000, 50000] as [number, number],
    category: 'Suplemen',
  },
  {
    name: 'Nutrisi Diet Pack',
    image: '/placeholder.jpg',
    priceRange: [250000, 250000] as [number, number],
    category: 'Nutrisi & Detoks',
  },
  {
    name: 'Onemed Timbangan Berat Badan',
    image: '/placeholder.jpg',
    priceRange: [123500, 32300] as [number, number],
    category: 'Alat Penunjang',
  },
];

export default function MedicineGrid({ category }: ProductGridProps) {
  // Filter products based on selected category
  const filteredProducts =
    category === 'Weight Management'
      ? allProducts
      : allProducts.filter((product) => product.category === category);

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
        <h2 className="text-xl font-semibold">{category}</h2>
      </div>

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

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found in this category
        </div>
      )}
    </div>
  );
}
