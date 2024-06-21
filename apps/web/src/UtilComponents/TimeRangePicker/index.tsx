import { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import {
  CalendarControls,
  CalendarDays,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarValues,
  CalendarWeek,
  Calendar,
  CalendarDate,
} from "@uselessdev/datepicker";

const TimeRangePicker = () => {
  const [dates, setDates] = useState<CalendarValues>({});

  const handleSelectDate = (dates: CalendarValues) => setDates(dates);

  const today = new Date();

  const addSevenDays = () =>
    setDates({
      start: today,
      end: today,
    });

  const subSevenDays = () =>
    setDates({
      start: today,
      end: today,
    });

  return (
    <Calendar
      value={dates}
      onSelectDate={function (value: CalendarValues | CalendarDate): void {
        throw new Error("Function not implemented.");
      }}
    >
      <Box position="relative">
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Box>

      <VStack
        spacing={4}
        bgColor="gray.50"
        p={4}
        alignItems="stretch"
        borderEndRadius="md"
        flex={1}
      >
        <Button onClick={addSevenDays} colorScheme="blue" size="xs">
          7 next days
        </Button>

        <Button onClick={subSevenDays} colorScheme="red" size="xs">
          7 prev days
        </Button>
      </VStack>
    </Calendar>
  );
};

export default TimeRangePicker;
