'use client';

import { Flag, Lock, MoreHorizontal, User, Mail, Phone } from 'lucide-react';

import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Separator } from '../../components/ui/separator';

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10">
              <div className="h-full w-full rounded-full" />
            </div>
            <h1 className="text-xl font-semibold">Bumilangit Cell</h1>
          </div>
          <Flag className="h-6 w-6" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Payment Method</h2>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Customer Information</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="holder">Holder</Label>
                  <div className="relative">
                    <Input id="holder" defaultValue="Synthia Lubis" />
                    <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      defaultValue="synthia@synthwork.com"
                    />
                    <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+62 098 987 67"
                    />
                    <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Amount */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      Your total payment
                    </div>
                    <div className="text-3xl font-semibold">Rp 28,999,000</div>
                    <div className="text-sm text-muted-foreground">
                      Pay before March 13, at 10:25 PM
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Method</h3>
              <RadioGroup defaultValue="e-wallet">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="e-wallet" id="e-wallet" />
                      <Label htmlFor="e-wallet">E-Wallet</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-blue-500" />
                      <div className="h-8 w-8 rounded bg-blue-500" />
                      <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank">Bank Transfer</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-blue-500" />
                      <div className="h-8 w-8 rounded bg-blue-500" />
                      <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit Card</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-blue-500" />
                      <div className="h-8 w-8 rounded bg-blue-500" />
                      <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <CardTitle>Order ID</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      ID-GadgetPay-9912812
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DLJT6ZBBwCai0ngueo6iuY9owELNde.png"
                    alt=""
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex flex-1 justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">iPhone 15 Pro</h3>
                      <p className="text-sm text-muted-foreground">
                        iPhone 15 PRO, 512 Gold
                      </p>
                    </div>
                    <div className="text-right font-medium">Rp 29,999,000</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>iPhone 15 Pro</span>
                    <span>Rp 29,999,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span className="text-red-500">Rp -1,000,000</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>Rp 28,999,000</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Pay now
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  Payments are secure and encrypted
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
