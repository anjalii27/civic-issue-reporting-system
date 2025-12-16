import {
  Box,
  Heading,
  Button,
  Flex,
  Text,
  Select,
  Divider
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/api";

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const token = localStorage.getItem("token");

  // -----------------------------
  // FETCH ISSUES
  // -----------------------------
  const fetchIssues = async () => {
    try {
      const res = await fetch(`${API_URL}/api/issues`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) setIssues(data);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // FETCH OFFICERS
  // -----------------------------
  const fetchOfficers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/officers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) setOfficers(data.officers || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssues();
    fetchOfficers();
  }, []);

  // -----------------------------
  // CLEAR FILTERS
  // -----------------------------
  const clearFilters = () => {
    setFilterStatus("");
    setFilterCategory("");
  };

  // -----------------------------
  // FILTER LOGIC
  // -----------------------------
  const filteredIssues = issues.filter((issue) => {
    const matchStatus = filterStatus ? issue.status === filterStatus : true;
    const matchCategory = filterCategory ? issue.category === filterCategory : true;
    return matchStatus && matchCategory;
  });

  // -----------------------------
  // SORT BY PRIORITY (duplicateCount DESC)
  // -----------------------------
  const sortedIssues = [...filteredIssues].sort(
    (a, b) => (b.duplicateCount || 0) - (a.duplicateCount || 0)
  );

  // -----------------------------
  // ASSIGN OFFICER
  // -----------------------------
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
      if (res.ok) {
        alert("Officer assigned!");
        fetchIssues();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        fetchIssues();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <Box p={6}>
      <Heading mb={4}>Admin Dashboard</Heading>

      {/* ACTION BUTTONS */}
      <Flex justify="flex-end" mb={6} gap={4}>
        <Button as={Link} to="/admin/add-officer" colorScheme="purple">
          Add Officer
        </Button>

        <Button as={Link} to="/admin/add-admin" colorScheme="purple">
          Add Admin
        </Button>

        <Button colorScheme="purple" variant="outline" onClick={fetchIssues}>
          Refresh
        </Button>
      </Flex>

      {/* FILTERS */}
      <Flex gap={4} mb={6} wrap="wrap">
        <Select
          placeholder="Filter by Status"
          width="200px"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Verified">Verified</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </Select>

        <Select
          placeholder="Filter by Category"
          width="200px"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="Road Damage">Road Damage</option>
          <option value="Garbage">Garbage</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Street Light">Street Light</option>
        </Select>

        <Button colorScheme="purple" variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Flex>

      {/* ISSUE LIST */}
      {sortedIssues.map((issue) => (
        <Box
          key={issue._id}
          p={6}
          mb={6}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading size="md" mb={1}>
            {issue.title}
          </Heading>

          <Text color="gray.600">{issue.description}</Text>

          {issue.duplicateCount > 1 && (
            <Text color="red.500" fontWeight="bold" mt={1}>
              ⚠ Reported by {issue.duplicateCount} users
            </Text>
          )}

          <Text mt={2} fontWeight="bold" color="purple.600">
            Status: {issue.status}
          </Text>

          <Divider my={4} />

          {/* Assign Officer */}
          <Text mb={2} fontWeight="semibold">
            Assign Officer:
          </Text>

          <Select
            placeholder="Select officer"
            onChange={(e) => assignOfficer(issue._id, e.target.value)}
          >
            {officers.map((off) => (
              <option key={off._id} value={off._id}>
                {off.name}
              </option>
            ))}
          </Select>

          <Text fontSize="sm" mt={1} color="gray.500">
            Assigned: {issue.assignedTo?.name || "None"}
          </Text>

          <Divider my={4} />

          {/* Update Status */}
          <Text mb={2} fontWeight="semibold">Update Status:</Text>
          <Select
            placeholder="Change status"
            onChange={(e) => updateStatus(issue._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </Select>

          <Button mt={4} colorScheme="purple" as={Link} to={`/issue/${issue._id}`}>
            View Details
          </Button>
        </Box>
      ))}
    </Box>
  );
}

export default AdminDashboard;
