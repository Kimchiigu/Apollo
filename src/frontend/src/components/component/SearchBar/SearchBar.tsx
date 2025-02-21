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
    <form
      onSubmit={handleSubmit}
      className="container mx-auto px-4 py-6 font-poppins"
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 bg-background" />
          <Input
            name="search"
            className="pl-10 w-full sm: text-sm"
            placeholder="Example: Covid-19, vitamin C or Redoxon"
            defaultValue={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-primary">
          Search
        </Button>
      </div>
    </form>
  );
}
