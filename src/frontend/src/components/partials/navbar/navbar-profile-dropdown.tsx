import { LogOut, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { useAuth } from '@/frontend/src/hooks/use-auth-client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavbarProfileDropdown() {
  const { logout } = useAuth();
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();

  // TODO
  useEffect(() => {
    const fetchProfilePicture = async () => {
      setProfilePicture('https://github.com/shadcn.png');
    };

    fetchProfilePicture();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-10 w-10 rounded-full ring-2 ring-[#516AF5] ring-offset-2 transition-all hover:ring-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profilePicture} alt="Profile picture" />
            <AvatarFallback>DD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem
          onClick={() => navigate('/profile')}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate('/settings')}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
