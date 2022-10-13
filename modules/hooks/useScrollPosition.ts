import { useEffect, useState } from "react";

export const useScrolllPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0,
  });

  const onScroll = (e: any) => {
    console.log("🚀 ~ file: useScrollPosition.ts ~ line 10 ~ onScroll ~ e", e);
    setScrollPosition({ scrollY: window.scrollY, scrollX: window.scrollX });
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [null]);

  return [scrollPosition];
};
