import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from "@/context/userContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  );
}
