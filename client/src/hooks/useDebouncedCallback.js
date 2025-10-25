

//create a custom debounce hook  to avoid  multiple repeating  requests
import { useCallback, useEffect, useRef } from "react";


export default function useDebouncedCallback(callback, delay = 500) {
  const timeoutRef = useRef(null);
  const cbRef = useRef(callback);

  // always take the actual callback
  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  const debounced = useCallback((...args) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      cbRef.current(...args);
    }, delay);
  }, [delay]);

  // clear the timer in unmount
  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  return debounced;
}
