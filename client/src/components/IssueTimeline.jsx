import { Box, Flex, Text, VStack, Circle } from "@chakra-ui/react";

const steps = [
  "Submitted",
  "Verified",
  "In Progress",
  "Resolved",
];

export default function IssueTimeline({ currentStep }) {
  return (
    <VStack align="start" spacing={8} mt={6}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <Flex key={index} align="start" gap={4}>
            {/* Circle */}
            <Circle
              size="18px"
              bg={
                isCompleted
                  ? "green.500"
                  : isActive
                  ? "purple.500"
                  : "gray.300"
              }
            />

            {/* Step Text */}
            <Box>
              <Text
                fontWeight={isActive ? "bold" : "normal"}
                color={
                  isCompleted
                    ? "green.600"
                    : isActive
                    ? "purple.600"
                    : "gray.500"
                }
              >
                {step}
              </Text>

              {/* Line below circle (except last) */}
              {index < steps.length - 1 && (
                <Box
                  height="40px"
                  borderLeft="2px solid"
                  borderColor={
                    isCompleted ? "green.500" : "gray.300"
                  }
                  ml="7px"
                  mt="2px"
                />
              )}
            </Box>
          </Flex>
        );
      })}
    </VStack>
  );
}
