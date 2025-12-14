import { Box, Heading, Text, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
import { FiMapPin, FiTool, FiTrendingUp } from "react-icons/fi";

const features = [
  {
    icon: FiTool,
    title: "Easy Reporting",
    desc: "Report civic issues with photos, location, and descriptions in seconds."
  },
  {
    icon: FiMapPin,
    title: "Interactive Maps",
    desc: "View issue hotspots with real-time mapping and location tracking."
  },
  {
    icon: FiTrendingUp,
    title: "Track Progress",
    desc: "Follow issue status updates from submission to resolution."
  }
];

function WhyChooseUs() {
  return (
    <Box id="features" py={20} bg="white">
      <Box maxW="1100px" mx="auto" textAlign="center" px={6}>
        <Heading mb={4} color="gray.800">
          Why Choose CivicSense?
        </Heading>

        <Text fontSize="lg" color="gray.600" mb={12}>
          Our platform makes it easy to report, track, and resolve civic issues.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {features.map((f, i) => (
            <Flex
              key={i}
              direction="column"
              p={8}
              borderRadius="xl"
              boxShadow="md"
              bg="gray.50"
              _hover={{ boxShadow: "xl", transform: "translateY(-5px)" }}
              transition="0.3s"
            >
              <Icon as={f.icon} boxSize={10} color="purple.600" mb={4} />
              <Heading fontSize="xl" mb={2}>
                {f.title}
              </Heading>
              <Text color="gray.600">{f.desc}</Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default WhyChooseUs;
