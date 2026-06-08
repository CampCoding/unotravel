import React from "react";
import { RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";

export default function CustomRadio({
  label,
  value,
  name,
  className,
  labelClassName,
}) {
  const id = `${name}-${value}`;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <RadioGroupItem
        value={value}
        id={id}
        className="border-(--main-light-color) data-[state=checked]:border-[#2C5596] data-[state=checked]:text-[#2C5596]"
      />

      <Label
        htmlFor={id}
        className={cn(
          "cursor-pointer select-none text-[14px] font-normal text-(--main-dark-color)",
          labelClassName
        )}
      >
        {label}
      </Label>
    </div>
  );
}