import { Stack, Box, Text } from '@chakra-ui/react'

const ImmersiveCard = ({ name, categoryName }) => {
  return (
    <Stack
      paddingStart="12px"
      paddingY="4px"
      borderRadius="12px"
      direction="row"
      justify="flex-start"
      align="center"
      spacing="12px"
      width="358px"
      height="56px"
      maxWidth="100%"
      background="Button Immersive"
    >
      <Box>
        <Stack borderRadius="40px" width="40px" height="40px">
          <Box borderRadius="120px" width="40px" height="40px" />
        </Stack>
        <Stack justify="flex-start" align="flex-start" spacing="0px">
          <Box>
            <Text
              fontSize="md"
              letterSpacing="-0.02em"
              color="telegram"
            >
              {categoryName}
            </Text>
          </Box>
          <Text
            md="lg"
            letterSpacing="-0.03em"
            color="text.primary"
          >
            {name}
          </Text>
        </Stack>
      </Box>
    </Stack>
  )
}

export default ImmersiveCard;