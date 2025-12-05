// src/pages/UserDashboard.jsx
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  Flex,
  SimpleGrid,
  Image,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import IssueTimeline from "../components/IssueTimeline";

// TEMP mock data — replace this with backend later
const mockIssues = [
  {
    id: 1,
    title: "Pothole near Sector 12",
    status: "Pending",
    category: "Pothole",
    date: "Dec 3, 2024",
    image:
      "https://images.unsplash.com/photo-1606207523649-59c9f1a4bb7a?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 2,
    title: "Streetlight not working",
    status: "In Progress",
    category: "Streetlight",
    date: "Nov 29, 2024",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 3,
    title: "Garbage not collected",
    status: "Resolved",
    category: "Garbage",
    date: "Nov 20, 2024",
    image:
      "https://images.unsplash.com/photo-1581574209463-cb1f0b1c07ba?auto=format&fit=crop&w=400&q=60",
  },
];

function UserDashboard() {
  return (
    <Box bg="gray.50" minH="100vh" p={8}>
      {/* Header Row */}
      <Flex justify="space-between" align="center" mb={8}>
        <Heading fontSize="2xl">Your Reported Issues</Heading>

        <Button
          as={Link}
          to="/report"
          colorScheme="purple"
          borderRadius="lg"
        >
          + Report New Issue
        </Button>
      </Flex>

      {/* Card Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {mockIssues.map((issue) => (
          <Box
            key={issue.id}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
            overflow="hidden"
            transition="0.25s"
            _hover={{ transform: "translateY(-6px)", boxShadow: "xl" }}
          >
            {/* Image */}
            <Image
              src={issue.image}
              height="160px"
              width="100%"
              objectFit="cover"
            />

            {/* Content */}
            <VStack align="start" spacing={3} p={5}>
              <Heading fontSize="lg">{issue.title}</Heading>

              <Badge colorScheme="purple" borderRadius="md">
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
                borderRadius="md"
              >
                {issue.status}
              </Badge>

              <Text fontSize="sm" color="gray.500">
                Reported on {issue.date}
              </Text>

              {/* ⭐ TIMELINE INSIDE CARD ⭐ */}
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

              {/* View Details Button */}
              <Button
                as={Link}
                to={`/issue/${issue.id}`}
                mt={2}
                w="100%"
                colorScheme="purple"
                variant="outline"
                borderRadius="lg"
              >
                View Details
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default UserDashboard;
