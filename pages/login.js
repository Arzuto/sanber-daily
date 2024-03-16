import {
  Flex, Stack, Heading, FormControl, Input, Button, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMutation } from "../hooks/useMutation";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    const response = await mutate({ url: "https://paace-f178cafcae7b.nevacloud.io/api/login", payload });
    // console.log("response => ", response)
    if (!response?.success) {
      toast({
        title: "Login Gagal",
        description: "email dan password tidak sesuai",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
    } else {
      Cookies.set("user_token", response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: "/"
      });
      router.push("/");
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Stack direction="column">
        <Heading as="h4">Login</Heading>
        <FormControl>
          <Input value={payload?.email} onChange={(event) => setPayload({ ...payload, email: event.target.value })} placeholder="email" />
        </FormControl>
        <FormControl>
          <Input value={payload?.password} onChange={(event) => setPayload({ ...payload, password: event.target.value })} placeholder="password" type="password" />
        </FormControl>
        <FormControl>
          <Button onClick={() => HandleSubmit()}>Login</Button>
        </FormControl>
      </Stack>
    </Flex>
  );
}
