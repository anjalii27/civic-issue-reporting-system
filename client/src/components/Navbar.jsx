// src/components/Navbar.jsx
import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// TEMPORARY ROLE FOR TESTING
// Change to "admin" to see admin UI
// Change to "citizen" for user dashboard
// Change to null for logged-out view
//const userRole = "citizen";  
// const userRole = "admin";
//const userRole = null;
const userRole = localStorage.getItem("role");

function Navbar() {
  return (
    <Box
      bg="white"
      px={8}
      py={4}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center">

        {/* LEFT: Logo */}
        <Heading fontSize="xl" color="purple.600">
          <Link to="/">CivicSense</Link>
        </Heading>

        {/* CENTER: Navigation Links */}
        <Flex gap={8} align="center">
          <ChakraLink as={Link} to="/" color="gray.700">
            Home
          </ChakraLink>

          <ChakraLink as={Link} to="/contact" color="gray.700">
            Contact
          </ChakraLink>
        </Flex>

        {/* RIGHT: Auth / Dashboard Buttons */}
        <Flex gap={6} align="center">

          {/* Citizen Dashboard */}
          {userRole === "citizen" && (
            <ChakraLink as={Link} to="/dashboard" color="gray.700">
              Dashboard
            </ChakraLink>
          )}

          {/* Admin Dashboard */}
          {userRole === "admin" && (
            <ChakraLink as={Link} to="/admin" color="gray.700">
              Admin Panel
            </ChakraLink>
          )}

          {/* If NOT logged in, show Login and Sign Up */}
          {!userRole && (
            <>
              <ChakraLink as={Link} to="/login" color="gray.700">
                Login
              </ChakraLink>

              <Button
                as={Link}
                to="/register"
                bg="purple.600"
                color="white"
                _hover={{ bg: "purple.700" }}
                borderRadius="md"
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
