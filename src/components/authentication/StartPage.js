import React from "react";
import { Box, Button, Stack, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../../Arrow.png";

function StartPage() {
  let navigate = useNavigate();

  function navigateToLogin() {
    navigate("/Frontend-Arrow-Journal/login");
  }

  function navigateToSignUp() {
    navigate("/Frontend-Arrow-Journal/sign-up");
  }

  return (
    <Box>
      <Box w="100%" h="400px" bgColor="white">
        <Stack pt="8px" align="center">
          <Text fontSize="5xl" color="black">
            Welcome To
          </Text>
          {/* <Image src="Arrow.png" alt="Arrow Journal" /> */}
          <img src={logo} alt="Arrow Journal" className="SignUp-logo" />
          <Text fontSize="5xl" color="black">
            Journal!
          </Text>
        </Stack>
      </Box>

      <Box w="100%" h="650px" bgColor="white">
        <Stack pt="100px" align="center">
          <Button
            bgColor="black"
            color="white"
            width="500px"
            height="80px"
            fontSize="25px"
            onClick={navigateToLogin}
          >
            {" "}
            Log In{" "}
          </Button>
        </Stack>

        <Stack pt="50px" align="center">
          <Button
            bgColor="black"
            color="white"
            width="500px"
            height="80px"
            fontSize="25px"
            onClick={navigateToSignUp}
          >
            {" "}
            Sign Up{" "}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default StartPage;
