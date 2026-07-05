import React from 'react';

export default function Button({ text, onClick, type = "button", variant = "primary", disabled = false }) {
  let s = "w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2 ";

  if (disabled) {
    s += "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border-transparent";
  } else if (variant === "primary") {
    s += "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-200";
  } else {
    s += "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 shadow-sm";
  }

  return (
    <button type={type} onClick={onClick} className={s} disabled={disabled}>
      {text}
    </button>
  );
}