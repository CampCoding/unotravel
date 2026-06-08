"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function CustomSelect({ 
  placeholder = "Select...", 
  options = [], 
  setSelected, 
  selected 
}) {
  const [open, setOpen] = useState(false);

  // Find the currently selected option's label to display it on the trigger button
  const selectedOption = options.find(item => item.value === selected);

  return (
    <Popover open={open} className="w-full!" onOpenChange={setOpen}>
      {/* 1. Removed invalid 'render' prop and 'className="w-full!"' from PopoverTrigger */}
      <PopoverTrigger className="w-full!" asChild>
        <Button variant="outline" className="w-full flex  h-10 px-4 py-1 rounded-[4px]! text-(--main-dark-color) text-base justify-between items-center">
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronsUpDown className="ml-2 h-6! w-6! shrink-0 font-semibold text-(--main-light-color)" />
        </Button>
      </PopoverTrigger>
      
      {/* 2. Matched popover width to the trigger button using Tailwind */}
      <PopoverContent className="w-full p-1 max-h-60 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {options.length === 0 ? (
            <p className="p-2 text-sm text-muted-foreground text-center">No options available</p>
          ) : (
            options.map((item) => (
              <button
                key={item?.value}
                type="button"
                className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => {
                  setSelected(item?.value);
                  setOpen(false); // 3. Automatically close dropdown on selection
                }}
              >
                {item?.label}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}