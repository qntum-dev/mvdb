"use client";

import { useEffect, useRef } from "react";

interface SliderProps<T> {
  gap: string;
  elements: T[];
}

const Slider = <T,>({ gap, elements }: SliderProps<T>) => {
  const scrubberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sliderContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrubber = scrubberRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    const sliderContent = sliderContentRef.current;

    if (!scrubber || !container || !track || !sliderContent) return;

    let isDragging = false;
    let startX = 0;
    let initialLeft = 0;

    const preventDragStart = (e: DragEvent): void => {
      e.preventDefault();
    };

    const handleMouseDown = (e: MouseEvent): void => {
      isDragging = true;
      startX = e.clientX;
      initialLeft = scrubber.offsetLeft;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      let newLeft = initialLeft + deltaX;
      const maxScrubberLeft = container.offsetWidth - scrubber.offsetWidth;
      newLeft = Math.max(0, Math.min(newLeft, maxScrubberLeft));
      scrubber.style.left = `${newLeft}px`;
      const progress = newLeft / maxScrubberLeft;
      const maxScrollLeft = track.scrollWidth - sliderContent.clientWidth;
      sliderContent.scrollLeft = progress * maxScrollLeft;
    };

    const handleMouseUp = (): void => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleScroll = (): void => {
      const maxScrollLeft = track.scrollWidth - sliderContent.clientWidth;
      const progress = sliderContent.scrollLeft / maxScrollLeft;
      const maxScrubberLeft = container.offsetWidth - scrubber.offsetWidth;
      scrubber.style.left = `${progress * maxScrubberLeft}px`;
    };

    scrubber.addEventListener("dragstart", preventDragStart as EventListener);
    scrubber.addEventListener("mousedown", handleMouseDown as EventListener);
    sliderContent.addEventListener("scroll", handleScroll);

    return () => {
      scrubber.removeEventListener("dragstart", preventDragStart as EventListener);
      scrubber.removeEventListener("mousedown", handleMouseDown as EventListener);
      sliderContent.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div>
      <div className="mb-8 w-full overflow-x-auto no-scrollbar " ref={sliderContentRef}>
        <div className={`flex gap-${gap} w-full`} ref={trackRef}>
          {elements.map((element, index) => (
            <div key={index}>
              {element as React.ReactNode}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="relative" ref={containerRef}>
          <div className="absolute h-[0.8px] bg-red-600 w-full z-10 top-[50%] -translate-y-[50%]" />
          <div
            className="h-[8px] w-[100px] bg-white relative z-20 cursor-pointer rounded-sm"
            ref={scrubberRef}
            style={{ position: "relative", left: "0px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
