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
    <div className="rounded-lg border border-color-3/30 p-4 flex flex-col h-full">
      <div className="aspect-square relative mb-4">
        <img
          src={image || '/placeholder.svg'}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-medium mb-1">{name}</h3>
        <p className="text-sm text-color-3 mb-2">Per Strip</p>
      </div>
      <div className="mt-auto">
        <p className="text-sm text-color-2/90 mb-4">
          Rp{priceRange[0].toLocaleString()} - Rp
          {priceRange[1].toLocaleString()}
        </p>
        <Button className="w-full bg-primary/90 hover:bg-primary">
          Add to cart
        </Button>
      </div>
    </div>
  );
}
