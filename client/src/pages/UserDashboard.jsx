import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/api";

function UserDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get saved user info
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/issues`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setIssues(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Error fetching issues");
    }
  };

  // Filter issues created by logged-in user
  const userIssues = issues.filter(
    (issue) => issue?.createdBy?._id === userId
  );

  return (
    <Flex direction="column" p={8} bg="gray.50" minH="100vh">
      
      {/* HEADER */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading fontSize="2xl" color="purple.700">
          Your Dashboard
        </Heading>

        <Flex gap={3}>
          <Button colorScheme="purple" onClick={fetchIssues}>
            Refresh
          </Button>

          <Button
            as={Link}
            to="/report-issue"
            colorScheme="green"
          >
            Report New Issue
          </Button>
        </Flex>
      </Flex>

      {/* TITLE */}
      <Heading fontSize="xl" mb={4} color="gray.800">
        Your Reported Issues
      </Heading>

      {/* LOADING */}
      {loading && (
        <Flex justify="center" mt={10}>
          <Spinner size="xl" color="purple.500" />
        </Flex>
      )}

      {/* NO ISSUES */}
      {!loading && userIssues.length === 0 && (
        <Text fontSize="lg" color="gray.500" mt={10}>
          You have not reported any issues yet.
        </Text>
      )}

      {/* ISSUE LIST */}
      <VStack spacing={4} align="stretch">
        {userIssues.map((issue) => (
          <Box
            key={issue._id}
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            borderLeft="6px solid #805AD5"
          >
            <Heading fontSize="lg" color="purple.700">
              {issue.title}
            </Heading>

            <Text mt={2} color="gray.700">
              {issue.description}
            </Text>

            <Text mt={3} fontWeight="bold" color="purple.500">
              Status: {issue.status}
            </Text>

            {issue.assignedTo && (
              <Text mt={1} fontSize="sm" color="gray.600">
                Assigned to Officer: {issue.assignedTo.name}
              </Text>
            )}

            <Button
              as={Link}
              to={`/issue/${issue._id}`}
              colorScheme="purple"
              size="sm"
              mt={4}
            >
              View Details
            </Button>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
}

export default UserDashboard;
