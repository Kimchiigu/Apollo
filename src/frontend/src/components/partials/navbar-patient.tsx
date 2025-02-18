import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';

export default function NavbarPatient() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <nav className="px-6 py-4 bg-background rounded-xl">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/br0jsxar5k86lmf1ifru"
            className="w-16 h-16"
            alt=""
            onClick={goHome}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          <Button className="" variant="default">
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-40 opacity-100 scale-100'
            : 'max-h-0 opacity-0 scale-95'
        }`}
      >
        <div className="mt-4 flex flex-col space-y-2 text-center">
          <Button variant="outline">Logout</Button>
        </div>
      </div>
    </nav>
  );
}
