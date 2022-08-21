//import useState hook to create menu collapse state
import React from "react";

//import react pro sidebar components
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FiSun, FiLogOut, FiMeh, FiSmile, FiFrown } from "react-icons/fi";

import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  VStack,
  Box,
  StackDivider,
  Heading,
} from "@chakra-ui/react";
import mainLogo from "../../Arrow.png";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";
import TagsInput from "./TagInput";

const Header = (props) => {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var today = props.date;
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var day = days[today.getDay()];
  var month = months[today.getMonth()];
  today = mm + "/" + dd;
  return (
    <>
      <div id="header">
        <ProSidebar collapsed={false}>
          <SidebarHeader
            style={{ height: "10%", paddingBottom: "10%", paddingLeft: "3%" }}
          >
            <div className="logotext">
              <img src={mainLogo} alt={""} />
            </div>
          </SidebarHeader>
          <SidebarContent style={{ paddingTop: "10%", paddingLeft: "3%" }}>
            <VStack
              align="stretch"
              divider={<StackDivider borderColor="gray.200" />}
            >
              <Box>
                <Heading>
                  {" "}
                  {day}, {month} {dd}
                </Heading>
              </Box>

              <Box>
                <Menu iconShape="square">
                  <MenuButton
                    as={Button}
                    leftIcon={props.entry.moodIcon}
                    colorScheme={props.entry.moodColor}
                  >
                    {props.entry.mood}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      icon={<FiSun />}
                      onClick={() =>
                        props.setEntry({
                          PersonalPrompt1: props.entry["PersonalPrompt1"],
                          PersonalPrompt2: props.entry["PersonalPrompt2"],
                          PersonalPrompt3: props.entry["PersonalPrompt3"],
                          PersonalPrompt4: props.entry["PersonalPrompt4"],
                          mood: "Great",
                          moodColor: "purple",
                          moodIcon: <FiSun />,
                        })
                      }
                    >
                      Great
                    </MenuItem>
                    <MenuItem
                      icon={<FiSmile />}
                      onClick={() =>
                        props.setEntry({
                          PersonalPrompt1: props.entry["PersonalPrompt1"],
                          PersonalPrompt2: props.entry["PersonalPrompt2"],
                          PersonalPrompt3: props.entry["PersonalPrompt3"],
                          PersonalPrompt4: props.entry["PersonalPrompt4"],
                          mood: "Good",
                          moodColor: "green",
                          moodIcon: <FiSmile />,
                        })
                      }
                    >
                      Good
                    </MenuItem>
                    <MenuItem
                      icon={<FiMeh />}
                      onClick={() =>
                        props.setEntry({
                          PersonalPrompt1: props.entry["PersonalPrompt1"],
                          PersonalPrompt2: props.entry["PersonalPrompt2"],
                          PersonalPrompt3: props.entry["PersonalPrompt3"],
                          PersonalPrompt4: props.entry["PersonalPrompt4"],
                          mood: "Ok",
                          moodColor: "yellow",
                          moodIcon: <FiMeh />,
                        })
                      }
                    >
                      Ok
                    </MenuItem>
                    <MenuItem
                      icon={<FiFrown />}
                      onClick={() =>
                        props.setEntry({
                          PersonalPrompt1: props.entry["PersonalPrompt1"],
                          PersonalPrompt2: props.entry["PersonalPrompt2"],
                          PersonalPrompt3: props.entry["PersonalPrompt3"],
                          PersonalPrompt4: props.entry["PersonalPrompt4"],
                          mood: "Bad",
                          moodColor: "red",
                          moodIcon: <FiFrown />,
                        })
                      }
                    >
                      Bad
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box display="flex" mt="2">
                <VStack>
                  <Heading>Pages</Heading>
                  <Box>
                    <Button onClick={() => props.setPage("Personal Page")}>
                      Personal
                    </Button>
                  </Box>
                </VStack>
              </Box>
              <Box display="flex" mt="2" alignItems="center">
                <TagsInput tags={props.tags} setTags={props.setTags} />
              </Box>
            </VStack>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
