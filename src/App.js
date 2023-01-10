import "./App.css";
import SignUp from "./components/authentication/SignUp.js";
import Login from "./components/authentication/Login.js";
import Profile from "./components/authentication/Profile.js";
import { ChakraProvider, Box } from "@chakra-ui/react";
import StartPage from "./components/authentication/StartPage.js";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Monthly from "./components/spreads/Monthly";
import Daily from "./components/spreads/Daily";
 
function App() { 
  return (
    <ChakraProvider>
      <Box>
        <Router>
          <Routes>
            <Route exact path="/Frontend-Arrow-Journal" element={<StartPage />} />
            <Route exact path="/Frontend-Arrow-Journal/monthly" element={<Monthly />} />
            <Route exact path="/Frontend-Arrow-Journal/daily" element={<Daily />} />
            <Route exact path="/Frontend-Arrow-Journal/sign-up" element={<SignUp />} />
            <Route exact path="/Frontend-Arrow-Journal/login" element={<Login />} />
            <Route exact path="/Frontend-Arrow-Journal/profile" element={<Profile />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
