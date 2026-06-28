"use client";
import React, { useState, useRef, useEffect } from "react";

/**
 * Input with inline suggestion dropdown.
 * Props:
 *   value, onChange, suggestions[], placeholder, className, disabled, type
 */
export default function SuggestionInput({
  value = "",
  onChange,
  suggestions = [],
  placeholder = "",
  className = "",
  disabled = false,
  type = "text",
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!value || !suggestions.length) { setFiltered([]); return; }
    const q = value.toLowerCase();
    setFiltered(suggestions.filter(s => s && s.toLowerCase().includes(q) && s !== value));
  }, [value, suggestions]);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pick = (s) => {
    onChange?.({ target: { value: s } });
    setOpen(false);
  };

  const showDropdown = open && filtered.length > 0 && !disabled;

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={(e) => { onChange?.(e); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        {...rest}
      />
      {showDropdown && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {filtered.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => pick(s)}
              className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 truncate"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
