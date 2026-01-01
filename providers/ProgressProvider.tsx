"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ProgressContextType = {
  value: number;
  showProgress: boolean;
  start: () => void;
  set: (value: number) => void;
  finish: () => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const start = () => {
    setValue(20);
    setShowProgress(true);
  };

  const set = (value: number) => {
    setValue(value);
    setShowProgress(true);
  };

  const finish = () => {
    setValue(100);
    setTimeout(() => {
      setShowProgress(false);
      setValue(0);
    }, 300);
  };

  const reset = () => {
    setValue(0);
    setShowProgress(false);
  };

  return (
    <ProgressContext.Provider
      value={{ value, showProgress, start, set, finish, reset }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
}
