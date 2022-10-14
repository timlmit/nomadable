import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useClickOutsideEffect = (ref: any, onClickOutside: () => void) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };
    // Bind the event listener
    document && document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document && document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
