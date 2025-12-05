// src/pages/LoginPage.jsx
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
import { Link } from "react-router-dom";

function LoginPage() {
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
        maxW="420px"
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
          Welcome back 👋
        </Heading>
        <Text
          mb={8}
          textAlign="center"
          fontSize="sm"
          color="gray.500"
        >
          Login to continue reporting and tracking civic issues.
        </Text>

        <VStack spacing={5}>
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
              placeholder="Enter your password"
              bg="gray.50"
              focusBorderColor="purple.500"
            />
          </FormControl>

          <Button
            mt={2}
            w="100%"
            colorScheme="purple"
            size="md"
            borderRadius="lg"
          >
            Login
          </Button>

          <Text fontSize="sm" color="gray.600">
            Don&apos;t have an account?{" "}
            <ChakraLink as={Link} to="/register" color="purple.600">
              Sign up
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

export default LoginPage;
