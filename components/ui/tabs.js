import React, { useState, createContext, useContext } from "react";

const TabsContext = createContext({ value: "", setValue: () => {} });

export function Tabs({ defaultValue, onValueChange, className = "", children }) {
  const [value, setValue] = useState(defaultValue);
  const handleSet = (v) => {
    setValue(v);
    onValueChange && onValueChange(v);
  };
  return (
    <TabsContext.Provider value={{ value, setValue: handleSet }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, className = "", children }) {
  const { value: active, setValue } = useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      className={`px-3 py-2 text-sm rounded-md transition-colors data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 ${className}`}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => setValue(value)}
      type="button"
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = "", children }) {
  const { value: active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div className={className}>{children}</div>;
}

export default Tabs;

