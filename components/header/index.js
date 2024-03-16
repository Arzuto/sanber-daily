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

  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/users">User</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {userData?.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => HandleLogout()}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </li>
      </ul>
    </div>
  );
}
