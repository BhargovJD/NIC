import "./App.css";

import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EditUser from "./components/EditUser";
import React, { useState, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  console.log("App pae", currentUser);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home setCurrentUser={setCurrentUser} />} />
          <Route
            path="/users/:userId"
            element={<EditUser currentUser={currentUser} />}
          />

          {/* <Route path="/logout" element={<SignupPage/>}  /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
