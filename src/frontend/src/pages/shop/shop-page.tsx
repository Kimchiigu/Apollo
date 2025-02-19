import Navbar from '../../components/partials/navbar';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const categories = [
  {
    name: 'Batuk, Pilek & Flu',
    image: 'https://via.placeholder.com/40', // Replace with real category image
    subcategories: [
      'Batuk & Flu',
      'Balsem & Minyak Esensial',
      'Perawatan Herbal',
      'Nasal Spray & Dekongestan',
      'Untuk Bayi & Anak',
    ],
  },
  {
    name: 'Masalah Pencernaan',
    image: 'https://via.placeholder.com/40',
    subcategories: [
      'Asam Lambung & GERD',
      'Mual & Muntah',
      'Infeksi Cacing',
      'Diare',
      'Sembelit & Wasir',
    ],
  },
  {
    name: 'Masalah THT',
    image: 'https://via.placeholder.com/40',
    subcategories: [
      'Sariawan & Herpes Mulut',
      'Obat Tetes Telinga',
      'Obat Kumur Antiseptik',
      'Kebersihan Hidung',
      'Pilek & Tenggorokan',
    ],
  },
  {
    name: 'Demam & Nyeri',
    image: 'https://via.placeholder.com/40',
    subcategories: [
      'Pereda Demam & Nyeri',
      'Terapi Panas & Dingin',
      'Untuk Bayi & Anak',
      'Perawatan Herbal',
    ],
  },
  {
    name: 'Alergi',
    image: 'https://via.placeholder.com/40',
    subcategories: ['Obat Alergi', 'Pereda Gatal'],
  },
  {
    name: 'Masalah Mata',
    image: 'https://via.placeholder.com/40',
    subcategories: ['Gatal, Kering & Merah', 'Lainnya'],
  },
  {
    name: 'Kondisi Kulit',
    image: 'https://via.placeholder.com/40',
    subcategories: [
      'Jerawat',
      'Infeksi Kulit',
      'Dermatitis & Eksim',
      'Lainnya',
    ],
  },
  {
    name: 'Infeksi',
    image: 'https://via.placeholder.com/40',
    subcategories: ['Antibiotik', 'Antivirus', 'Antijamur'],
  },
  {
    name: 'Tulang & Sendi Sakit',
    image: 'https://via.placeholder.com/40',
    subcategories: ['Tulang & Osteoporosis', 'Asam Urat & Radang Sendi'],
  },
  {
    name: 'Kesuburan & Lainnya',
    image: 'https://via.placeholder.com/40',
    subcategories: ['Kandung Kemih & Ginjal', 'Pria'],
  },
];

export default function ShopPage() {
  // Split categories into two columns
  const midIndex = Math.ceil(categories.length / 2);
  const leftCategories = categories.slice(0, midIndex);
  const rightCategories = categories.slice(midIndex);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Obat & Perawatan</h1>

        {/* Grid Layout for Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {leftCategories.map((category, index) => (
              <div key={index} className="mb-6">
                {/* Category Title with Avatar */}
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar>
                    <AvatarImage src={category.image} />
                    <AvatarFallback>{category.name[0]}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                </div>

                {/* Subcategories in two columns */}
                <div className="grid grid-cols-2 gap-4">
                  {category.subcategories.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div>
            {rightCategories.map((category, index) => (
              <div key={index} className="mb-6">
                {/* Category Title with Avatar */}
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar>
                    <AvatarImage src={category.image} />
                    <AvatarFallback>{category.name[0]}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                </div>

                {/* Subcategories in two columns */}
                <div className="grid grid-cols-2 gap-4">
                  {category.subcategories.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
