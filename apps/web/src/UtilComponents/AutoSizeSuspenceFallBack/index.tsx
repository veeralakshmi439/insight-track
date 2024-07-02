import { Box, BoxProps, Center } from "@chakra-ui/react";
import React, { Suspense, useEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const DefaultFallback = (props: BoxProps) => {
  return (
    <Box bg={"white"} {...props}>
      <Center height={"100%"}>Loading....</Center>
    </Box>
  );
};

const SuspenseWithAutoSizeFallback = ({
  fallback,
  children,
  initialWidth,
  initialHeight
}: {
  fallback?: any,
  children?: any,
  initialWidth?: string,
  initialHeight?: string
}) => {
  const containerRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight });
  const Fallback = fallback || DefaultFallback;

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: `${containerRef.current?.offsetWidth}px`,
          height: `${containerRef.current?.offsetHeight}px`,
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => updateSize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <Suspense
        fallback={<Fallback w={dimensions.width} h={dimensions.height} />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default SuspenseWithAutoSizeFallback;
