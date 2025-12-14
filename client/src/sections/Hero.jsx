import { useEffect, useState } from "react";
import axios from "axios";

import heroImage from "../assets/Image.png";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

function Hero() {
  const [stats, setStats] = useState({
  totalIssues: 0,
  resolvedIssues: 0,
  activeCitizens: 0,
});

useEffect(() => {
  axios.get("http://localhost:5000/api/stats")
    .then((res) => setStats(res.data))
    .catch((err) => console.log(err));
}, []);

  return (
    <>
      {/* HERO SECTION (Grey Background) */}
      <Box bg="gray.50" pb={{ base: 14, md: 20 }}>
        
        {/* FADE-IN WRAPPER */}
        <motion.div
          style={{ width: "100%", display: "block" }}
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
            flexWrap="nowrap"
            overflow="hidden"
            gap={10}
          >
            {/* LEFT SIDE CONTENT */}
            <Box maxW="580px">
              <Heading fontSize="4xl" mb={4} color="gray.800">
                Report. Track. Resolve.
              </Heading>

              <Text fontSize="lg" color="gray.600" mb={8}>
                Join thousands of citizens using CivicSense to improve their
                communities. Report civic issues, track updates, and see
                real-time progress.
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
              style={{ width: "100%", maxWidth: "520px" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={heroImage}
                alt="City"
                borderRadius="xl"
                boxShadow="2xl"
                w={{ base: "100%", md: "480px", lg: "520px" }}
                h="auto"
                objectFit="cover"
              />
            </motion.div>
          </Flex>
        </motion.div>
      </Box>

      {/* ⭐ STATS SECTION BELOW HERO */}
      <Box
        py={10}
        bg="white"
        textAlign="center"
        display="flex"
        justifyContent="center"
        gap={{ base: 6, md: 20 }}
        flexWrap="wrap"
      >
        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="purple.600">
            {stats.totalIssues}
          </Text>
          <Text color="gray.600">Issues Reported</Text>
        </Box>

        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="purple.600">
            {stats.resolvedIssues}
          </Text>
          <Text color="gray.600">Issues Resolved</Text>
        </Box>

        <Box>
          <Text fontSize="3xl" fontWeight="bold" color="purple.600">
            {stats.activeCitizens}+
          </Text>
          <Text color="gray.600">Active Citizens</Text>
        </Box>
      </Box>
    </>
  );
}

export default Hero;
