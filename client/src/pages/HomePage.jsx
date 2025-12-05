import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image
} from "@chakra-ui/react";

function HomePage() {
  return (
    <Box bg="gray.50">
      <Flex
        maxW="1200px"
        mx="auto"
        py={20}
        px={6}
        align="center"
        justify="space-between"
      >
        <Box maxW="500px">
          <Heading fontSize="4xl" mb={4} color="gray.800">
            Report. Track. Resolve.
          </Heading>

          <Text fontSize="lg" color="gray.600" mb={8}>
            Join thousands of citizens using CivicSense to improve their communities.
            Report issues, track updates, and see real-time progress.
          </Text>

          <Flex gap={4}>
            <Button
              size="lg"
              bg="purple.600"
              color="white"
              _hover={{ bg: "purple.700" }}
            >
              Get Started Free
            </Button>

            <Button size="lg" variant="outline" borderColor="gray.400">
              Watch Demo
            </Button>
          </Flex>

          <Flex mt={12} gap={16} color="gray.700" fontWeight="bold">
            <Box textAlign="center">
              <Text fontSize="2xl">12,847</Text>
              <Text fontSize="sm">Issues Reported</Text>
            </Box>

            <Box textAlign="center">
              <Text fontSize="2xl">8,432</Text>
              <Text fontSize="sm">Issues Resolved</Text>
            </Box>

            <Box textAlign="center">
              <Text fontSize="2xl">25,000+</Text>
              <Text fontSize="sm">Active Citizens</Text>
            </Box>
          </Flex>
        </Box>

        <Image
          src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e"
          alt="City building"
          borderRadius="xl"
          boxShadow="2xl"
          w="550px"
        />
      </Flex>
    </Box>
  );
}

export default HomePage;
