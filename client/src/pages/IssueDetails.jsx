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
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/api";

function IssueDetails() {
  const { id } = useParams(); // Issue ID from URL

  const [issue, setIssue] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchIssue();
    if (role === "admin") fetchOfficers();
  }, []);

  // Fetch the issue by ID
  const fetchIssue = async () => {
    try {
      const res = await fetch(`${API_URL}/api/issues/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setIssue(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error loading issue");
      setLoading(false);
    }
  };

  // Fetch all officers (Admin Only)
  const fetchOfficers = async () => {
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

  // Assign officer (Admin Only)
  const assignOfficer = async (officerId) => {
    try {
      const res = await fetch(`${API_URL}/api/issues/assign/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignedTo: officerId }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Officer assigned successfully!");
      fetchIssue();
    } catch (err) {
      console.error(err);
    }
  };

  // Update issue status (Admin + Officer)
  const updateStatus = async (newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/issues/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Issue status updated!");
      fetchIssue();
    } catch (err) {
      console.error(err);
    }
  };

  // Loading spinner
  if (loading)
    return (
      <Flex justify="center" mt={20}>
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );

  if (!issue) return <Text>Issue not found.</Text>;

  return (
    <Flex direction="column" p={8} bg="gray.50" minH="100vh">
      <Heading fontSize="2xl" color="purple.700" mb={6}>
        Issue Details
      </Heading>

      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="lg"
        borderLeft="6px solid #6B46C1"
      >
        {/* Title */}
        <Heading fontSize="xl" color="purple.700">
          {issue.title}
        </Heading>

        {/* Description */}
        <Text mt={3} color="gray.700">
          {issue.description}
        </Text>

        {/* Category */}
        <Text mt={3} fontWeight="bold" color="gray.600">
          Category: {issue.category}
        </Text>

        {/* Location */}
        <Text mt={1} color="gray.600">
          Location: {issue.location}
        </Text>

        {/* Timestamps */}
        <Text mt={4} fontSize="sm" color="gray.500">
          Reported on: {new Date(issue.createdAt).toLocaleString()}
        </Text>

        <Text fontSize="sm" color="gray.500">
          Last Updated: {new Date(issue.updatedAt).toLocaleString()}
        </Text>

        {/* Image Preview */}
        {issue.imageUrl && (
          <Box mt={5}>
            <Text fontWeight="bold" mb={2}>
              Issue Image:
            </Text>
            <img
              src={issue.imageUrl}
              alt="Issue"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Box>
        )}

        {/* Status */}
        <Text mt={4} fontWeight="bold" color="purple.500">
          Current Status: {issue.status}
        </Text>

        {/* Status Timeline */}
        <Box mt={5}>
          <Text fontWeight="bold" mb={2}>
            Issue Progress:
          </Text>

          <Flex gap={4} align="center" wrap="wrap">
            {["Pending", "Verified", "In Progress", "Resolved"].map((stage) => (
              <Box
                key={stage}
                p={2}
                borderRadius="md"
                bg={
                  stage === "Pending" ||
                  (stage === "Verified" &&
                    ["Verified", "In Progress", "Resolved"].includes(issue.status)) ||
                  (stage === "In Progress" &&
                    ["In Progress", "Resolved"].includes(issue.status)) ||
                  (stage === "Resolved" && issue.status === "Resolved")
                    ? "purple.500"
                    : "gray.300"
                }
                color="white"
              >
                {stage}
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Reported By */}
        <Box mt={5}>
          <Text fontWeight="bold">Reported By:</Text>
          <Text color="gray.600">{issue.createdBy?.name}</Text>
        </Box>

        {/* Assigned To */}
        {issue.assignedTo && (
          <Box mt={2}>
            <Text fontWeight="bold">Assigned Officer:</Text>
            <Text color="gray.600">{issue.assignedTo.name}</Text>
          </Box>
        )}

        {/* Admin: Assign Officer */}
        {role === "admin" && (
          <Box mt={6}>
            <Text fontWeight="bold">Assign Officer:</Text>
            <Select
              placeholder="Select officer"
              onChange={(e) => assignOfficer(e.target.value)}
              mt={2}
            >
              {officers.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name}
                </option>
              ))}
            </Select>
          </Box>
        )}

        {/* Admin + Officer: Update Status */}
        {(role === "admin" || role === "officer") && (
          <Box mt={6}>
            <Text fontWeight="bold">Update Status:</Text>
            <Select
              placeholder="Select new status"
              mt={2}
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="Verified">Verified</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Select>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default IssueDetails;
