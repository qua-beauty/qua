import {useEffect, useState} from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText, Button, Flex,
} from '@chakra-ui/react';
import { format, addHours, setHours, setMinutes, startOfDay, isPast, isToday } from 'date-fns';

const TimeSlotPicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if(selectedDate) {
      const currentDate = new Date(selectedDate);

      generateTimeSlots(currentDate);
    }
  }, [selectedDate])

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);

  }, []);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    const currentDate = new Date(selectedDate);

    generateTimeSlots(currentDate);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const generateTimeSlots = (date) => {
    console.log(date);
    const startTime = setMinutes(setHours(date, 10), 0); // Set the start time to 10 AM
    const currentHour = date.getHours();
    const endTime = addHours(startTime, 22 - 10); // 22:00 is the end time

    const slots = [];
    let currentTime = startTime;
    while (currentTime <= endTime) {
      if (!isPast(currentTime) || (isToday(currentTime) && currentTime.getHours() > currentHour)) {
        slots.push(currentTime);
      }
      currentTime = addHours(currentTime, 1);
    }
    setTimeSlots(slots);
  };

  return selectedDate && (
    <Box>
      <FormControl p={'12px'}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <FormLabel mb={'0'}>Select Date</FormLabel>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </Flex>
        <VStack mt={'12px'} spacing={2} alignItems="flex-start">
          {timeSlots.map((timeSlot) => (
            <Button
              w={'100%'}
              key={timeSlot}
              onClick={() => handleTimeClick(format(timeSlot, 'HH:mm'))}
              variant={selectedTime === format(timeSlot, 'HH:mm') ? 'solid' : 'outline'}
              isDisabled={!selectedDate}
            >
              {format(timeSlot, 'hh:mm a')}
            </Button>
          ))}
        </VStack>
        <FormHelperText>Please select a time slot.</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default TimeSlotPicker;