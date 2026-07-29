"use client";

import React, { useState, useEffect } from 'react';
import { formatToShortWords } from '../utils/formatters';

export default function InputSlider({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step = 1, 
  prefix = "", 
  suffix = "" 
}) {
  const [inputValue, setInputValue] = useState(value.toString());

  // Sync internal input state when external value changes (e.g. from default load)
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setInputValue(val.toString());
    onChange(val);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const num = Number(e.target.value);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
    }
  };

  const handleInputBlur = () => {
    let num = Number(inputValue);
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;
    setInputValue(num.toString());
    onChange(num);
  };

  // Calculate percentage for the slider thumb background fill
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-7 w-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">{label}</label>
          {prefix === '₹' && (
            <span className="text-[11px] text-[#a78bfa] font-medium mt-0.5 tracking-wide">
              {formatToShortWords(value)}
            </span>
          )}
        </div>
        <div className="flex items-center glass-panel px-3 py-1 bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] rounded-lg focus-within:border-[#8b5cf6] transition-all">
          {prefix && <span className="text-gray-400 mr-1">{prefix}</span>}
          <input 
            type="text" 
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-20 bg-transparent text-right text-white font-bold outline-none"
          />
          {suffix && <span className="text-gray-400 ml-1">{suffix}</span>}
        </div>
      </div>
      <div className="relative w-full h-1 bg-gray-700 rounded-full">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full pointer-events-none"
          style={{ width: `${percentage}%` }}
        ></div>
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value} 
          onChange={handleSliderChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {/* Custom thumb to appear over the invisible actual range input */}
        <div 
          className="absolute top-1/2 -mt-2.5 -ml-2.5 w-5 h-5 bg-white border-2 border-[#8b5cf6] rounded-full pointer-events-none shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-transform"
          style={{ left: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
