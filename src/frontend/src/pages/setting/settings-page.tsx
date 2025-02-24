'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import NavbarProfileDropdown from '../../components/partials/navbar/navbar-profile-dropdown';

const themeColors = [
  { name: 'Default', value: 'default', primary: '#516AF5' },
  { name: 'Ocean', value: 'ocean', primary: '#0077be' },
  { name: 'Forest', value: 'forest', primary: '#228B22' },
  { name: 'Sunset', value: 'sunset', primary: '#FFA500' },
  { name: 'Lavender', value: 'lavender', primary: '#8E4585' },
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'default';
    }
    return 'default';
  });

  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      const primaryColor =
        themeColors.find((t) => t.value === theme)?.primary ?? '#516AF5';
      document.documentElement.style.setProperty(
        '--color-primary',
        primaryColor,
      );
    }
  }, [theme]);

  const handleConnectWallet = () => {
    // Implement wallet connection logic here
    setIsWalletConnected(true);
    console.log('Wallet connected');
  };

  const handleDisconnectWallet = () => {
    // Implement wallet disconnection logic here
    setIsWalletConnected(false);
    console.log('Wallet disconnected');
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <NavbarProfileDropdown />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <Label htmlFor="notifications">Enable Notifications</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Choose your preferred color theme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={theme} onValueChange={setTheme}>
                <div className="grid grid-cols-2 gap-4">
                  {themeColors.map((color) => (
                    <div
                      key={color.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={color.value} id={color.value} />
                      <Label
                        htmlFor={color.value}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color.primary }}
                        ></div>
                        <span>{color.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wallet Connection</CardTitle>
              <CardDescription>Connect to your token wallet</CardDescription>
            </CardHeader>
            <CardContent>
              {isWalletConnected ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5" />
                    <span>Wallet Connected</span>
                  </div>
                  <Button variant="outline" onClick={handleDisconnectWallet}>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button onClick={handleConnectWallet} className="w-full">
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
