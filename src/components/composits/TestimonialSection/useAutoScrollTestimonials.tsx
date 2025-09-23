import { useCallback, useEffect, useRef, useState } from "react";

const STEP_DELAY = 3000; // ms between scrolls
const RESET_DELAY = 1500; // wait before bouncing back

export function useAutoScrollTestimonials({
  reverse = false,
  step_delay = STEP_DELAY,
  reset_delay = RESET_DELAY,
}: {
  reverse?: boolean;
  reset_delay?: number;
  step_delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const currentIndexRef = useRef(0); // TODO: find mid of array?
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }, // 20% visible = "in view"
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isInView) {
      const firstChild = container.children[0] as HTMLElement;
      const childWidth = firstChild?.offsetWidth || 300; // fallback if unknown
      const containerStyle = window.getComputedStyle(container);
      const containerPaddingLeft = parseFloat(containerStyle.paddingLeft);

      container.scrollLeft = parseFloat(containerStyle.width) / 2;

      const scrollStep = (
        container: HTMLElement,
        childWidth: number,
        containerPaddingLeft: number,
        direction: "left" | "right",
      ) => {
        if (!container) return;
        const currentIndex = currentIndexRef.current;

        const containerGap = 2 * 4;
        const stepSize =
          childWidth + containerPaddingLeft + currentIndex * containerGap;
        const scrollOffset = reverse ? -stepSize / 2 : stepSize / 2;

        const maxScroll =
          container.scrollWidth - container.clientWidth + scrollOffset;

        const nextScrollLeft =
          direction === "right"
            ? container.scrollLeft + stepSize
            : container.scrollLeft - stepSize;
        const nextIndex =
          direction === "right" ? currentIndex + 1 : currentIndex - 1;
        currentIndexRef.current = nextIndex;
        container.scrollTo({
          left: nextScrollLeft,
          behavior: "smooth",
        });

        const isEnd = nextScrollLeft >= maxScroll;
        const isStart = nextScrollLeft <= 0;
        const resetOffset = reverse
          ? 0
          : direction === "right"
            ? -reset_delay / 2
            : reset_delay / 2;
        clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(
          () => {
            scrollStep(
              container,
              childWidth,
              containerPaddingLeft,
              isEnd ? "left" : isStart ? "right" : direction,
            );
          },
          isEnd || isStart ? reset_delay : step_delay + resetOffset,
        );
      };
      scrollStep(
        container,
        childWidth,
        containerPaddingLeft,
        reverse ? "left" : "right",
      );
    }

    return () => clearTimeout(intervalRef.current!);
  }, [isInView]);

  return containerRef;
}
