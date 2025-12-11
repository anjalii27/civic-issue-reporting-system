import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Button
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");   // citizen/admin/officer/null

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

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

          {/* If user is NOT logged in → show Login + Sign Up */}
          {!userRole && (
            <>
              <ChakraLink as={Link} to="/login" color="gray.700">
                Login
              </ChakraLink>

              <ChakraLink
                as={Link}
                to="/register"
                bg="purple.600"
                color="white"
                px={4}
                py={2}
                borderRadius="md"
                _hover={{ bg: "purple.700" }}
              >
                Sign Up
              </ChakraLink>
            </>
          )}

          {/* Citizen Dashboard */}
          {userRole === "citizen" && (
            <ChakraLink as={Link} to="/user-dashboard" color="gray.700">
              Dashboard
            </ChakraLink>
          )}

          {/* Admin Dashboard */}
          {userRole === "admin" && (
            <ChakraLink as={Link} to="/admin-dashboard" color="gray.700">
              Admin Panel
            </ChakraLink>
          )}

          {/* Officer Dashboard */}
          {userRole === "officer" && (
            <ChakraLink as={Link} to="/officer-dashboard" color="gray.700">
              Officer Panel
            </ChakraLink>
          )}

          {/* If user is logged in → show Logout */}
          {userRole && (
            <Button
              bg="red.500"
              color="white"
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ bg: "red.600" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
