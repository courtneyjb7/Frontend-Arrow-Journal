import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Text,
  IconButton,
  Flex,
  Spacer,
  Box,
  Heading,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

function JournalEntry(props) {
  const navigate = useNavigate();

  function EntryHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    return (
      <Flex>
        <Spacer />
        <Box p="4">
          <Heading>
            <Text fontSize={"6xl"}>{props.pageType}</Text>
          </Heading>
        </Box>
        <Spacer />
        <Box p="4">
          <IconButton
            variant="outline"
            onClick={onOpen}
            colorScheme="teal"
            aria-label="Save and Exit"
            icon={<CloseIcon />}
          />
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>
                Done Journaling? Save Before Exiting
              </AlertDialogHeader>
              <AlertDialogCloseButton />

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button colorScheme="red" ml={3} onClick={() => makePostCall()}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Box>
      </Flex>
    );
  }

  async function makePostCall() {
    // const navigate = useNavigate();
    try {
      const fullDate = props.date;
      const month = (parseInt(fullDate.getMonth(), 10) + 1).toString(); //Jan is 0
      const dateStr =
        month + "-" + fullDate.getDate() + "-" + fullDate.getFullYear(); //mm-dd-yyyy

      const sumbitEntry = {
        date: dateStr,
        entry_type: "Personal",
        mood: props.entry.mood,
        moodColor: props.entry.moodColor,
        moodIcon: props.entry.moodIcon,
        free_write_response: props.entry.PersonalPrompt1,
        positives_response: props.entry.PersonalPrompt2,
        goals_response: props.entry.PersonalPrompt3,
        random_answer: props.entry.PersonalPrompt4,
      };
      const response = await axios.post(
        `http://localhost:5000/entry/${props.email}`,
        sumbitEntry
      );
      console.log(response);
      navigate("/monthly", { state: { name: props.name, email: props.email } });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <Box>
      <EntryHeader></EntryHeader>
      {props.entryform()}
    </Box>
  );
}

export default JournalEntry;
