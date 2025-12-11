import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/api";

function OfficerDashboard() {
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const officerId = localStorage.getItem("userId");

  useEffect(() => {
    fetchAssignedIssues();
  }, []);

  const fetchAssignedIssues = async () => {
  try {
    setLoading(true);

    const res = await fetch(`${API_URL}/api/issues/assigned/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setAssignedIssues(data);
    setLoading(false);
  } catch (error) {
    console.error(error);
    alert("Error loading assigned issues");
    setLoading(false);
  }
};


  // Update Issue Status
  const updateStatus = async (issueId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/issues/update-status/${issueId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Status updated successfully!");
      fetchAssignedIssues(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Could not update status");
    }
  };

  return (
    <Flex direction="column" p={8} bg="gray.50" minH="100vh">
      
      {/* Page Header */}
      <Heading fontSize="2xl" color="purple.700" mb={6}>
        Officer Dashboard
      </Heading>

      {/* Loading Spinner */}
      {loading && (
        <Flex justify="center" mt={10}>
          <Spinner size="xl" color="purple.500" />
        </Flex>
      )}

      {!loading && assignedIssues.length === 0 && (
        <Text fontSize="lg" color="gray.500">
          No issues have been assigned to you yet.
        </Text>
      )}

      {/* Issue Cards */}
      <VStack spacing={5} align="stretch">
        {assignedIssues.map((issue) => (
          <Box
            key={issue._id}
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            borderLeft="6px solid #6B46C1"
          >
            <Heading fontSize="lg" color="purple.700">
              {issue.title}
            </Heading>

            <Text mt={2} color="gray.700">
              {issue.description}
            </Text>

            <Text mt={3} fontWeight="bold" color="purple.600">
              Current Status: {issue.status}
            </Text>

            {/* STATUS UPDATE DROPDOWN */}
            <Select
              placeholder="Update status"
              mt={3}
              onChange={(e) => updateStatus(issue._id, e.target.value)}
            >
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Select>

            <Button
              as={Link}
              to={`/issue/${issue._id}`}
              colorScheme="purple"
              size="sm"
              mt={4}
            >
              View Full Details
            </Button>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
}

export default OfficerDashboard;
