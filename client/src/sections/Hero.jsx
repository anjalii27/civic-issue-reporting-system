import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <Box bg="gray.50" pb={{ base: 8, md: 10 }}>

      
      <motion.div
        style={{ width: "100%", display: "block" }}   // ⭐ FIX 1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Flex
          mx="auto"
          maxW="1200px"
          px={6}
          py={8}
          align="center"
          justify="space-between"
          flexWrap="wrap"        
          gap={10}
        >
          {/* LEFT SIDE */}
          <Box maxW="580px">
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

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            style={{ minWidth: "400px", width: "400px" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"

              alt="City"
              borderRadius="xl"
              boxShadow="2xl"
              w={{ base: "100%", md: "520px", lg: "600px" }}
              ml={{ lg: "-40px" }}
            />
          </motion.div>
        </Flex>
      </motion.div>

    </Box>
  );
}

export default Hero;
