'use client';

import { ArrowLeft, Trash2, Edit3, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import NavbarProfileDropdown from '../../components/partials/navbar/navbar-profile-dropdown';
import Receipt from '../../components/partials/receipt/receipt';

const healthData = [
  { month: 'Jan', physical: 65, mental: 75 },
  { month: 'Feb', physical: 70, mental: 72 },
  { month: 'Mar', physical: 75, mental: 80 },
  { month: 'Apr', physical: 72, mental: 85 },
  { month: 'May', physical: 80, mental: 82 },
  { month: 'Jun', physical: 85, mental: 85 },
];

const activityData = [
  { name: 'Mon', steps: 8000 },
  { name: 'Tue', steps: 9200 },
  { name: 'Wed', steps: 7800 },
  { name: 'Thu', steps: 10500 },
  { name: 'Fri', steps: 9800 },
  { name: 'Sat', steps: 6500 },
  { name: 'Sun', steps: 7200 },
];

const purchasedMedicines = [
  { id: 1, name: 'Paracetamol', quantity: 2, price: 5.99 },
  { id: 2, name: 'Vitamin C', quantity: 1, price: 12.99 },
  { id: 3, name: 'Ibuprofen', quantity: 1, price: 7.49 },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [icpBalance, setIcpBalance] = useState(123.45); // Simulated ICP balance

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
        {/* Profile Header */}
        <Card className="border-none shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <Avatar className="h-20 w-20 border-4 border-[#516AF5]">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>DC</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">David Christian</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">19 years old</span>
                    <span className="bg-[#516AF5] text-white text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#516AF5] text-[#516AF5] hover:bg-[#516AF5] hover:text-white"
                onClick={() => navigate('/editprofile')}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            {/* ICP Balance */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#516AF5] to-[#8E9FFF] rounded-lg text-white">
              <h2 className="text-lg font-semibold mb-2">ICP Balance</h2>
              <div className="flex items-end">
                <span className="text-3xl font-bold">
                  {icpBalance.toFixed(2)}
                </span>
                <span className="ml-2 text-sm opacity-80">ICP</span>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">Height</p>
                <p className="text-xl font-semibold mt-1">175 cm</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">Weight</p>
                <p className="text-xl font-semibold mt-1">68 kg</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">BMI</p>
                <p className="text-xl font-semibold mt-1">22.2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Health Score Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Health Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="physical"
                      stackId="1"
                      stroke="#516AF5"
                      fill="#516AF5"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="mental"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="#516AF5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* <Receipt /> */}

        {/* Account Actions */}
        <div className="space-y-4 mt-12">
          <Button variant="destructive" className="w-full" onClick={() => {}}>
            Logout
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
