'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
    <div className="rounded-lg border border-gray-200">
      <button
        onClick={() => onCategorySelect(categories.weightManagement)}
        className={cn(
          'w-full bg-gray-50 p-4 font-medium text-left hover:bg-gray-100 transition-colors',
          selectedCategory === categories.weightManagement && 'text-blue-600',
        )}
      >
        {categories.weightManagement}
      </button>
      <div className="divide-y divide-gray-200">
        <button
          onClick={() => onCategorySelect(categories.obat)}
          className={cn(
            'w-full p-4 text-left hover:bg-gray-50 transition-colors',
            selectedCategory === categories.obat && 'text-blue-600 font-medium',
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
                isNutrisiOpen && 'transform rotate-180',
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
  );
}
