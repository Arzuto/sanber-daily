import Link from "next/link";

import {
  Menu, MenuButton, MenuItem, MenuList, Button
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";
import styles from "./styles.module.css";
import { UserContext } from "@/context/userContext";

export default function Header() {
  const userData = useContext(UserContext);
  const router = useRouter();
  const { mutate } = useMutation();
  // const { data } =  useQueries({
  //   prefixUrl:"https://paace-f178cafcae7b.nevacloud.io/api/user/me",
  //   headers:{
  //     'Authorization': `Bearer ${Cookies.get('user_token')}`
  //   }
  // })

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`
      }
    });
    if (!response?.success) {
      console.log("gagal log out");
    } else {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };

  const isActive = (href) => (router.pathname === href ? "text-2xl font-bold underline text-blue-500" : "");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ul style={{ listStyleType: "none", display: "flex", alignItems: "center" }}>
        <li style={{ marginRight: "1rem" }}>
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
        </li>
        <li style={{ marginRight: "1rem" }}>
          <Link href="/profile" className={isActive("/profile")}>
            Profile
          </Link>
        </li>
        <li style={{ marginRight: "1rem" }}>
          <Link href="/users" className={isActive("/users")}>
            User
          </Link>
        </li>
        <li style={{ marginRight: "1rem" }}>
          <Link href="/notes" className={isActive("/notes")}>
            Notes
          </Link>
        </li>
        <li style={{ marginRight: "1rem" }}>
          <Link href="/posts" className={isActive("/posts")}>
            Posts
          </Link>
        </li>
        <li style={{ marginLeft: "auto" }}>
          <Menu>
            <MenuButton as={Button} colorScheme="blue" rightIcon={<ChevronDownIcon />}>
              {userData?.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={HandleLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </li>
      </ul>
    </div>
  );
}
