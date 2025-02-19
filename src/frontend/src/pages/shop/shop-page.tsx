import React, { useEffect, useState } from 'react';
import Navbar from '../../components/partials/navbar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';

interface Category {
  name: string;
  image: string;
  subcategories: string[];
}

export default function ShopPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  //TODO
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/public/temp_db/categories.json');

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const midIndex = Math.ceil(categories.length / 2);
  const leftCategories = categories.slice(0, midIndex);
  const rightCategories = categories.slice(midIndex);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Obat &amp; Perawatan</h1>

        {/* Grid Layout for Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {leftCategories.map((category, index) => (
              <div key={index} className="mb-6">
                {/* Category Title with Avatar */}
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar>
                    <AvatarImage src={category.image} />
                    <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                </div>

              {/* Subcategory 2 column */}
              <div className="grid grid-cols-2 gap-4">
                {category.subcategories.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View with Accordion */}
        <div className="lg:hidden">
          <Accordion type="single" collapsible>
            {categories.map((category, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={category.image} />
                    <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{category.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
}
