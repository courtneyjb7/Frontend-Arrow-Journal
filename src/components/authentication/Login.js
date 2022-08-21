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

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwEmpty, setpwEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [formatErrorMessage, setformatErrorMessage] = useState("");
  let navigate = useNavigate();

  function submit() {
    // console.log(`Submitted: ${name}, ${email}, ${pw}`);
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
    if (email !== "" && pw !== "") {
      fire
        .auth()
        .signInWithEmailAndPassword(email, pw)
        .then((user) => {
          console.log("Authentication submitted!");
          setformatErrorMessage("");
          console.log(
            user.user._delegate.email,
            user.user._delegate.displayName
          );
          const userInfo = {
            name: user.user._delegate.displayName,
            email: user.user._delegate.email,
          };
          navigate("/monthly", { state: userInfo }); //successful login here!!
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Error: ", errorCode, ": ", errorMessage);
          setformatErrorMessage(removeFirstWord(errorMessage));
        });
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
          <p className="SignUp-title">Login</p>
          <Stack spacing={8} direction="column">
            <Stack spacing={5} direction="column">
              <FormControl isInvalid={emailEmpty}>
                <FormLabel htmlFor="email" color="Black">
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
                login
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
        {/* <FormHelperText>Password must be at least 6 characters</FormHelperText> */}
        <FormHelperText color="black" maxWidth={400}>
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

export default Login;
