import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";

function Footer() {
  return (
    <Box bg="gray.900" color="gray.300" py={16} mt={20}>
      <Flex
        maxW="1200px"
        mx="auto"
        px={6}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={10}
      >
        <VStack align="start" spacing={3}>
          <Heading fontSize="2xl" color="white">CivicSense</Heading>
          <Text maxW="300px">
            Empowering communities to report, track, and resolve civic issues.
          </Text>
          <Text fontSize="sm">© 2024 CivicSense. All rights reserved.</Text>
        </VStack>

        <VStack align="start" spacing={2}>
          <Heading fontSize="lg" color="white">Quick Links</Heading>
          <Text>Home</Text>
          <Text>Features</Text>
          <Text>Contact</Text>
        </VStack>

        <VStack align="start" spacing={2}>
          <Heading fontSize="lg" color="white">Support</Heading>
          <Text>Privacy Policy</Text>
          <Text>Terms of Service</Text>
          <Text>FAQ</Text>
        </VStack>
      </Flex>
    </Box>
  );
}

export default Footer;
