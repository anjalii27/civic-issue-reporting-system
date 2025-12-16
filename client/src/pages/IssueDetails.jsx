import {
  Flex,
  Heading,
  Text,
  Spinner,
  Select,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/api";
import StatusTimeline from "../components/StatusTimeline";

function IssueDetails() {
  const { id } = useParams();

  const [issue, setIssue] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchIssue();
    if (role === "admin") fetchOfficers();
  }, []);

  // -----------------------------
  // FETCH SINGLE ISSUE
  // -----------------------------
  const fetchIssue = async () => {
    try {
      const res = await fetch(`${API_URL}/api/issues/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
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

  // -----------------------------
  // FETCH OFFICERS
  // -----------------------------
  const fetchOfficers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/officers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOfficers(data.officers || []);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // ASSIGN OFFICER
  // -----------------------------
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

  // -----------------------------
  // UPDATE STATUS
  // -----------------------------
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

  {role === "user" && issue.createdBy?._id === localStorage.getItem("userId") && (
  <Box mt={6}>
    <Button
      colorScheme="red"
      onClick={async () => {
        if (!confirm("Are you sure you want to delete this issue?")) return;

        const res = await fetch(`${API_URL}/api/issues/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        alert(data.message);
        window.location.href = "/user-dashboard";
      }}
    >
      Delete Issue
    </Button>
  </Box>
)}


  if (loading)
    return (
      <Flex justify="center" mt={20}>
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );

  if (!issue) return <Text>Issue not found.</Text>;

  // Normalized image URL (fixes broken image issue)
  const imageURL = issue.imageUrl
    ? `${API_URL.replace(/\/$/, "")}${issue.imageUrl.startsWith("/") ? issue.imageUrl : "/" + issue.imageUrl}`
    : null;

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
          Location: {issue.locationText || "Not provided"}
        </Text>

        {/* Timestamps */}
        <Text mt={4} fontSize="sm" color="gray.500">
          Reported on: {new Date(issue.createdAt).toLocaleString()}
        </Text>

        <Text fontSize="sm" color="gray.500">
          Last Updated: {new Date(issue.updatedAt).toLocaleString()}
        </Text>

        {/* Image Preview */}
        {imageURL && (
          <>
            <Image
              src={imageURL}
              alt="Issue"
              boxSize="150px"
              objectFit="cover"
              borderRadius="md"
              cursor="pointer"
              onClick={onOpen}
              border="2px solid #ddd"
              mt={4}
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalBody p={0}>
                  <Image
                    src={imageURL}
                    alt="Issue Large Preview"
                    width="100%"
                    borderRadius="md"
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}

        {/* Status */}
        <Text mt={4} fontWeight="bold" color="purple.500">
          Current Status: {issue.status}
        </Text>

        {/* Status Timeline */}
        <Box mt={5}>
          <Text mt={4} fontWeight="bold">Issue Progress:</Text>
          <StatusTimeline currentStatus={issue.status} />
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
            <Select placeholder="Select officer" mt={2}
              onChange={(e) => assignOfficer(e.target.value)}
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
            <Select mt={2} placeholder="Select new status"
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
