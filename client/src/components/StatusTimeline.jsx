import { Flex, Box, Text } from "@chakra-ui/react";

const steps = ["Pending", "Verified", "In Progress", "Resolved"];

export default function StatusTimeline({ currentStatus }) {
  return (
    <Flex mt={4} gap={4} wrap="wrap">
      {steps.map((step, index) => {
        const isCompleted = steps.indexOf(currentStatus) > index;
        const isCurrent = currentStatus === step;

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
                ? "purple.200"
                : "gray.300"
            }
            color={isCurrent ? "white" : "black"}
          >
            {step}
          </Box>
        );
      })}
    </Flex>
  );
}
