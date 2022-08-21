import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import {
  FormLabel,
  FormControl,
  // Button,
  Spacer,
  Grid,
  Heading,
  Textarea,
  Flex,
} from "@chakra-ui/react";
// import { TriangleDownIcon} from '@chakra-ui/icons'
import Journal from "./Journal";
import Header from "../sidebar/Header";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";

function Daily(props) {
  const location = useLocation();
  const [pageType, setPageType] = useState("Personal Page");
  const [tags, setTags] = useState([]);

  const titles = [
    "Free Write",
    "Focus on the Positive!",
    "Goals",
    "Random Prompt",
  ];

  var randomPropmts = [
    "What is your favorite color and why?",
    "What is your favorite song and why?",
    "What is your favorite food and why?",
    "Who is most important to you?",
    "What never fails to make you smile?",
  ];

  var randomPropmt =
    randomPropmts[Math.floor(Math.random() * randomPropmts.length)];
  const placeholders = [
    "Write about your day!",
    "What were 4 good things that happened today?",
    "Did you work to achieve your goals?",
    randomPropmt,
  ];

  async function getEntryCall() {
    try {
      const email = location.state.email;
      const fullDate = location.state.date;

      const month = (parseInt(fullDate.getMonth(), 10) + 1).toString(); //Jan is 0
      const dateStr =
        month + "-" + fullDate.getDate() + "-" + fullDate.getFullYear();
      const type = "Personal";

      const response = await axios.get(
        `http://localhost:5000/entry/${email}/${dateStr}/${type}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const [entry, setEntry] = useState({
    PersonalPrompt1: "",
    PersonalPrompt2: "",
    PersonalPrompt3: "",
    PersonalPrompt4: "",
    mood: "Select Mood",
    moodColor: "blue",
    moodIcon: <FiChevronDown />,
  });

  useEffect(() => {
    getEntryCall().then((result) => {
      if (result.status === 200) {
        const data = result.data.entries_list;
        setEntry({
          PersonalPrompt1: data.free_write_response,
          PersonalPrompt2: data.positives_response,
          PersonalPrompt3: data.goals_response,
          PersonalPrompt4: data.random_answer,
          mood: data.mood,
          moodColor: data.moodColor,
          moodIcon: data.moodIcon,
        });
      } else {
        console.log("error");
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "prompt1")
      setEntry({
        PersonalPrompt1: value,
        PersonalPrompt2: entry["PersonalPrompt2"],
        PersonalPrompt3: entry["PersonalPrompt3"],
        PersonalPrompt4: entry["PersonalPrompt4"],
        mood: entry.mood,
        moodColor: entry.moodColor,
        moodIcon: entry.moodIcon,
      });
    else if (name === "prompt2")
      setEntry({
        PersonalPrompt1: entry["PersonalPrompt1"],
        PersonalPrompt2: value,
        PersonalPrompt3: entry["PersonalPrompt3"],
        PersonalPrompt4: entry["PersonalPrompt4"],
        mood: entry.mood,
        moodColor: entry.moodColor,
        moodIcon: entry.moodIcon,
      });
    else if (name === "prompt3")
      setEntry({
        PersonalPrompt1: entry["PersonalPrompt1"],
        PersonalPrompt2: entry["PersonalPrompt2"],
        PersonalPrompt3: value,
        PersonalPrompt4: entry["PersonalPrompt4"],
        mood: entry.mood,
        moodColor: entry.moodColor,
        moodIcon: entry.moodIcon,
      });
    else
      setEntry({
        PersonalPrompt1: entry["PersonalPrompt1"],
        PersonalPrompt2: entry["PersonalPrompt2"],
        PersonalPrompt3: entry["PersonalPrompt3"],
        PersonalPrompt4: value,
        mood: entry.mood,
        moodColor: entry.moodColor,
        moodIcon: entry.moodIcon,
      });
  }

  function entryForm() {
    function submitForm() {
      console.log(props.entry);
      props.handleSubmit(props.entry);
    }

    return (
      <Flex>
        <Spacer></Spacer>
        <form onSubmit={submitForm}>
          <FormControl>
            <FormLabel htmlFor="prompt1">
              <Heading>{titles[0]}</Heading>
            </FormLabel>
            <Textarea
              id="prompt1"
              name="prompt1"
              onChange={handleChange}
              height={"200px"}
              width={"1000px"}
              placeholder={placeholders[0]}
              value={entry.PersonalPrompt1}
            />
            <Grid templateColumns="repeat(2, 1fr)">
              <Box>
                <FormLabel htmlFor="prompt2">
                  <Heading>{titles[1]}</Heading>
                </FormLabel>
                <Textarea
                  id="prompt2"
                  name="prompt2"
                  height={"200px"}
                  width={"500px"}
                  onChange={handleChange}
                  placeholder={placeholders[1]}
                  value={entry.PersonalPrompt2}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="prompt3">
                  <Heading>{titles[2]}</Heading>
                </FormLabel>
                <Textarea
                  id="prompt3"
                  name="prompt3"
                  height={"200px"}
                  width={"500px"}
                  onChange={handleChange}
                  placeholder={placeholders[2]}
                  value={entry.PersonalPrompt3}
                />
              </Box>
            </Grid>
            <FormLabel htmlFor="prompt4">
              <Heading>{titles[3]}</Heading>
            </FormLabel>
            <Textarea
              id="prompt4"
              name="prompt4"
              height={"200px"}
              width={"1000px"}
              onChange={handleChange}
              placeholder={placeholders[3]}
              value={entry.PersonalPrompt4}
            />
          </FormControl>
          {/* <Button mt={4} colorScheme="teal" type="submit">
            Save
          </Button> */}
        </form>
        <Spacer></Spacer>
      </Flex>
    );
  }

  return (
    <Box alight="center">
      <Header
        entry={entry}
        setEntry={setEntry}
        tags={tags}
        setTags={setTags}
        pageType={pageType}
        setPage={setPageType}
        date={location.state.date}
      ></Header>
      <Journal
        entry={entry}
        setEntry={setEntry}
        handleChange={handleChange}
        pageType={pageType}
        date={location.state.date}
        userName={location.state.name}
        email={location.state.email}
        entryform={entryForm}
      ></Journal>
    </Box>
  );
}

export default Daily;
// exports.entryForm = Daily.entryForm();
