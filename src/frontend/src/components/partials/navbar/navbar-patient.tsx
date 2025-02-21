import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Bot, LucideMessageSquareText, Menu, X } from 'lucide-react';
import { useAuth } from '../../../hooks/use-auth-client';
import NavbarProfileDropdown from './navbar-profile-dropdown';

export default function NavbarPatient() {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();
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
        <div className="hidden lg:flex space-x-4 gap-2 flex-row">
          <Button
            variant="default"
            className="font-poppins"
            onClick={() => navigate('/chat')}
          >
            <div className="flex flex-row gap-4 items-center justify-center">
              <LucideMessageSquareText></LucideMessageSquareText>
              Chat
            </div>
          </Button>

          <Button
            variant="default"
            className="font-poppins"
            onClick={() => navigate('/')}
          >
            <div className="flex flex-row gap-4 items-center justify-center">
              <Bot></Bot>
              Chatbot
            </div>
          </Button>
        </div>

        <NavbarProfileDropdown></NavbarProfileDropdown>

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
          {/* TAMBAHIN BUTTON LAGI NNTI!!!!!!! */}
          <Button variant="default" className="font-poppins" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
