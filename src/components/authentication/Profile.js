import "./SignUp.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Button, Stack, Heading, Text } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import logo from "../../Arrow.png";

function Profile(props) {
  const { state } = useLocation();
  const first = state.name.split(" ")[0];
  let navigate = useNavigate();

  function back() {
    navigate("/monthly", { state: state });
  }
  return (
    <ChakraProvider>
      <div className="SignUp">
        <img src={logo} alt="Arrow" className="SignUp-logo" />
        <header className="SignUp-header">
          <p className="SignUp-title">Hi, {first}!</p>
          <Stack spacing={8}>
            <Heading color="BLACK" fontSize="xl">
              Name
            </Heading>
            <Text mt={4}>{state.name}</Text>
            <Heading color="BLACK" fontSize="xl">
              Email
            </Heading>
            <Text mt={4}>{state.email}</Text>
            <br />
            {/* <Button color='white'  w='100px' bg='BLACK' left='70px'>edit</Button>     */}
            <Button
              color="white"
              bg="BLACK"
              w="100px"
              right="50px"
              onClick={back}
            >
              back
            </Button>
          </Stack>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default Profile;
