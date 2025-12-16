import { Box, Flex, Text, Link, VStack } from "@chakra-ui/react";

function Footer() {
  return (
    <Box id="contact" bg="gray.900" color="white" py={10} px={8} mt={20}>
      <Flex
        maxW="1200px"
        mx="auto"
        justify="space-between"
        flexWrap="wrap"
        gap={10}
      >
        {/* LEFT SECTION */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="bold" fontSize="xl">
            CivicSense
          </Text>
          <Text maxW="260px" color="gray.400">
            Empowering communities to report, track, and resolve civic issues.
          </Text>
        </VStack>

        {/* QUICK LINKS */}
        <VStack align="flex-start" spacing={2}>
          <Text fontWeight="bold">Quick Links</Text>

          <Link href="#top" color="gray.400" _hover={{ color: "white" }}>
            Home
          </Link>

          <Link href="#features" color="gray.400" _hover={{ color: "white" }}>
            Features
          </Link>
        </VStack>

      </Flex>
    </Box>
  );
}

export default Footer;
