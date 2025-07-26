// src/components/ui/tabs.jsx
import React from "react";

export function Tabs({ value, setValue, children }) {
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "TabsList") {
          return React.cloneElement(child, { value, setValue });
        }
        if (child.type.displayName === "TabsContent") {
          return React.cloneElement(child, { activeValue: value });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, value, setValue }) {
  return (
    <div className="flex border-b mb-4 space-x-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeValue: value, setValue })
      )}
    </div>
  );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ value: tabValue, activeValue, setValue, children }) {
  const isActive = activeValue === tabValue;
  const handleClick = () => {
    if (typeof setValue === "function") {
      setValue(tabValue);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`pb-2 px-4 border-b-2 transition-colors duration-200 ease-in-out focus:outline-none ${
        isActive
          ? "border-purple-600 text-purple-700 font-semibold"
          : "border-transparent text-gray-600 hover:text-purple-600"
      }`}
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ value, activeValue, children }) {
  if (activeValue !== value) return null;
  return <div className="mt-4" data-tab-value={value}>{children}</div>;
}
TabsContent.displayName = "TabsContent";
