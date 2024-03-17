import {
  Box, Heading, Text, VStack, Flex, Avatar
} from "@chakra-ui/react";
import { useContext } from "react";
import dynamic from "next/dynamic";
import { UserContext } from "@/context/userContext";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Profile() {
  const userData = useContext(UserContext);

  return (
    <LayoutComponent>
      <Flex justify="center" align="center" h="80vh">
        <Box p="8" borderWidth="1px" borderRadius="lg" shadow="lg">
          <Flex align="center" mb="8">
            <Avatar name={userData?.name} size="xl" mr="4" />
            <Box>
              <Heading as="h1" size="xl" mb="2">
                {userData?.name}
              </Heading>
              <Text fontSize="lg" color="gray.600">
                @{userData?.email.split("@")[0] || "username"}
              </Text>
            </Box>
          </Flex>
          <VStack align="start" spacing="4">
            <Text>Email: {userData?.email}</Text>
            <Text>Date of Birth: {userData?.dob || "N/A"}</Text>
            <Text>Phone: {userData?.phone || "N/A"}</Text>
            <Text>Hobby: {userData?.hobby || "N/A"}</Text>
            <Text>
              Joined: {new Date(userData?.created_at).toLocaleDateString()}
            </Text>
            <Text>
              Last Updated:{" "}
              {new Date(userData?.updated_at).toLocaleDateString()}
            </Text>
          </VStack>
        </Box>
      </Flex>
    </LayoutComponent>
  );
}
