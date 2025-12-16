import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../../utils/api";

export default function AddAdmin() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const toast = useToast();
  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/create-admin`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Admin created successfully!",
        status: "success",
        duration: 3000,
      });

      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Error creating admin",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} bg="white" p={6} borderRadius="lg" boxShadow="lg">
      <Heading size="md" mb={4} textAlign="center">
        Create Admin
      </Heading>

      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input
            name="name"
            placeholder="Admin name"
            value={form.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Set password"
            value={form.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button width="100%" colorScheme="purple" onClick={handleSubmit}>
          Create Admin
        </Button>
      </VStack>
    </Box>
  );
}
