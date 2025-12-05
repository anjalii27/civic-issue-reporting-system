import {
  Box,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack
} from "@chakra-ui/react";

function ContactPage() {
  return (
    <Flex
      minH="80vh"
      bg="gray.50"
      align="center"
      justify="center"
      px={4}
      py={16}
    >
      <Box
        w="100%"
        maxW="600px"
        bg="white"
        p={10}
        borderRadius="2xl"
        boxShadow="2xl"
      >
        <Heading mb={3} color="gray.800" textAlign="center">
          Contact Us
        </Heading>

        <Text mb={8} color="gray.500" textAlign="center">
          Have questions or feedback? We’d love to hear from you.
        </Text>

        <VStack spacing={6}>
          <FormControl>
            <FormLabel>Your Name</FormLabel>
            <Input placeholder="Enter your name" bg="gray.50" />
          </FormControl>

          <FormControl>
            <FormLabel>Your Email</FormLabel>
            <Input placeholder="you@example.com" bg="gray.50" />
          </FormControl>

          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Write your message..." bg="gray.50" />
          </FormControl>

          <Button colorScheme="purple" w="100%" size="lg" borderRadius="lg">
            Send Message
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default ContactPage;
