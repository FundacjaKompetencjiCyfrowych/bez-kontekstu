import { cn } from "@/app/lib/utils";
import React from "react";

type ToggleProps = {
  option1: string;
  option2: string;
  onChange: (value: string) => void;
  value: string;
};

export function Toggle({ option1, option2, onChange, value }: ToggleProps) {
  const handleToggle = () => {
    onChange(value === option1 ? option2 : option1);
  };

  return (
    <div className="flex items-center gap-3 text-base font-space-mono ">
      <span className={cn("transition-colors", value === option1 ? "text-white" : "text-muted")}>{option1.toUpperCase()}</span>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value === option2}
          onChange={handleToggle}
          className="sr-only peer"
          aria-label={`Switch to ${value === option1 ? option2 : option1}`}
        />
        <div className="relative w-13 h-7 bg-neutral-600 rounded-full flex items-center peer-focus:outline-none">
          <div
            className={cn(
              "w-5 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300 transform",
              value === option2 ? "translate-x-7" : "translate-x-1"
            )}
          ></div>
        </div>
      </label>

      <span className={cn("transition-colors", value === option2 ? "text-white" : "text-muted")}>{option2.toUpperCase()}</span>
    </div>
  );
}
