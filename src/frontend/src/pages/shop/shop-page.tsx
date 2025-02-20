import React, { useEffect, useState } from 'react';
import Navbar from '../../components/partials/navbar/navbar';
import Footer from '../../components/partials/footer/footer';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';

interface Category {
  name: string;
  image: string;
  subcategories: string[];
}

export default function ShopPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // TODO: Fetch categories from API later
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/public/temp_db/categories.json');
        if (!response.ok) throw new Error('Failed to fetch categories');

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Obat &amp; Perawatan</h1>

        {/* Desktop View */}
        {/* TODO fix card g */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="relative p-4 border rounded-xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index ? (
                <CardContent className="h-full flex flex-col items-center justify-center">
                  <div className="flex flex-col text-center space-y-1 opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {category.subcategories.map((sub, subIndex) => (
                      <div key={subIndex} className="w-full">
                        <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                          {sub}
                        </span>
                        {subIndex !== category.subcategories.length - 1 && (
                          <Separator className="my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              ) : (
                // Default view (Avatar + Category Name)
                <CardHeader className="flex flex-col items-center transition-all duration-300 ease-in-out">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={category.image} />
                    <AvatarFallback className="text-xl">
                      {category.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-semibold mt-3">
                    {category.name}
                  </h2>
                </CardHeader>
              )}
            </Card>
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          <Accordion type="single" collapsible>
            {categories.map((category, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="flex items-center space-x-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={category.image} />
                    <AvatarFallback className="text-lg">
                      {category.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{category.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1">
                    {category.subcategories.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
}
