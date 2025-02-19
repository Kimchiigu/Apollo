import { Search } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export default function SearchBar() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 w-full"
            placeholder="Example: Covid-19, vitamin C or Redoxon"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Cari</Button>
      </div>
    </div>
  );
}
