import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  NavigationDispatcherContext,
  NavigationStateContext,
} from "../NavigationContext";
import {
  ChakraProvider,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Image,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const metrics = [
  {
    label: "Largest Contentful Paint",
    abbreviation: "LCP",
    description: "(Loading)",
    value: 2.5,
    unit: "s",
    thresholds: { good: 2.5, needsImprovement: 4.0, poor: 6.0 },
  },
  {
    label: "Interaction to Next Paint",
    abbreviation: "INP",
    description: "(Interactivity)",
    value: 0.2,
    unit: "s",
    thresholds: { good: 0.2, needsImprovement: 0.5, poor: 1.0 },
  },
  {
    label: "Cumulative Layout Shift",
    abbreviation: "CLS",
    description: "(Visual Stability)",
    value: 0.1,
    unit: "",
    thresholds: { good: 0.1, needsImprovement: 0.25, poor: 0.5 },
  },
];

const screenshotUrl =
  "https://lh7-us.googleusercontent.com/Gckzlm3-qfXUZ9zOI1hylS6bt3XqT6vcg5omAK1G5gZEs-yH4NjFtA1I7bfUo3LPs7wSmbZ3bYRedSuG-t93-qCOipGr_XP39e7yiABLcQAKfKojzzC3Qub7LElghW194AMUDFwQ4oRrqqjF5DgFInM"; // Replace with your actual screenshot URL

export const DrawerRight = ({
  scanId,
  children,
}: {
  scanId: string;
  children: any;
}) => {
  const [searcParams, setSearchParams] = useSearchParams();
  return (
    <Box>
      <Drawer
        size={"xl"}
        isOpen={true}
        placement="right"
        onClose={() => {
          setSearchParams({});
        }}
        onOverlayClick={() => {
          setSearchParams({});
        }}
      >
        <DrawerOverlay />
        <DrawerContent w={"75%"} maxW={"75%"}>
          <DrawerCloseButton />
          <DrawerBody>{children}</DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const WebVitalMetric = ({
  label,
  abbreviation,
  description,
  value,
  unit,
  thresholds,
}) => {
  const getProgressColor = () => {
    if (value <= thresholds.good) return "green.400";
    if (value <= thresholds.needsImprovement) return "yellow.400";
    return "red.400";
  };

  return (
    <Box
      textAlign="center"
      m={4}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      width="300px"
      bg="white"
    >
      <Text fontSize="3xl" fontWeight="bold" color="blue.500">
        {abbreviation}
      </Text>
      <Text fontSize="lg" fontStyle="italic" color="gray.500">
        {description}
      </Text>
      <Stat mt={2}>
        <StatLabel>{label}</StatLabel>
        <StatNumber>
          {value}
          {unit}
        </StatNumber>
        <StatHelpText>Performance Metrics</StatHelpText>
      </Stat>
      <Flex justify="center" mt={4}>
        <Progress
          value={(value / thresholds.poor) * 100}
          size="sm"
          width="80%"
          colorScheme={getProgressColor()}
        />
      </Flex>
      <Flex justify="space-between" mt={2}>
        <Text fontSize="sm" color="green.600">
          GOOD
        </Text>
        <Text fontSize="sm" color="yellow.600">
          NEEDS IMPROVEMENT
        </Text>
        <Text fontSize="sm" color="red.600">
          POOR
        </Text>
      </Flex>
    </Box>
  );
};

const ScreenshotAndMetrics = ({ screenshotUrl, metrics }) => {
  return (
    <Box p={4} bg="white" rounded="md">
      <Flex direction="column" align="center">
        <Image
          src={screenshotUrl}
          alt="Screenshot"
          width="100%"
          height="auto"
          objectFit="contain"
          mb={4}
        />
        <Box height="400px" overflowY="scroll" width="100%">
          <Flex direction="row" wrap="wrap" justify="center">
            {metrics.map((metric) => (
              <WebVitalMetric
                key={metric.label}
                label={metric.label}
                abbreviation={metric.abbreviation}
                description={metric.description}
                value={metric.value}
                unit={metric.unit}
                thresholds={metric.thresholds}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const MultipleScreenshots = ({ screenshots = [] }) => (
  <Flex direction="column" align="center">
    {screenshots.map((url, index) => (
      <Image
        key={index}
        src={url}
        alt={`Screenshot ${index + 1}`}
        width="100%"
        height="auto"
        objectFit="contain"
        mb={4}
      />
    ))}
  </Flex>
);

const PerformanceTrace = () => (
  <Box p={4}>
    <Text>Performance Trace content goes here</Text>
  </Box>
);
