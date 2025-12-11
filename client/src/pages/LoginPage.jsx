// src/pages/LoginPage.jsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link as ChakraLink
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../utils/api";

function LoginPage() {
  const navigate = useNavigate();

  // FORM STATE
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // BACKEND LOGIN FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return alert(data.message || "Login failed");
      }

      alert("Login successful!");

      // SAVE TOKEN + ROLE + USER ID
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);

      // REDIRECT BASED ON ROLE
      if (data.user.role === "citizen") navigate("/user-dashboard");
      else if (data.user.role === "admin") navigate("/admin-dashboard");
      else if (data.user.role === "officer") navigate("/officer-dashboard");

    } catch (error) {
      console.error(error);
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
        w={{ base: "90%", md: "400px" }}
        p={8}
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
      >
        <Heading textAlign="center" fontSize="2xl" color="gray.800">
          Welcome Back
        </Heading>

        <Text mt={2} textAlign="center" fontSize="md" color="gray.500">
          Login to continue reporting and managing civic issues
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4} mt={8}>
            {/* EMAIL */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* PASSWORD */}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              bg="purple.600"
              color="white"
              w="100%"
              _hover={{ bg: "purple.700" }}
              isLoading={loading}
            >
              Login
            </Button>
          </Stack>
        </form>

        <Text mt={4} textAlign="center">
          Don’t have an account?{" "}
          <ChakraLink as={Link} to="/register" color="purple.600">
            Register
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
}

export default LoginPage;
