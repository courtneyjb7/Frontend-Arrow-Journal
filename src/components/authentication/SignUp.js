import "./SignUp.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../../Arrow.png";
import fire from "../../fire.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwEmpty, setpwEmpty] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [formatErrorMessage, setformatErrorMessage] = useState("");
  let navigate = useNavigate();

  function submit() {
    if (pw === "") {
      setpwEmpty(true);
      setformatErrorMessage("Empty field(s)");
    } else {
      setpwEmpty(false);
    }
    if (email === "") {
      setEmailEmpty(true);
      setformatErrorMessage("Empty field(s)");
    } else {
      setEmailEmpty(false);
    }
    if (name === "") {
      setformatErrorMessage("Empty field(s)");
      setNameEmpty(true);
    } else {
      setNameEmpty(false);
    }
    if (name !== "" && email !== "" && pw !== "") {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, pw)
        .then((currentUser) => {
          console.log("Authentication submitted!");
          setformatErrorMessage("");

          // set displayName for new user
          const info = {
            displayName: name,
            photURL: null,
          };

          fire.auth().currentUser.updateProfile(info);

          //create user in Mongo DB
          var userInfo = { name: name, email: email };
          createUser(userInfo);

          navigate(`/monthly`, { state: userInfo });
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Error: ", errorCode, ": ", errorMessage);
          setformatErrorMessage(removeFirstWord(errorMessage));
        });
    }
  }

  async function createUser(user) {
    try {
      const response = await axios.post("http://localhost:5000/users", user);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function back() {
    navigate("/");
  }

  return (
    <ChakraProvider>
      <div className="SignUp">
        <img src={logo} alt="Arrow" className="SignUp-logo" />
        <header className="SignUp-header">
          <p className="SignUp-title">Sign Up</p>
          <Stack spacing={8} direction="column">
            <Stack spacing={5} direction="column">
              <FormControl isInvalid={nameEmpty}>
                <FormLabel htmlFor="name" color="black">
                  Name
                </FormLabel>
                <Input
                  id="name"
                  type="name"
                  htmlSize={50}
                  width="auto"
                  bg="white"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </FormControl>
              <FormControl isInvalid={emailEmpty}>
                <FormLabel htmlFor="email" color="black">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="name"
                  htmlSize={50}
                  width="auto"
                  bg="white"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormControl>
              <PasswordInput
                pw={pw}
                setPw={setPw}
                pwEmpty={pwEmpty}
                formatErrorMessage={formatErrorMessage}
              ></PasswordInput>
              <Button
                color="white"
                bg="black"
                w="100px"
                type="submit"
                onClick={() => submit()}
              >
                sign up
              </Button>
            </Stack>
            <Button
              color="white"
              bg="black"
              w="100px"
              right="50px"
              onClick={() => back()}
            >
              back
            </Button>
          </Stack>
        </header>
      </div>
    </ChakraProvider>
  );
}

function PasswordInput(props) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <FormControl isInvalid={props.pwEmpty}>
        <FormLabel htmlFor="pw" color="black">
          Password
        </FormLabel>
        <Input
          id="pw"
          htmlSize={50}
          width="auto"
          bg="white"
          type={show ? "text" : "password"}
          onChange={(e) => props.setPw(e.target.value)}
          value={props.pw}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
        <FormHelperText>Password must be at least 6 characters</FormHelperText>
        <FormHelperText color="#B35864" maxWidth={400}>
          {props.formatErrorMessage}
        </FormHelperText>
      </FormControl>
    </InputGroup>
  );
}
function removeFirstWord(str) {
  const indexOfSpace = str.indexOf(" ");

  if (indexOfSpace === -1) {
    return "";
  }

  return str.substring(indexOfSpace + 1);
}

export default SignUp;
