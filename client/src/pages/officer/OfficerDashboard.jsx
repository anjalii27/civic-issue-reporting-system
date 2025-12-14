// src/pages/officer/OfficerDashboard.jsx

import {
  Box,
  Heading,
  Text,
  Button,
  Select,
  Divider,
  Flex,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/api";

function OfficerDashboard() {
  const [issues, setIssues] = useState([]);
  const token = localStorage.getItem("token");

  // -----------------------------
  // FETCH ASSIGNED ISSUES
  // -----------------------------
  const fetchAssignedIssues = async () => {
    try {
      const res = await fetch(`${API_URL}/api/issues/assigned/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) setIssues(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignedIssues();
  }, []);

  // -----------------------------
  // UPDATE STATUS
  // -----------------------------
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

      if (res.ok) {
        alert("Status updated!");
        fetchAssignedIssues();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Officer Dashboard</Heading>

      {/* Refresh Button */}
      <Flex justify="flex-end" mb={4}>
        <Button colorScheme="purple" variant="outline" onClick={fetchAssignedIssues}>
          Refresh
        </Button>
      </Flex>

      {/* ---------------------------------------------- */}
      {/* ASSIGNED ISSUES LIST */}
      {/* ---------------------------------------------- */}
      {issues.length === 0 ? (
        <Text>No issues assigned to you yet.</Text>
      ) : (
        issues.map((issue) => (
          <Box
            key={issue._id}
            bg="white"
            p={6}
            mb={6}
            borderRadius="lg"
            boxShadow="md"
          >
            <Heading size="md">{issue.title}</Heading>

            <Text>{issue.description}</Text>

            <Text mt={2} fontWeight="bold" color="purple.600">
              Status: {issue.status}
            </Text>

            <Divider my={4} />

            {/* Status Update */}
            <Text mb={2} fontWeight="semibold">
              Update Status:
            </Text>

            <Select
              placeholder="Change status"
              onChange={(e) => updateStatus(issue._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Select>

           <Button
            mt={4}
            colorScheme="purple"
            as={Link}
            to={`/officer/issue/${issue._id}`}
          >
           View Details
           </Button>

          </Box>
        ))
      )}
    </Box>
  );
}

export default OfficerDashboard;
