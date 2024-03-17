import {
  Flex,
  Stack,
  Heading,
  FormControl,
  Input,
  Button,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "../hooks/useMutation";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const HandleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex alignItems="center" justifyContent="center" h="100vh">
      <Stack spacing={8} p={8} rounded="lg" bg="gray.50" boxShadow="lg">
        <Heading as="h4" size="lg" textAlign="center">
          Login
        </Heading>
        <FormControl>
          <Input
            value={payload.email}
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            placeholder="Email"
            variant="flushed"
          />
        </FormControl>
        <FormControl>
          <InputGroup>
            <Input
              value={payload.password}
              onChange={(e) => setPayload({ ...payload, password: e.target.value })}
              placeholder="Password"
              variant="flushed"
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={HandleTogglePassword}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button onClick={HandleSubmit} colorScheme="blue" size="lg">
          Login
        </Button>
        <Link href="/register" className="text-blue-500" textAlign="center">
          Don&apos;t have an account? Click here
        </Link>
      </Stack>
    </Flex>
  );
}
