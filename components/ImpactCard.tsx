
import React from 'react';
import { ShieldCheckIcon } from '../constants';

interface ImpactCardProps {
  title: string;
  description: string;
}

export const ImpactCard: React.FC<ImpactCardProps> = ({ title, description }) => {
  const baseClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300 h-full flex flex-col";
  const borderClasses = "border-l-4 border-blue-500";
  const icon = <ShieldCheckIcon className="text-blue-500" />;

  return (
    <div className={`${baseClasses} ${borderClasses}`}>
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
};
