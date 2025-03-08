import React, { ReactNode, useEffect, useRef, useState } from "react";

interface AspectFillProps {
  children: ReactNode;
  childWidth: number;
  childHeight: number;
  style?: React.CSSProperties;
}

/**
 * AspectFill component that scales a child component to fill the available space
 * while maintaining its aspect ratio.
 * 
 * @param children - The child component to be displayed
 * @param childWidth - The intrinsic width of the child content
 * @param childHeight - The intrinsic height of the child content
 * @param style - Optional CSS styles to apply to the container
 */
const AspectFill: React.FC<AspectFillProps> = ({
  children,
  childWidth,
  childHeight,
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const updateScale = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    const newContainerWidth = containerRect.width;
    const newContainerHeight = containerRect.height;
    
    // Only update if dimensions have changed
    if (newContainerWidth !== containerWidth || newContainerHeight !== containerHeight) {
      setContainerWidth(newContainerWidth);
      setContainerHeight(newContainerHeight);
      
      // Calculate scale factors for width and height
      const widthScale = newContainerWidth / childWidth;
      const heightScale = newContainerHeight / childHeight;
      
      // Use the larger scale to ensure the content fills the container
      const newScale = Math.max(widthScale, heightScale);
      setScale(newScale);
    }
  };

  useEffect(() => {
    // Initial scale calculation
    updateScale();
    
    // Set up resize observer for more precise container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    // Also listen to window resize events as a fallback
    window.addEventListener("resize", updateScale);
    
    return () => {
      // Clean up
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [childWidth, childHeight]);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          width: childWidth,
          height: childHeight,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AspectFill;