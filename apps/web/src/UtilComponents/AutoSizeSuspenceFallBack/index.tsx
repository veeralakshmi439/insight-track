import { Box, BoxProps, Center } from "@chakra-ui/react";
import React, { Suspense, useEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const DefaultFallback = (props: BoxProps) => {
  return (
    <Box bg={"white"} {...props}>
      <Center>Loading....</Center>
    </Box>
  );
};

const SuspenseWithAutoSizeFallback = ({
  fallback,
  children,
}: {
  fallback?: any,
  children?: any
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const Fallback = fallback || DefaultFallback;

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
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
