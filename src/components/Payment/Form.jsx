import { Text, Box, Flex, Textarea, FormControl, FormLabel, RadioGroup, Radio, Stack } from '@chakra-ui/react';
import {MainButton} from '../MainButton';
import BitcoinSvg from '../../assets/icons/bitcoin.svg';
import TonSvg from '../../assets/icons/ton.svg';
import TetherSvg from '../../assets/icons/tether.svg';
import ApplePaySvg from '../../assets/icons/apple-pay.svg';
import GooglePaySvg from '../../assets/icons/google-pay.svg';
import MastercardSvg from '../../assets/icons/mastercard.svg';
import VisaSvg from '../../assets/icons/visa.svg';

export const Form = ({ onSubmit }) => {
  return (
    <Flex direction='column' mt='2rem' gap='2rem'>
      <FormControl>
        <FormLabel>Comment</FormLabel>
        <Textarea placeholder='' />
      </FormControl>

      <FormControl>
        <FormLabel>Payment</FormLabel>
        <RadioGroup defaultValue='1'>
          <Stack spacing={4} direction='column'>
            <Radio size='lg' value='cash'>Cash</Radio>
            <Flex as='label' gap='1rem' cursor={'pointer'}>
              <Radio size='lg' value='pay'>Pay</Radio>
              <Flex gap='0.5rem'>
                <img src={ApplePaySvg} alt="Apple Pay" />
                <img src={GooglePaySvg} alt="Google Pay" />
                <img src={MastercardSvg} alt="Mastercard" />
                <img src={VisaSvg} alt="Visa" />
              </Flex>
            </Flex>

            <Flex as='label' gap='1rem' cursor='pointer'>
              <Radio size='lg' value='crypto'>Crypto</Radio>
              <Flex gap='0.5rem'>
                <img src={TetherSvg} alt="Tether" />
                <img src={TonSvg} alt="Ton" />
                <img src={BitcoinSvg} alt="Bitcoin" />
              </Flex>
            </Flex>
          </Stack>
        </RadioGroup>
      </FormControl>

      <Box textAlign='center' position='fixed' bottom='0' left='0' right='0'>
        <Text fontSize='md' mb='12px' color='text.secondary'>Veronika will contact you, share address and meet you</Text>
        <MainButton onClick={onSubmit}>Book now (120$)</MainButton>
      </Box>
    </Flex>
  )
}