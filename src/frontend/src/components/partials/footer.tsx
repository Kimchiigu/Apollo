import { Mail, Phone } from 'lucide-react';
import { Label } from '../ui/label';

export default function Footer() {
  return (
    <footer className="bg-primary py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/br0jsxar5k86lmf1ifru"
            alt="Brand Logo"
            className="w-12 h-12"
          />
          <Label className="text-lg font-semibold font-poppins text-background">
            Apollo
          </Label>
        </div>

        {/* Center: Quick Links */}
        <div className="flex space-x-6 text-sm text-background font-poppins">
          <a href="#" className="hover:text-background/50">
            About
          </a>
          <a href="#" className="hover:text-background/50">
            Services
          </a>
          <a href="#" className="hover:text-background/50">
            Contact
          </a>
          <a href="#" className="hover:text-background/50">
            Privacy Policy
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-background hover:text-background/50">
            <Phone />
          </a>
          <a href="#" className="text-background hover:text-background/50">
            <Mail />
          </a>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="text-center text-sm mt-6 text-background font-poppins font-bold">
        © {new Date().getFullYear()} Apollo. All rights reserved.
      </div>
    </footer>
  );
}
