import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {

  const [storedValue, setStoredValue] = useState(() => {
    try {
const item = window.localStorage.getItem(key);
return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error('Error reading from localStorage:', err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error('Error Writing to localStorage:', err);
    }
  }, [key, storedValue]);
  return [storedValue, setStoredValue]
};

export default useLocalStorage;