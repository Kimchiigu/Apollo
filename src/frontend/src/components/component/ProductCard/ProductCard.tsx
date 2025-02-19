import { Button } from '../../ui/button';

interface ProductCardProps {
  name: string;
  image: string;
  priceRange: [number, number];
}

export default function ProductCard({
  name,
  image,
  priceRange,
}: ProductCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="aspect-square relative mb-4">
        <img
          src={image || '/placeholder.svg'}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="font-medium mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">Per Strip</p>
      <p className="text-sm text-gray-900 mb-4">
        Rp{priceRange[0].toLocaleString()} - Rp{priceRange[1].toLocaleString()}
      </p>
      <Button className="w-full bg-blue-600 hover:bg-blue-700">Beli</Button>
    </div>
  );
}
