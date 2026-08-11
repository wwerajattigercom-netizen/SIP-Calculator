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
  const [localValue, setLocalValue] = useState(value);
  const [inputValue, setInputValue] = useState(value.toString());
  const trackRef   = useRef(null);
  const isDragging = useRef(false);

  // Resolve whichever alias was passed
  const displayFn = formatFn || formatValue;

  // Sync input box when external value changes
  useEffect(() => {
    if (!isDragging.current) {
      setLocalValue(value);
      setInputValue(value.toString());
    }
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
    if (!rect) return localValue;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return clamp(min + ratio * (max - min));
  }, [clamp, min, max, localValue]);

  // ── Pointer events on the track wrapper ──────────────────────────
  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    trackRef.current?.setPointerCapture(e.pointerId);
    const v = pixelToValue(e.clientX);
    setLocalValue(v);
    setInputValue(v.toString());
  }, [pixelToValue]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const v = pixelToValue(e.clientX);
    setLocalValue(v);
    setInputValue(v.toString());
  }, [pixelToValue]);

  const handlePointerUp = useCallback((e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const v = pixelToValue(e.clientX);
    setLocalValue(v);
    setInputValue(v.toString());
    onChange(v);
  }, [pixelToValue, onChange]);

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

  const percentage = ((localValue - min) / (max - min)) * 100;

  // The formatted human-readable label (e.g. "₹10.00 L", "12%", "10 Yr")
  // shown below the input box. Falls back to the ₹ short-word hint if no
  // formatFn is given but prefix is ₹.
  const formattedLabel = displayFn
    ? displayFn(localValue)
    : prefix === '₹'
      ? formatToShortWords(localValue)
      : null;

  return (
    <div className="mb-4 w-full">
      {/* Label + number box */}
      <div className="flex justify-between items-center mb-1">
        <label className="text-gray-600 dark:text-gray-400 font-medium">{label}</label>
        <div className="flex items-center glass-panel px-3 py-1 bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 rounded-lg focus-within:border-[var(--color-accent)] transition-all">
          {prefix && <span className="text-gray-500 dark:text-gray-400 mr-1">{prefix}</span>}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-20 bg-transparent text-right text-foreground font-bold outline-none"
          />
          {suffix && <span className="text-gray-500 dark:text-gray-400 ml-1">{suffix}</span>}
        </div>
      </div>

      {/* Human-readable formatted value shown below */}
      {formattedLabel && (
        <div className="flex justify-end mb-2">
          <span className="text-[11px] text-[var(--color-accent)] font-semibold tracking-wide">
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
        aria-valuenow={localValue}
      >
        {/* Background track */}
        <div className="relative w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
          {/* Filled portion */}
          <div
            className="absolute top-0 left-0 h-full bg-[var(--color-accent)] rounded-full pointer-events-none"
            style={{ width: `${percentage}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[var(--color-accent)] rounded-full pointer-events-none shadow-[0_2px_4px_rgba(27,58,92,0.3)] dark:shadow-none transition-shadow"
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
