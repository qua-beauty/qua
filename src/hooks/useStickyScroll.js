import {useState, useEffect, useRef} from 'react';

export function useStickyScroll(ref) {
  const [isStickyScrolled, setIsStickyScrolled] = useState(false);
  const intersectionObserverRef = useRef(null);

  useEffect(() => {
    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        console.log(isStickyScrolled);
        entries.forEach((entry) => {
          console.log(isStickyScrolled);

          if (entry.isIntersecting < 1) {
            setIsStickyScrolled(true);
          } else {
            setIsStickyScrolled(false);
          }
        });
      },
      { threshold: [1] }
    );

    if (ref.current) {
      intersectionObserverRef.current.observe(ref.current);
    }

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [ref]);

  return isStickyScrolled;
}
