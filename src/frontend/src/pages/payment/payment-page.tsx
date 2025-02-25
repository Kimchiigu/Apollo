'use client';

import Navbar from '../../components/partials/navbar/navbar';
import { Lock, MoreHorizontal, Wallet } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Separator } from '../../components/ui/separator';
import { useState } from 'react';

const transactionData = {
  transactionType: "product", // Change to "doctor" to test doctor UI
  doctor: {
    name: "Dr. John Doe",
    image: "https://www.example.com/doctor-profile.jpg",
    specialty: "General Practitioner",
    consultationFee: 250000,
    duration: "30 minutes",
  },
  products: [
    {
      name: "Vitamin C 1000mg",
      image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1/production/pharmacy/products/1660122001_60f7f5ba1ef1133130010a40",
      price: 50000,
      category: "Supplement",
      description: "High dose vitamin C supplement",
      quantity: 2,
    },
    {
      name: "Paracetamol 500mg",
      image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1/production/pharmacy/products/1660122001_60f7f5ba1ef1133130010b50",
      price: 30000,
      category: "Pain Relief",
      description: "Effective fever and pain reducer",
      quantity: 1,
    },
    {
      name: "Paracetamol 500mg",
      image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1/production/pharmacy/products/1660122001_60f7f5ba1ef1133130010b50",
      price: 30000,
      category: "Pain Relief",
      description: "Effective fever and pain reducer",
      quantity: 1,
    },
    {
      name: "Paracetamol 500mg",
      image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1/production/pharmacy/products/1660122001_60f7f5ba1ef1133130010b50",
      price: 30000,
      category: "Pain Relief",
      description: "Effective fever and pain reducer",
      quantity: 1,
    },
    {
      name: "Paracetamol 500mg",
      image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1/production/pharmacy/products/1660122001_60f7f5ba1ef1133130010b50",
      price: 30000,
      category: "Pain Relief",
      description: "Effective fever and pain reducer",
      quantity: 1,
    },
  ],
};

export default function PaymentPage() {
  const [walletBalance, setWalletBalance] = useState("12.345 ICP"); // Placeholder balance
  const [selectedWallet, setSelectedWallet] = useState("plug"); // Default wallet selection

  // Calculate total price for multiple products
  const totalProductCost = transactionData.products?.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Convert total cost to ICP (Assume 1 ICP = 60,000 IDR)
  const icpPrice = 60000;
  const amountToPayICP =
    transactionData.transactionType === "doctor"
      ? (transactionData.doctor.consultationFee / icpPrice).toFixed(3)
      : (totalProductCost / icpPrice).toFixed(3);

  const networkFeeICP = 0.005;
  const totalICP = (parseFloat(amountToPayICP) + networkFeeICP).toFixed(3);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow py-12">
        <div className="container grid gap-10 lg:grid-cols-[1fr_400px] w-full max-w-5xl">
          {/* Left Section - ICP Payment Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-center">ICP Blockchain Payment</h2>

            {/* Wallet Balance */}
            <section className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium">Current Wallet Balance</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{walletBalance}</p>
              <p className="text-sm text-gray-500">Available ICP in your connected wallet</p>
            </section>

            {/* Select ICP Wallet */}
            <section className="bg-white shadow-md rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-medium text-center">Select Wallet</h3>
              <RadioGroup defaultValue="plug" onValueChange={setSelectedWallet}>
                {[
                  { label: 'Plug Wallet', value: 'plug', icon: '/crypto-icons/plug.png' },
                  { label: 'Stoic Wallet', value: 'stoic', icon: '/crypto-icons/stoic.png' },
                  { label: 'Internet Identity', value: 'ii', icon: '/crypto-icons/ii.png' },
                ].map(({ label, value, icon }) => (
                  <div key={value} className="flex items-center justify-between border rounded-lg p-4 hover:bg-primary/10 transition">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={value} id={value} className="checked:bg-primary" />
                      <img src={icon} alt={label} className="w-6 h-6" />
                      <label htmlFor={value} className="text-gray-900">{label}</label>
                    </div>
                    <MoreHorizontal className="h-6 w-6 text-gray-400" />
                  </div>
                ))}
              </RadioGroup>
            </section>
          </div>

          {/* Right Section - Transaction Summary */}
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-center">
                  {transactionData.transactionType === "doctor" ? "Doctor Service" : "Product Purchase"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transactionData.transactionType === "doctor" ? (
                  <div className="flex gap-4 items-center">
                    <img src={transactionData.doctor.image} alt={transactionData.doctor.name} className="w-16 h-16 rounded-full" />
                    <div className="flex-1">
                      <h3 className="font-medium">{transactionData.doctor.name}</h3>
                      <p className="text-sm text-gray-500">{transactionData.doctor.specialty}</p>
                    </div>
                  </div>
                ) : (
                  transactionData.products.map((product, index) => (
                    <div key={index} className="flex gap-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                      </div>
                    </div>
                  ))
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Amount to Pay</span>
                    <span>{amountToPayICP} ICP</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Network Fee</span>
                    <span>{networkFeeICP} ICP</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{totalICP} ICP</span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold text-lg">
                  Confirm & Pay
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span>Secure blockchain transaction</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
