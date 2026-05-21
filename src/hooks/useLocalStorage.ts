import { useState, useEffect } from "react";
import { parseISO } from "date-fns";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return JSON.parse(item, dateReviver);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

function dateReviver(_key: string, value: unknown) {
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)
  ) {
    return parseISO(value);
  }
  return value;
}
