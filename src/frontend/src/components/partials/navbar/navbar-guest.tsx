import { useState } from 'react';
import { Button } from '../../ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NavbarGuest() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/home');
  };

  return (
    <nav className="px-2 py-4 bg-background rounded-xl">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/br0jsxar5k86lmf1ifru"
            className="w-16 h-16 cursor-pointer"
            alt="Apollo Logo"
            onClick={goHome}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          <Button
            variant="default"
            className="font-poppins"
            onClick={() => navigate('/login')}
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={28} className="text-primary" />
          ) : (
            <Menu size={28} className="text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu (Dropdown with Animation) */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-40 opacity-100 scale-100'
            : 'max-h-0 opacity-0 scale-95'
        }`}
      >
        <div className="mt-4 flex flex-col space-y-2 text-center">
          <Button
            variant="default"
            className="font-poppins"
            onClick={() => navigate('/login')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
