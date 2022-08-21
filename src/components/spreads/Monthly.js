import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "./Monthly.css";
import axios from "axios";
import {
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Heading,
  HStack,
  VStack,
  Tr,
  Td,
  Table,
  ButtonGroup,
  IconButton,
  Editable,
  EditablePreview,
  Input,
  Tbody,
  useEditableControls,
  EditableTextarea,
  Image,
} from "@chakra-ui/react";
import fire from "../../fire.js";
import { CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar, AvatarGroup } from "@chakra-ui/react";

function Monthly() {
  const [dumps, setDumps] = useState([]);

  function checkUser() {
    const user = fire.auth().currentUser;
    return user.email;
  }

  const email = checkUser();

  function editOneDump(index, dumpToUpdate) {
    const updatedDump = makePutCall(dumps[index], dumpToUpdate);
    const updated = dumps;
    updated[index] = updatedDump;

    setDumps(updated);
  }

  function removeOneDump(index) {
    const dumpId = dumps[index]._id;
    makeDeleteCall(dumpId).then((result) => {
      if (result.status === 204) {
        const updated = dumps.filter((dump, i) => {
          return i !== index;
        });
        setDumps(updated);
      }
    });
  }

  async function makePostCall(dump, email) {
    try {
      const response = await axios.post(
        `http://localhost:5000/dumps/${email}`,
        dump
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePutCall(dump, dumpToUpdate) {
    try {
      const response = await axios.put(
        `http://localhost:5000/dumps/${email}/${dump._id}`,
        dumpToUpdate
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(dumpId) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/dumps/${email}/${dumpId}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateBrainDump(dump) {
    makePostCall(dump, email).then((result) => {
      if (result && result.status === 201) {
        setDumps([...dumps, result.data]);
      }
    });
  }

  async function fetchAll() {
    try {
      const response = await axios.get(`http://localhost:5000/dumps/${email}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setDumps(result);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <VStack className="monthly">
      <Image className="logo" src="Arrow.png" alt="Arrow Journal" />
      <WelcomeMessage className="welcome" />
      <HStack className="body">
        <MonthlyCalendar />
        <VStack className="brainDump">
          <BrainDumpForm handleSave={updateBrainDump} />
          <BrainDump
            dumpData={dumps}
            handleSave={editOneDump}
            removeDump={removeOneDump}
          />
        </VStack>
      </HStack>
    </VStack>
  );
}

function WelcomeMessage() {
  var today = new Date();
  const { state } = useLocation();
  const navigate = useNavigate();

  let days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  let months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  function goToProfile() {
    navigate("/profile", { state: state });
  }
  const first = state.name.split(" ")[0];
  return (
    <Stack spacing={8} direction="row">
      <Heading className="welcome">
        Hi, {first}! Today is {days[today.getDay()]}, {months[today.getMonth()]}{" "}
        {today.getDate()} {today.getFullYear()}.
      </Heading>
      <AvatarGroup spacing="1rem">
        <Avatar bg="BLACK" onClick={goToProfile} _hover={{ bg: "#3082ce" }} />
      </AvatarGroup>
    </Stack>
  );
}

function MonthlyCalendar() {
  const [date, onChange] = useState(new Date());
  const navigate = useNavigate();
  const { state } = useLocation();
  const [entries, setEntries] = useState([]);

  function routeToDaily(props) {
    navigate("/daily", {
      state: { date: props, email: state.email, name: state.name },
    });
  }

  async function fetchAll() {
    try {
      const response = await axios.get(
        `http://localhost:5000/entry/${state.email}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setEntries(result);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getMoods(d, v) {
    for (let i = 0; i < entries.length; i++) {
      let dateParts = entries[i].date.split("-");
      let parsedDate = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);

      if (v === "month") {
        if (
          d.getMonth() === parsedDate.getMonth() &&
          d.getDate() === parsedDate.getDate() &&
          d.getYear() === parsedDate.getYear()
        ) {
          return entries[i].mood;
        }
      }
    }

    return null;
  }

  return (
    <Calendar
      onChange={onChange}
      value={date}
      onClickDay={routeToDaily}
      tileClassName={({ date, view }) => getMoods(date, view)}
    />
  );
}

function BrainDumpForm(props) {
  const [dump, setDump] = useState({
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "content") {
      setDump({ content: value });
    }
  }

  function saveDump() {
    if (!(dump.content === "")) {
      props.handleSave(dump);
      setDump({ content: "" });
    }
  }

  return (
    <FormControl>
      <FormLabel htmlFor="brainDump">
        BRAIN DUMP
        <Textarea
          type="text"
          name="content"
          id="content"
          value={dump.content}
          variant="outline"
          onChange={handleChange}
          placeholder="What's on your mind?"
          _placeholder={{ opacity: 0.4, color: "inherit" }}
        />
      </FormLabel>
      <IconButton
        className="save"
        aria-label="save dump"
        icon={<CheckIcon />}
        onClick={saveDump}
      />
    </FormControl>
  );
}

function BrainDump(props) {
  const [dump, setDump] = useState({
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "content") {
      setDump({ content: value });
    }
  }

  function EditableControls(props) {
    const { isEditing, getSubmitButtonProps, getEditButtonProps } =
      useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          aria-label="save edit"
        />
      </ButtonGroup>
    ) : (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
          aria-label="edit dump"
        />
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => props.removeDump(props.index)}
          aria-label="delete dump"
        />
      </ButtonGroup>
    );
  }

  function saveDump(hs, idx) {
    if (!(dump.content === "")) {
      hs(idx, dump);
      setDump({ content: "" });
    }
  }

  function restoreDump() {
    if (!(dump.content === "")) {
      setDump({ content: "" });
    }
  }

  const rows = props.dumpData.map((row, index) => {
    return (
      <Tr key={index}>
        <Td>
          <Editable
            defaultValue={row.content}
            isPreviewFocusable={false}
            onSubmit={() => saveDump(props.handleSave, index)}
            onCancel={() => restoreDump()}
          >
            <EditablePreview />
            <Input
              as={EditableTextarea}
              type="text"
              name="content"
              id="content"
              value={dump.content}
              variant="outline"
              onChange={handleChange}
            />
            <br />
            <EditableControls removeDump={props.removeDump} index={index} />
          </Editable>
        </Td>
        <Td>{row.id}</Td>
      </Tr>
    );
  });

  return (
    <Table>
      <Tbody>{rows}</Tbody>
    </Table>
  );
}

export default Monthly;
