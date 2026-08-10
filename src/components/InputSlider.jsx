"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { formatToShortWords } from '../utils/formatters';

export default function InputSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  // formatFn / formatValue: optional function(value) => string
  // When provided, shows a human-readable label (e.g. "₹10.00 L") below
  // the numeric input box. Supports both prop names for compatibility.
  formatFn,
  formatValue,
}) {
  const [inputValue, setInputValue] = useState(value.toString());
  const trackRef   = useRef(null);
  const isDragging = useRef(false);

  // Resolve whichever alias was passed
  const displayFn = formatFn || formatValue;

  // Sync input box when external value changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  // ── Clamp + snap to step ──────────────────────────────────────────
  const clamp = useCallback((raw) => {
    const clamped  = Math.max(min, Math.min(max, raw));
    const snapped  = Math.round((clamped - min) / step) * step + min;
    return Math.max(min, Math.min(max, parseFloat(snapped.toFixed(10))));
  }, [min, max, step]);

  // ── Convert pixel position → value ───────────────────────────────
  const pixelToValue = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return value;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return clamp(min + ratio * (max - min));
  }, [clamp, min, max, value]);

  // ── Pointer events on the track wrapper ──────────────────────────
  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    trackRef.current?.setPointerCapture(e.pointerId);
    const v = pixelToValue(e.clientX);
    setInputValue(v.toString());
    onChange(v);
  }, [pixelToValue, onChange]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const v = pixelToValue(e.clientX);
    setInputValue(v.toString());
    onChange(v);
  }, [pixelToValue, onChange]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // ── Text box handlers ─────────────────────────────────────────────
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const num = Number(e.target.value);
    if (!isNaN(num) && num >= min && num <= max) onChange(num);
  };

  const handleInputBlur = () => {
    const clamped = clamp(isNaN(Number(inputValue)) ? min : Number(inputValue));
    setInputValue(clamped.toString());
    onChange(clamped);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  // The formatted human-readable label (e.g. "₹10.00 L", "12%", "10 Yr")
  // shown below the input box. Falls back to the ₹ short-word hint if no
  // formatFn is given but prefix is ₹.
  const formattedLabel = displayFn
    ? displayFn(value)
    : prefix === '₹'
      ? formatToShortWords(value)
      : null;

  return (
    <div className="mb-7 w-full">
      {/* Label + number box */}
      <div className="flex justify-between items-center mb-1">
        <label className="text-gray-300 font-medium">{label}</label>
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

      {/* Human-readable formatted value shown below */}
      {formattedLabel && (
        <div className="flex justify-end mb-2">
          <span className="text-[11px] text-[#a78bfa] font-semibold tracking-wide">
            {formattedLabel}
          </span>
        </div>
      )}

      {/*
        ── SLIDER TRACK ──
        The wrapper is py-3 (24px total height) so the pointer-event
        capture zone is tall and forgiving — no more missed clicks.
        The visual track sits in the vertical centre via the inner div.
      */}
      <div
        ref={trackRef}
        className="relative w-full py-3 cursor-pointer select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        {/* Background track */}
        <div className="relative w-full h-1.5 bg-gray-700 rounded-full">
          {/* Filled portion */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full pointer-events-none"
            style={{ width: `${percentage}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-[#8b5cf6] rounded-full pointer-events-none shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-shadow"
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
