"use client";

import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

const PriceRangeSlider = ({ min, max, step, defaultValue, onRangeChange }) => {
  const [range, setRange] = useState(defaultValue);

  const handleRangeChange = (newRange) => {
    setRange(newRange);
    if (onRangeChange) {
      onRangeChange(newRange);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={step}
        value={range}
        onValueChange={handleRangeChange}
      >
        <Slider.Track className="bg-slate-400 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-black rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-black shadow-lg rounded-full hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Minimum price"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-black shadow-lg rounded-full hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Maximum price"
        />
      </Slider.Root>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Min: {range[0]}</span>
        <span className="text-sm font-medium">Max: {range[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
