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
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRG9BXTX7q8I9C66UGUfrfKYNPE1kst4HRXA&s',
    priceRange: [134300, 142100],
    category: 'Obat',
    description: 'Diet medicine for weight management',
  },
  {
    name: 'Vistat 120 mg 10 Kapsul',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0dGyWqS56WbLd8e3Lc59-CWwqt2rY2KUgIg&s',
    priceRange: [121900, 121900],
    category: 'Obat',
    description: 'Treatment for various conditions',
  },
  {
    name: 'Vitamin C 1000mg',
    image:
      'https://res-4.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_500,w_500/v1/production/pharmacy/products/1660122001_60f7f5ba1ef1133130010a40',
    priceRange: [50000, 50000],
    category: 'Suplemen',
    description: 'High dose vitamin C supplement',
  },
  {
    name: 'Nutrisi Diet Pack',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsGXubEJi2CA6QRbgMkjvQPeej-p05RFrdVQ&s',
    priceRange: [250000, 250000],
    category: 'Nutrisi & Detoks',
    description: 'Complete nutrition pack for diet program',
  },
  {
    name: 'Redoxon Double Action',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnLeIJMqS3HJYaDfc5sl84Ju3HV1QYc7h2nA&s',
    priceRange: [45000, 45000],
    category: 'Suplemen',
    description: 'Vitamin C and Zinc supplement',
  },
  {
    name: 'Covid-19 Home Test Kit',
    image:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQVaVlZ8wchKHBuFzjbAc3NdMdHPSmdmqo8VnB7Y2bfaYKxcCK3wV0UaDbKYehhGWmoltweua5HmynjKE1lPldBniGXBNuRkdzkNqm_msN8WHciaiHT8mr9GA&usqp=CAE',
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
            src="https://cdn-icons-png.flaticon.com/512/483/483462.png"
            alt="Medicine icon"
            className="w-6 h-6 text-white"
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
