'use client';

import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

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
    weightManagement: 'Weight Management',
    obat: 'Obat',
    nutrisiSuplemen: {
      main: 'Nutrisi & Suplemen',
      sub: ['Suplemen', 'Nutrisi & Detoks'],
    },
    alatPenunjang: 'Alat Penunjang',
  };

  return (
    <div>
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="items-center gap-2 text-blue-600"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-10 h-10" />
          )}
        </button>
      </div>

      {/* Sidebar Content - Hidden on Mobile unless open */}
      <div
        className={cn(
          'absolute z-10 top-0 left-0 w-1/2 min-h-screen bg-white shadow-lg transition-transform duration-300 md:relative md:block md:w-full',
          isSidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0 hidden',
        )}
      >
        <div className="rounded-lg border border-gray-200 font-poppins p-4">
          {isSidebarOpen ? (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center gap-2 text-blue-600 ml-auto"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          ) : null}

          <button
            onClick={() => onCategorySelect(categories.weightManagement)}
            className={cn(
              'w-full bg-gray-50 p-4 font-medium text-left hover:bg-gray-100 transition-colors',
              selectedCategory === categories.weightManagement &&
                'text-blue-600',
            )}
          >
            {categories.weightManagement}
          </button>
          <div className="divide-y divide-gray-200">
            <button
              onClick={() => onCategorySelect(categories.obat)}
              className={cn(
                'w-full p-4 text-left hover:bg-gray-50 transition-colors',
                selectedCategory === categories.obat &&
                  'text-blue-600 font-medium',
              )}
            >
              {categories.obat}
            </button>

            <div>
              <button
                onClick={() => setIsNutrisiOpen(!isNutrisiOpen)}
                className="text-start w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span
                  className={cn(
                    selectedCategory.includes('Nutrisi') &&
                      'text-blue-600 font-medium',
                  )}
                >
                  {categories.nutrisiSuplemen.main}
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
                {categories.nutrisiSuplemen.sub.map((item) => (
                  <button
                    key={item}
                    onClick={() => onCategorySelect(item)}
                    className={cn(
                      'w-full p-4 pl-8 text-left hover:bg-gray-50 transition-colors',
                      selectedCategory === item && 'text-blue-600 font-medium',
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onCategorySelect(categories.alatPenunjang)}
              className={cn(
                'w-full p-4 text-left hover:bg-gray-50 transition-colors',
                selectedCategory === categories.alatPenunjang &&
                  'text-blue-600 font-medium',
              )}
            >
              {categories.alatPenunjang}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
