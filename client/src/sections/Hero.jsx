import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

function Hero() {
  return (
    <Box bg="gray.50" pb={20}>
      <MotionFlex
        maxW="1200px"
        mx="auto"
        py={20}
        px={6}
        align="center"
        justify="space-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box maxW="500px">
          <Heading fontSize="4xl" mb={4} color="gray.800">
            Report. Track. Resolve.
          </Heading>

          <Text fontSize="lg" color="gray.600" mb={8}>
            Join thousands of citizens using CivicSense to improve their communities.
            Report civic issues, track updates, and see real-time progress.
          </Text>

          <Button
            size="lg"
            bg="purple.600"
            color="white"
            _hover={{ bg: "purple.700" }}
          >
            Get Started
          </Button>
        </Box>

        <MotionBox
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e"
            alt="City"
            borderRadius="xl"
            boxShadow="2xl"
            w="520px"
          />
        </MotionBox>
      </MotionFlex>
    </Box>
  );
}

export default Hero;
