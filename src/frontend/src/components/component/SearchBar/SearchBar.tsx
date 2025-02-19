import { Search } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface SearchBarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

export default function SearchBar({ onSearch, searchTerm }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search with current input value
    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm = formData.get('search') as string;
    onSearch(searchTerm);
  };
  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            name="search"
            className="pl-10 w-full"
            placeholder="Example: Covid-19, vitamin C or Redoxon"
            defaultValue={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Cari
        </Button>
      </div>
    </form>
  );
}
