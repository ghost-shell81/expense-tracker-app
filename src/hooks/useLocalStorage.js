import { useCallback, useEffect, useState } from "react";

const hasLocalStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

function readValue(key, initialValue) {
  if (!hasLocalStorage()) {
    return typeof initialValue === "function" ? initialValue() : initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }

    return JSON.parse(item);
  } catch (err) {
    console.warn(`useLocalStorage: read error for key "${key}":`, err);
    return typeof initialValue === "function" ? initialValue() : initialValue;
  }
}

export default function useLocalStorage(key, initialValue, options = {}) {
  const [state, setState] = useState(() => readValue(key, initialValue));

  useEffect(() => {
    if (!hasLocalStorage()) return;
    try {
      const serialized = JSON.stringify(state);
      window.localStorage.setItem(key, serialized);
    } catch (err) {
      // detect quota errors and surface via options.onError if provided
      const isQuotaError =
        err &&
        (err.name === "QuotaExceededError" ||
          err.code === 22 ||
          err.code === 1014);
      if (isQuotaError && typeof options.onError === "function") {
        options.onError(err);
      } else {
        // eslint-disable-next-line no-console
        console.warn(`useLocalStorage: write error for key "${key}":`, err);
      }
    }
  }, [key, state, options]);

  // Respond to storage events (cross-tab sync)
  useEffect(() => {
    if (!hasLocalStorage()) return undefined;

    function handleStorage(e) {
      if (!e) return;
      if (e.key !== key) return;
      try {
        const newValue = e.newValue == null ? null : JSON.parse(e.newValue);
        setState(newValue);
      } catch (err) {
        // parse error: ignore and keep current state
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  const setValue = useCallback(
    (val) => {
      try {
        const valueToStore = typeof val === "function" ? val(state) : val;
        setState(valueToStore);
        if (hasLocalStorage()) {
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (err) {
            const isQuotaError =
              err &&
              (err.name === "QuotaExceededError" ||
                err.code === 22 ||
                err.code === 1014);
            if (isQuotaError && typeof options.onError === "function") {
              options.onError(err);
            } else {
              // eslint-disable-next-line no-console
              console.warn(`useLocalStorage: set error for key "${key}":`, err);
            }
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`useLocalStorage: set error for key "${key}":`, err);
      }
    },
    [key, state]
  );

  return [state, setValue];
}
