'use client';

import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface SidebarProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export default function MedicineSidebar({
  onCategorySelect,
  selectedCategory,
}: SidebarProps) {
  const [isNutrisiOpen, setIsNutrisiOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const categories = {
    all: 'All',
    medicine: 'Medicine',
    nutritionSupplement: {
      main: 'Nutrition & Supplement',
      sub: ['Supplement', 'Nutrition & Detox'],
    },
    supportingTools: 'Supporting Tools',
  };

  return (
    <div>
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="items-center gap-2"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-10 h-10 bg-transparent" />
          )}
        </button>
      </div>

      {/* Sidebar Content - Hidden on Mobile unless open */}
      <div
        className={cn(
          'z-10 top-0 left-0 w-1/2 fixed bg-background shadow-lg transition-transform duration-300 md:relative md:block md:w-full',
          isSidebarOpen
            ? 'translate-x-0 min-h-screen'
            : '-translate-x-full md:translate-x-0 hidden',
        )}
      >
        <div className="rounded-lg border border-color-3 font-poppins p-4">
          {isSidebarOpen ? (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center gap-2 ml-auto"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6 text-color-2" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          ) : null}

          <div className="divide-y divide-color-3 text-color-2">
            <button
              onClick={() => onCategorySelect(categories.all)}
              className={cn(
                'w-full p-4 text-left hover:bg-color-3/20 transition-colors',
                selectedCategory === categories.all &&
                  'text-primary font-medium',
              )}
            >
              {categories.all}
            </button>

            <button
              onClick={() => onCategorySelect(categories.medicine)}
              className={cn(
                'w-full p-4 text-left hover:bg-color-3/20 transition-colors',
                selectedCategory === categories.medicine &&
                  'text-primary font-medium',
              )}
            >
              {categories.medicine}
            </button>

            <div>
              <button
                onClick={() => setIsNutrisiOpen(!isNutrisiOpen)}
                className="text-start w-full p-4 flex justify-between items-center hover:bg-color-3/20 transition-colors"
              >
                <span
                  className={cn(
                    (selectedCategory.includes('Nutrition') ||
                      selectedCategory.includes('Supplement')) &&
                      'text-primary font-medium',
                  )}
                >
                  {categories.nutritionSupplement.main}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isNutrisiOpen && 'rotate-180',
                  )}
                />
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  isNutrisiOpen ? 'max-h-40' : 'max-h-0',
                )}
              >
                {categories.nutritionSupplement.sub.map((item) => (
                  <button
                    key={item}
                    onClick={() => onCategorySelect(item)}
                    className={cn(
                      'w-full p-4 pl-8 text-left hover:bg-color-3/20 transition-colors',
                      selectedCategory === item && 'text-primary font-medium',
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onCategorySelect(categories.supportingTools)}
              className={cn(
                'w-full p-4 text-left hover:bg-color-3/20 transition-colors',
                selectedCategory === categories.supportingTools &&
                  'text-primary font-medium',
              )}
            >
              {categories.supportingTools}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
