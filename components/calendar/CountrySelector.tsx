// src/components/Calendar/CountrySelector.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CountryOption } from '@/types/eventSchema';

interface CountrySelectorProps {
  countries: CountryOption[];
  selectedCountry: string;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  onCountryChange: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountry,
  isDropdownOpen,
  setIsDropdownOpen,
  onCountryChange
}) => {
  const selectedCountryData = countries.find(c => c.value === selectedCountry);

  return (
    <div className="relative">
      <button 
        className="flex items-center bg-ai-dark/70 hover:bg-ai-dark/90 rounded-lg py-2 px-4 border border-gray-700 transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="mr-2 pl-2">{selectedCountryData?.flag}</span>
        <span>{selectedCountryData?.label}</span>
        <ChevronDown className="h-4 w-4 mr-2  text-gray-400" />
      </button>
      
      {isDropdownOpen && (
        <div className="absolute top-full mt-1 right-0 bg-gray-500 border border-gray-700 rounded-lg shadow-lg z-30 w-full">
          {countries.map((country) => (
            <button
              key={country.value}
              className="flex items-center w-full text-right py-2 px-4 hover:bg-gray-800 transition-colors"
              onClick={() => onCountryChange(country.value)}
            >
              <span className="mr-2 pl-2">{country.flag}</span>
              <span>{country.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;