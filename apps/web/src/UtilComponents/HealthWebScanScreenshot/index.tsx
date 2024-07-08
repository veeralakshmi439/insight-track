import { BoxProps } from "@chakra-ui/react";

const HealthWebScanScreenShot = ({
  flowName,
  timestamp,
}: {
  flowName: string;
  timestamp: string;
} & BoxProps) => {
  return (
    <img
      src={`https://scanindex.blob.core.windows.net/screenshots/${flowName}-${timestamp}-screenshot.jpg`}
    />
  );
};

export default HealthWebScanScreenShot;
