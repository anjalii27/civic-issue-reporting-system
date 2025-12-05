import {
  Box,
  Heading,
  Text,
  Badge,
  Image,
  Flex,
  Button,
  VStack,
} from "@chakra-ui/react";
import IssueTimeline from "../components/IssueTimeline";

// TEMP — mock issue. Later replace with dynamic issue data.
const issue = {
  id: 1,
  title: "Pothole near Sector 12",
  category: "Pothole",
  status: "In Progress",
  date: "Dec 3, 2024",
  description:
    "There is a large pothole near the Sector 12 crossing. It causes traffic jams and is dangerous for bikes.",
  image:
    "https://images.unsplash.com/photo-1606207523649-59c9f1a4bb7a?auto=format&fit=crop&w=800&q=60",
  locationText: "Near Sector 12 crossing, Noida",
};

function IssueDetails() {
  return (
    <Box bg="gray.50" minH="100vh" p={8}>
      <Box
        maxW="800px"
        mx="auto"
        bg="white"
        borderRadius="2xl"
        boxShadow="xl"
        overflow="hidden"
      >
        {/* Image */}
        <Image src={issue.image} height="300px" width="100%" objectFit="cover" />

        <Box p={8}>
          {/* Title */}
          <Heading fontSize="2xl" mb={2}>
            {issue.title}
          </Heading>

          {/* Category + Status */}
          <Flex gap={4} mb={4}>
            <Badge colorScheme="purple" px={3} py={1} borderRadius="md">
              {issue.category}
            </Badge>

            <Badge
              colorScheme={
                issue.status === "Resolved"
                  ? "green"
                  : issue.status === "In Progress"
                  ? "orange"
                  : "red"
              }
              px={3}
              py={1}
              borderRadius="md"
            >
              {issue.status}
            </Badge>
          </Flex>

          {/* Description */}
          <Text color="gray.700" mb={4}>
            {issue.description}
          </Text>

          {/* Location (later we add map) */}
          <Text fontWeight="bold" mt={4} mb={1}>
            Location:
          </Text>
          <Text color="gray.600">{issue.locationText}</Text>

          {/* Reported Date */}
          <Text fontSize="sm" color="gray.500" mt={4}>
            Reported on {issue.date}
          </Text>

          {/* ⭐ TIMELINE */}
          <Box mt={8}>
            <Heading fontSize="lg" mb={4}>
              Issue Progress
            </Heading>

            <IssueTimeline
              currentStep={
                issue.status === "Resolved"
                  ? 3
                  : issue.status === "In Progress"
                  ? 2
                  : issue.status === "Verified"
                  ? 1
                  : 0
              }
            />
          </Box>

          {/* Buttons */}
          <Flex mt={10} gap={4}>
            <Button colorScheme="purple" flex={1}>
              Edit Issue
            </Button>

            <Button colorScheme="red" variant="outline" flex={1}>
              Delete Issue
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default IssueDetails;
