// src/pages/RegisterPage.jsx
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
  Select,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <Flex
      minH="100vh"
      bg="gray.50"
      align="center"
      justify="center"
      px={4}
    >
      <Box
        w="100%"
        maxW="480px"
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
      >
        <Heading
          mb={2}
          textAlign="center"
          fontSize="2xl"
          color="gray.800"
        >
          Create your account
        </Heading>
        <Text
          mb={8}
          textAlign="center"
          fontSize="sm"
          color="gray.500"
        >
          Join CivicSense and start improving your community.
        </Text>

        <VStack spacing={5}>
          <FormControl>
            <FormLabel fontSize="sm">Full Name</FormLabel>
            <Input
              type="text"
              placeholder="Your Name"
              bg="gray.50"
              focusBorderColor="purple.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm">Email</FormLabel>
            <Input
              type="email"
              placeholder="you@example.com"
              bg="gray.50"
              focusBorderColor="purple.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm">Password</FormLabel>
            <Input
              type="password"
              placeholder="Create a password"
              bg="gray.50"
              focusBorderColor="purple.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm">Role</FormLabel>
            <Select
              bg="gray.50"
              focusBorderColor="purple.500"
              defaultValue="citizen"
            >
              <option value="citizen">Citizen</option>
              <option value="official">Municipal Officer</option>
              <option value="admin">Admin</option>
            </Select>
          </FormControl>

          <Button
            mt={2}
            w="100%"
            colorScheme="purple"
            size="md"
            borderRadius="lg"
          >
            Sign Up
          </Button>

          <Text fontSize="sm" color="gray.600">
            Already have an account?{" "}
            <ChakraLink as={Link} to="/login" color="purple.600">
              Login
            </ChakraLink>
          </Text>

          <ChakraLink
            as={Link}
            to="/"
            fontSize="xs"
            color="gray.500"
            textAlign="center"
          >
            ← Back to home
          </ChakraLink>
        </VStack>
      </Box>
    </Flex>
  );
}

export default RegisterPage;
