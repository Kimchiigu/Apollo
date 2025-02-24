'use client';

import { ShoppingCart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';

const purchasedMedicines = [
  { id: 1, name: 'Paracetamol', quantity: 2, price: 5.99 },
  { id: 2, name: 'Vitamin C', quantity: 1, price: 12.99 },
  { id: 3, name: 'Ibuprofen', quantity: 1, price: 7.49 },
];

export default function Receipt() {
  return (
    <>
      {/* Purchased Medicines */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Purchased Medicines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {purchasedMedicines.map((medicine) => (
                  <tr key={medicine.id} className="border-b">
                    <td className="px-4 py-2">{medicine.name}</td>
                    <td className="px-4 py-2">{medicine.quantity}</td>
                    <td className="px-4 py-2">${medicine.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="px-4 py-2 font-bold" colSpan={2}>
                    Total
                  </td>
                  <td className="px-4 py-2 font-bold">
                    $
                    {purchasedMedicines
                      .reduce(
                        (total, medicine) =>
                          total + medicine.price * medicine.quantity,
                        0,
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
