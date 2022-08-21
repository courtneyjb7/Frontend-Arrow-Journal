import React, { useState } from "react";
import {
  Flex,
  Text,
  Divider,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import NavItem from "./NavItem";

export default function Sidebar() {
  const [mood, setMood] = useState(["grey", "Select Mood"]);
  // exports.mood = mood;
  // exports.setMood = setMood;
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={"30px"}
      w={"200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex p="5%" flexDir="column" w="100%" alignItems={"flex-start"} as="nav">
        <Menu autoselect={false}>
          <MenuButton
            as={Button}
            aria-label="Options"
            background={mood[0]}
            mt={5}
          >
            {mood[1]}
          </MenuButton>
          <MenuList>
            <MenuItem
              background="purple"
              onClick={() => setMood(["purple", "Great"])}
            >
              Amazing
            </MenuItem>
            <MenuItem
              background="teal"
              onClick={() => setMood(["teal", "Good"])}
            >
              Good
            </MenuItem>
            <MenuItem
              background="yellow"
              onClick={() => setMood(["yellow", "Ok"])}
            >
              Ok
            </MenuItem>
            <MenuItem background="red" onClick={() => setMood(["red", "Bad"])}>
              Bad...
            </MenuItem>
          </MenuList>
        </Menu>

        <NavItem icon={<AddIcon />} title="Add Page" />
        <NavItem icon={<AddIcon />} title="Add Tags" />
      </Flex>

      <Flex p="5%" flexDir="column" w="100%" alignItems={"flex-start"} mb={4}>
        <Divider display={"flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex flexDir="column" ml={4} display={"flex"}>
            <Heading as="h3" size="sm">
              BJ
            </Heading>
            <Text color="gray">Journalist</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
