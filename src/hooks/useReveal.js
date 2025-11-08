import { useEffect, useRef } from "react";

/**
 * Hook to reveal elements with a fade/translate animation when they enter the viewport.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.1] IntersectionObserver threshold.
 * @param {string} [options.rootMargin="0px 0px -10% 0px"] Observer root margin.
 * @param {boolean} [options.once=true] Whether to animate only the first time it appears.
 * @param {boolean} [options.reset=false] Whether to reset animation when leaving viewport.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -10% 0px",
    once = true,
    reset = false
  } = options;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (reset) {
          entry.target.classList.remove("is-visible");
        }
      });
    }, { threshold, rootMargin });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, reset]);

  return ref;
}
