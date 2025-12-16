import { Flex, Box, Text } from "@chakra-ui/react";

const steps = ["Pending", "Verified", "In Progress", "Resolved"];

export default function StatusTimeline({ currentStatus }) {
  return (
    <Flex mt={4} gap={4} wrap="wrap">
      {steps.map((step) => {
        const currentIndex = steps.indexOf(currentStatus);
        const stepIndex = steps.indexOf(step);

        const isCurrent = stepIndex === currentIndex;
        const isCompleted = stepIndex < currentIndex;

        return (
          <Box
            key={step}
            px={4}
            py={2}
            borderRadius="md"
            fontWeight="bold"
            textAlign="center"
            bg={
              isCurrent
                ? "purple.600"
                : isCompleted
                ? "purple.300"
                : "gray.300"
            }
            color={isCurrent ? "white" : "black"}
            boxShadow={isCurrent ? "md" : "none"}
          >
            {step}
          </Box>
        );
      })}
    </Flex>
  );
}
