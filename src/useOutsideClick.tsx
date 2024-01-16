/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export default function useOutsideClick(ref: any, action: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, action]);
}
