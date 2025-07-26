import React, { useState } from "react";

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);

  // Clone Trigger and pass toggle
  const trigger = React.Children.toArray(children).find(
    (child) => child.type.displayName === "SelectTrigger"
  );

  // Clone Content and pass onValueChange
  const content = React.Children.toArray(children).find(
    (child) => child.type.displayName === "SelectContent"
  );

  return (
    <div className="relative">
      {React.cloneElement(trigger, {
        onClick: () => setOpen(!open),
        value,
      })}

      {open &&
        React.cloneElement(content, {
          value,
          onValueChange: (val) => {
            onValueChange?.(val);
            setOpen(false);
          },
        })}
    </div>
  );
}
Select.displayName = "Select";

export function SelectTrigger({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white select-none"
    >
      {children}
    </div>
  );
}
SelectTrigger.displayName = "SelectTrigger";

export function SelectValue({ value, placeholder }) {
  return (
    <span className={value ? "text-gray-800" : "text-gray-500"}>
      {value || placeholder}
    </span>
  );
}
SelectValue.displayName = "SelectValue";

export function SelectContent({ children, onValueChange }) {
  return (
    <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-md z-10 w-full">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onValueChange })
      )}
    </div>
  );
}
SelectContent.displayName = "SelectContent";

export function SelectItem({ value, children, onValueChange }) {
  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer select-none"
      onClick={() => onValueChange?.(value)}
    >
      {children}
    </div>
  );
}
SelectItem.displayName = "SelectItem";
