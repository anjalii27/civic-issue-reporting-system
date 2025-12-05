
import IssueMap from "../components/IssueMap";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

function ReportIssue() {
  const [imagePreview, setImagePreview] = useState(null);

  // Preview uploaded image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <Flex
      minH="100vh"
      bg="gray.50"
      align="center"
      justify="center"
      px={4}
      py={16}
    >
      <Box
        w="100%"
        maxW="650px"
        bg="white"
        p={10}
        borderRadius="2xl"
        boxShadow="2xl"
      >
        <Heading mb={3} fontSize="2xl" color="gray.800" textAlign="center">
          Report an Issue
        </Heading>

        <Text
          fontSize="sm"
          color="gray.500"
          textAlign="center"
          mb={8}
        >
          Help your community by reporting issues you notice.
        </Text>

        <VStack spacing={6}>

          {/* Issue Title */}
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Brief issue title"
              bg="gray.50"
              focusBorderColor="purple.500"
            />
          </FormControl>

          {/* Category */}
          <FormControl>
            <FormLabel>Issue Category</FormLabel>
            <Select
              bg="gray.50"
              focusBorderColor="purple.500"
              placeholder="Select a category"
            >
              <option value="pothole">Pothole</option>
              <option value="garbage">Garbage Overflow</option>
              <option value="streetlight">Streetlight Issue</option>
              <option value="water">Water Leakage</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>

          {/* Description */}
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Describe the issue in detail..."
              bg="gray.50"
              focusBorderColor="purple.500"
              resize="none"
            />
          </FormControl>

          {/* Location Input */}
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Example: Near Sector 12 park"
              bg="gray.50"
              focusBorderColor="purple.500"
            />
          </FormControl>

          {/* Image Upload */}
          <FormControl>
            <FormLabel>Upload Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              bg="gray.50"
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <Box
                mt={3}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                maxH="200px"
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Box>
            )}
          </FormControl>
        <FormControl>
  <FormLabel>Select Location on Map</FormLabel>
  <IssueMap location={location} setLocation={setLocation} />

  {location && (
    <Text fontSize="sm" color="gray.600" mt={2}>
      Selected: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
    </Text>
  )}
</FormControl>
  
// state for location
const [location, setLocation] = useState(null);

          {/* Submit Button */}
          <Button
            colorScheme="purple"
            w="100%"
            size="lg"
            borderRadius="lg"
          >
            Submit Issue
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default ReportIssue;
