import {
  Flex,
  Stack,
  Heading,
  FormControl, Input,
  Button,
  Link,
  IconButton,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useMutation } from "@/hooks/useMutation";

export default function Register() {
  const toast = useToast();
  const router = useRouter();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const HandleSubmit = async () => {
    const response = await mutate({ url: "https://paace-f178cafcae7b.nevacloud.io/api/register", payload });
    // console.log("response => ", response)
    if (!response?.success) {
      toast({
        title: "Register Gagal",
        description: "akun dengan email ini sudah terdaftar",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
    } else {
      router.push("/login");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex alignItems="center" justifyContent="center" h="100vh">
      <Stack spacing={8} p={8} rounded="lg" bg="gray.50" boxShadow="lg">
        <Heading as="h4" size="lg" textAlign="center">
          Register
        </Heading>
        <FormControl>
          <Input
            value={payload.name}
            onChange={(e) => setPayload({ ...payload, name: e.target.value })}
            placeholder="Name"
            variant="flushed"
          />
        </FormControl>
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
                onClick={handleTogglePassword}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button onClick={HandleSubmit} colorScheme="blue" size="lg">
          Register
        </Button>
        <Link href="/login" color="blue.500" textAlign="center">
          Already have an account? Login here
        </Link>
      </Stack>
    </Flex>
  );
}
