// src/pages/ReportIssue.jsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  Stack,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";

function ReportIssue() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("location", formData.location);

      // Append image only if selected
      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      }

      const res = await fetch(`${API_URL}/api/issues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // No content-type for FormData
        },
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return alert(data.message || "Issue submission failed");
      }

      alert("Issue reported successfully!");
      navigate("/user-dashboard");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <Box
      w="100%"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="#f3f4f6"
      px={4}
    >
      <Box
        w={{ base: "90%", md: "500px" }}
        p={8}
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
      >
        <Heading textAlign="center" mb={6} fontSize="2xl">
          Report an Issue
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>

            <FormControl>
              <FormLabel>Issue Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter issue title"
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue"
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Select category"
                required
              >
                <option value="Road Damage">Road Damage</option>
                <option value="Garbage">Garbage</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Street Light">Street Light</option>
              </Select>
            </FormControl>
        
            <FormControl>
             <FormLabel>Location</FormLabel>
              <Input
               name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
         </FormControl>

            <FormControl>
              <FormLabel>Upload Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imageFile: e.target.files[0],
                  })
                }
              />
            </FormControl>

            <Button
              type="submit"
              bg="purple.600"
              color="white"
              _hover={{ bg: "purple.700" }}
              isLoading={loading}
            >
              Submit Issue
            </Button>

          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default ReportIssue;
