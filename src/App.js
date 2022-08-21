import "./App.css";
import SignUp from "./components/authentication/SignUp.js";
import Login from "./components/authentication/Login.js";
import Profile from "./components/authentication/Profile.js";
import { ChakraProvider, Box } from "@chakra-ui/react";
import StartPage from "./components/authentication/StartPage.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Monthly from "./components/spreads/Monthly";
import Daily from "./components/spreads/Daily";

function App() {
  return (
    <ChakraProvider>
      <Box>
        <Router>
          <Routes>
            <Route exact path="/" element={<StartPage />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <Profile name="BJ Klingenberg" email="bklingen@calpoly.edu" />
              }
            />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
