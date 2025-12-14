import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../utils/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending data:", formData);

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // sending only name, email, password
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <Flex minH="100vh" bg="gray.50" align="center" justify="center" p={4}>
      <Box
        w="100%"
        maxW="480px"
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
      >
        <Heading mb={2} textAlign="center" fontSize="2xl" color="gray.800">
          Create your account
        </Heading>

        <Text mb={8} textAlign="center" fontSize="sm" color="gray.500">
          Join CivicSense to report and track civic issues!
        </Text>

        {/* IMPORTANT — only this form, NO register() call anywhere */}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Button type="submit" colorScheme="purple" width="100%" mt={4}>
              Register
            </Button>
          </VStack>
        </form>

        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <ChakraLink as={Link} color="purple.600" to="/login">
            Login
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default RegisterPage;
