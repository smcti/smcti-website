'use client'

import { TrendingUp, Calendar } from 'lucide-react';
import AnimatedCounter from '@/components/common/AnimatedCounter'; // Importando o componente que criamos

const statsData = [
  { year: 2021, value: 150000, label: "Arrecadado em 2021" },
  { year: 2022, value: 320000, label: "Arrecadado em 2022" },
  { year: 2023, value: 500000, label: "Arrecadado em 2023" },
];

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
      {statsData.map((item, index) => (
        <div 
          key={item.year} 
          className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg animate-fade-up animate-once"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Calendar size={20} />
            <span className="font-semibold">{item.year}</span>
          </div>
          
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp size={32} />
            <span className="text-4xl font-bold">
              <AnimatedCounter 
                value={item.value} 
                prefix="R$ " 
                separator="."
              />
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mt-2">{item.label}</p>
        </div>
      ))}
    </div>
  );
}