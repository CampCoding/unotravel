"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../../ui/checkbox";

export default function CustomCheckbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  className,
  labelClassName,
  id,
  name,
}) {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  return (
    <div
      className={cn(
        "flex items-center gap-[9px] select-none",
        disabled && "opacity-60",
        className
      )}
    >
      <Checkbox
        type="button"
        id={checkboxId}
        name={name}
        checked={!!checked}
        onCheckedChange={(checkedState) => {
          onChange?.(checkedState === true);
        }}
        disabled={disabled}
        className={cn(
          "h-[17px] w-[17px] shrink-0 rounded-[4px] border border-(--main-light-color) bg-white p-0 outline-none transition-colors",
          "focus-visible:ring-1 focus-visible:ring-[#2C5596]",
          "data-[state=checked]:border-[#2C5596]",
          "data-[state=checked]:bg-[#2C5596]",
          "data-[state=checked]:text-white",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />

      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            "block cursor-pointer text-[14px] font-semibold leading-[17px] text-[#34405E]",
            disabled && "cursor-not-allowed",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}