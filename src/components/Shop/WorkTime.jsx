import React from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

const WorkTime = ({ workTime = [] }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const isDisabled = (item) => item.workTime.length === 0;

  console.log(workTime);
  return workTime && (
    <Box p='1rem'>
      <Heading fontSize='4xl' letterSpacing={'-1px'} fontWeight={'500'}>Schedule</Heading>
      <Flex direction='column' gap='8px' mt='24px'>
        {workTime.map((item, index) => (
          <Flex key={index} gap='24px'>
            <Text w='92px' fontSize='lg' textAlign='right' color={(isDisabled(item) ? 'text.disabled' : 'text.primary')}>{daysOfWeek[index]}</Text>
            {(!isDisabled(item)) ? (
              <Flex flex='1' justifyContent='space-between' alignItems='center' bg='brand.200' borderRadius='12px' color='white' p='0 8px' height='32px'>
                <Text>{item.workTime[0]}:00</Text>
                <Text>{item.workTime[1]}:00</Text>
              </Flex>
            ) : (
              <Flex flex='1' justifyContent='center' alignItems='center' bg='blackAlpha.300' borderRadius='12px' color='text.secondary' p='0 8px' height='32px'>
                <Text>Not working</Text>
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default WorkTime;
