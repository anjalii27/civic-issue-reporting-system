// src/pages/AdminDashboard.jsx
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
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// TEMP mock data — will be replaced by backend
const allIssues = [
  {
    id: 1,
    title: "Pothole near Sector 12",
    status: "Pending",
    category: "Pothole",
    date: "Dec 3, 2024",
    image:
      "https://images.unsplash.com/photo-1606207523649-59c9f1a4bb7a?auto=format&fit=crop&w=400&q=60",
    reportedBy: "Anjali Singh",
  },
  {
    id: 2,
    title: "Streetlight not working",
    status: "In Progress",
    category: "Streetlight",
    date: "Nov 29, 2024",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=60",
    reportedBy: "Rahul Verma",
  },
  {
    id: 3,
    title: "Garbage not collected",
    status: "Resolved",
    category: "Garbage",
    date: "Nov 20, 2024",
    image:
      "https://images.unsplash.com/photo-1581574209463-cb1f0b1c07ba?auto=format&fit=crop&w=400&q=60",
    reportedBy: "Neha Sharma",
  },
];

function AdminDashboard() {
  return (
    <Box bg="gray.50" minH="100vh" p={8}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Heading fontSize="2xl">Admin Dashboard</Heading>
      </Flex>

      {/* Card Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {allIssues.map((issue) => (
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

            <VStack align="start" spacing={3} p={5}>
              {/* Title */}
              <Heading fontSize="lg">{issue.title}</Heading>

              {/* Reporter */}
              <Text fontSize="sm" color="gray.600">
                Reported by: <strong>{issue.reportedBy}</strong>
              </Text>

              {/* Category */}
              <Badge colorScheme="purple">{issue.category}</Badge>

              {/* Status */}
              <Badge
                colorScheme={
                  issue.status === "Resolved"
                    ? "green"
                    : issue.status === "In Progress"
                    ? "orange"
                    : "red"
                }
              >
                {issue.status}
              </Badge>

              {/* Date */}
              <Text fontSize="sm" color="gray.500">
                {issue.date}
              </Text>

              {/* Status Dropdown (Admin Control) */}
              <Select
                defaultValue={issue.status}
                size="sm"
                borderRadius="md"
                focusBorderColor="purple.500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </Select>

              {/* View Details */}
              <Button
                as={Link}
                to={`/issue/${issue.id}`}
                w="100%"
                colorScheme="purple"
                variant="outline"
                borderRadius="lg"
                mt={2}
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

export default AdminDashboard;
