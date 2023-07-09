import { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useAvailability } from '../../hooks/useAvailability';

const combineDateAndTime = (date, time) => {
  const timeParts = time.split(':');
  const timeHours = Number(timeParts[0]);
  const timeMinutes = Number(timeParts[1]);

  // Clone the date object to avoid mutating the original
  const combinedDate = new Date(date.getTime());
  combinedDate.setHours(timeHours, timeMinutes, 0, 0);

  return combinedDate;
};

const TimeSlotPicker = ({ onChange, shop, product }) => {
  const availableDates = useAvailability(shop.workTime, product.time);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    setSelectedDate(availableDates[0])
  }, [availableDates])

  const handleDateChange = (date) => (event) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (timeSlot) => {
    setSelectedTime(timeSlot);

    if (onChange) {
      const selectedDateTime = combineDateAndTime(selectedDate.date, timeSlot.time);
      onChange(selectedDateTime);
    }
  };

  return (
    selectedDate && (
      <Box>
        <FormControl>
          <FormLabel mb={'0'} color='text.secondary'>Choose Date</FormLabel>
          <Flex gap='8px' mt='8px'>
            {availableDates.map((date, index) => (
              <Button key={index} onClick={handleDateChange(date)} colorScheme='brand' variant={selectedDate.date === date.date ? 'solid' : 'outline'} w='54px' h='56px' flexDirection='column' isDisabled={date.isDisabled}>
                <Text fontWeight='500' fontSize='xs' color={date.isWeekend ? '#F03F3F' : 'currentColor'}>{date.weekday}</Text>
                <Heading fontWeight='500' fontSize='4xl'>{date.dayNumber}</Heading>
              </Button>
            ))}
          </Flex>
        </FormControl>
        <FormControl mt='32px'>
          <VStack gap='24px' alignItems={'flex-start'}>
            {selectedDate.timePeriods.map((timePeriod, index) => <Box key={index}>
              <FormLabel mb={'0'} color='text.secondary'>{timePeriod.name}</FormLabel>
              <Flex gap='8px' mt={'8px'} spacing={2} alignItems="flex-start" flexWrap={'wrap'}>
                {timePeriod.timeSlots.map((timeSlot, index) => (
                  <Button
                    key={index}
                    w='80px'
                    onClick={() => handleTimeClick(timeSlot)}
                    variant={selectedTime === timeSlot ? 'solid' : 'outline'}
                    isDisabled={timeSlot.isBreak}
                    colorScheme='brand'
                  >
                    {timeSlot.time}
                  </Button>
                ))}
              </Flex>
            </Box>)}
          </VStack>
        </FormControl>
      </Box>
    )
  );
};

export default TimeSlotPicker;
