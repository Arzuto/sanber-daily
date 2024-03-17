import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import {
  Box,
  Text,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Divider,
  HStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";
import { useMutation } from "@/hooks/useMutation";
import { UserContext } from "@/context/userContext";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Main() {
  const router = useRouter();
  const userData = useContext(UserContext);
  const { mutate } = useMutation();
  const [newPost, setNewPost] = useState("");
  const { data, isLoading, isError } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("err => ", err));
  }, []);

  const handleDelete = async (postId) => {
    try {
      const result = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${postId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`
        }
      });
      console.log("Post deleted successfully:", result);
      router.replace(router.asPath);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (postId) => {
    console.log("Editing post with ID:", postId);
  };

  const handleAddPost = async () => {
    try {
      // Construct the post data object
      const postData = {
        description: newPost,
        // Add any other necessary fields for the new post
      };
  
      // Send a POST request to add the new post
      const response = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add post");
      }
  
      router.replace(router.asPath);

      setNewPost("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <LayoutComponent metaTitle="Home" metaDescription="Ini adalah halaman menu utama">
      <VStack spacing={4} align="stretch" p={4}>
        {/* Form to add a new post */}
        <FormControl>
          <FormLabel>New Post</FormLabel>
          <Input
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            variant="filled"
          />
          <Button onClick={handleAddPost} colorScheme="blue" mt={2}>
            Post
          </Button>
        </FormControl>

        <Divider />

        {/* Displaying posts */}
        {isLoading ? (
          <Text>Loading data...</Text>
        ) : isError ? (
          <Text>Error fetching data</Text>
        ) : (
          <VStack spacing={4} align="stretch" w="100%">
            {data?.data?.map((item) => (
              <Box
                key={item.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                shadow="md"
                w="100%"
              >
                <Text>{item.user.name}</Text>
                <Text>{item.description}</Text>
                {/* Edit and Delete buttons */}
                {userData && userData.id === item.user.id && (
                  <HStack mt={2}>
                    <Button
                      onClick={() => handleEdit(item.id)}
                      colorScheme="teal"
                      variant="ghost"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      colorScheme="red"
                      variant="ghost"
                    >
                      Delete
                    </Button>
                  </HStack>
                )}
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </LayoutComponent>
  );
}
