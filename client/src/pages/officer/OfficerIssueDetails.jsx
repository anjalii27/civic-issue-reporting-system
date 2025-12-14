import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Select,
  Textarea
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/api";
import StatusTimeline from "../../components/StatusTimeline";

function OfficerIssueDetails() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const token = localStorage.getItem("token");

  const fetchIssue = async () => {
    try {
      const res = await fetch(`${API_URL}/api/issues/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setIssue(data);
      setStatus(data.status);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const updateIssueStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/api/issues/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        alert("Status updated");
        fetchIssue();
      } else {
        alert("Error updating");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <Box p={6}>
      <Heading mb={4}>{issue.title}</Heading>
      <Text>{issue.description}</Text>

      {issue.imageUrl && (
        <Image
          src={`${API_URL}${issue.imageUrl}`}
          alt="Issue"
          mt={4}
          borderRadius="md"
        />
      )}

      <Text mt={4} fontWeight="bold">
        Current Status: {issue.status}
      </Text>
      <Text mt={4} fontWeight="bold">Issue Progress:</Text>
      <StatusTimeline currentStatus={issue.status} />

      {/* Update Status */}
      <Select
        mt={4}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Verified">Verified</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </Select>

      <Button mt={4} colorScheme="purple" onClick={updateIssueStatus}>
        Update Status
      </Button>
    </Box>
  );
}

export default OfficerIssueDetails;
