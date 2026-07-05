import React from 'react';

export default function Card({ title, description, children }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200/80 shadow-md shadow-gray-100/50 flex flex-col gap-5 h-full w-full">
      {(title || description) && (
        <div className="flex flex-col gap-1.5 border-b border-gray-100 pb-4">
          {title && <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>}
          {description && <p className="text-sm text-gray-500 leading-relaxed">{description}</p>}
        </div>
      )}
      <div className="flex-1 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}