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

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllIssues();
    fetchAllOfficers();
  }, []);

  // Fetch all issues
  const fetchAllIssues = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/issues`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setIssues(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error fetching issues");
      setLoading(false);
    }
  };

  // Fetch all officers
  const fetchAllOfficers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/officers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOfficers(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Assign officer to issue
  const assignOfficer = async (issueId, officerId) => {
    try {
      const res = await fetch(`${API_URL}/api/issues/assign/${issueId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignedTo: officerId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Officer assigned successfully!");
      fetchAllIssues();
    } catch (err) {
      console.error(err);
      alert("Error assigning officer");
    }
  };

  // Update issue status
  const updateStatus = async (issueId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/issues/status/${issueId}`, {
        method: "PATCH",
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
      fetchAllIssues();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  return (
    <Flex direction="column" p={8} bg="gray.50" minH="100vh">
      
      <Flex justify="space-between" align="center" mb={6}>
        <Heading fontSize="2xl" color="purple.700">
          Admin Dashboard
        </Heading>

        <Button colorScheme="purple" onClick={fetchAllIssues}>
          Refresh
        </Button>
      </Flex>

      {loading && (
        <Flex justify="center" mt={10}>
          <Spinner size="xl" color="purple.500" />
        </Flex>
      )}

      {!loading && issues.length === 0 && (
        <Text fontSize="lg" color="gray.500">
          No issues reported yet.
        </Text>
      )}

      <VStack spacing={5} align="stretch">
        {issues.map((issue) => (
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
              Status: {issue.status}
            </Text>

            {/* Officer Assignment */}
            <Text mt={4} fontWeight="bold">
              Assign Officer:
            </Text>

            <Select
              placeholder="Select officer"
              onChange={(e) => assignOfficer(issue._id, e.target.value)}
              mt={1}
            >
              {officers.map((officer) => (
                <option key={officer._id} value={officer._id}>
                  {officer.name}
                </option>
              ))}
            </Select>

            {issue.assignedTo && (
              <Text mt={1} fontSize="sm">
                Assigned: {issue.assignedTo.name}
              </Text>
            )}

            {/* Status Update */}
            <Text mt={4} fontWeight="bold">
              Update Status:
            </Text>

            <Select
              placeholder="Change status"
              mt={1}
              onChange={(e) => updateStatus(issue._id, e.target.value)}
            >
              <option value="Verified">Verified</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Select>

            {/* View full details */}
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

export default AdminDashboard;
