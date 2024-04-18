/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import ReposDashboard from "./RepoDashboard";
import "./LandingPage.css";

function LandingPage() {
  let [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  let [repos, setRepos] = useState([]);
  let [userDatails, setUserDetails] = useState();
  let { enqueueSnackbar } = useSnackbar();

  // handling user input to fetch github user
  const handleChange = (e) => setUsername(e.target.value);

  // conditionally fetching api || clearing state and localStorage
  const handleClick = (type) => {
    switch (type) {
      case "submit":
        fetchUserDetails();
        fetchRepos();
        localStorage.setItem("username", username);
        break;

      case "clear":
        localStorage.removeItem("username");
        setUsername("");
        setUserDetails();
        setRepos([]);
        break;

      default:
        break;
    }
  };

  // Function to fetch user details from github API
  const fetchUserDetails = async () => {
    try {
      let res = await axios.get(`${config.endpoint}${username}`);
      if (res.status === 200) {
        enqueueSnackbar("User profile load successfully", {
          variant: "success",
          autoHideDuration: 1500,
        });

        setUserDetails(res.data);
      }
    } catch (err) {
      if (err?.response?.status === 403) {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          autoHideDuration: 1500,
        });
      } else {
        enqueueSnackbar("Internal server error", {
          variant: "error",
          autoHideDuration: 1500,
        });
      }
    }
  };

  // Function to fetch user repositories from github API
  const fetchRepos = async () => {
    try {
      let res = await axios.get(`${config.endpoint}${username}/repos`);
      if (res.status === 200) {
        setRepos(res.data);
        enqueueSnackbar("Repos fetch successfully", {
          variant: "success",
          autoHideDuration: 1500,
        });
      }
    } catch (err) {
      if (err?.response?.status === 403) {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          autoHideDuration: 1500,
        });
      } else {
        enqueueSnackbar("Internal server error", {
          variant: "error",
          autoHideDuration: 1500,
        });
      }
    }
  };

  // useEffect to handle localStrorage and making api call to persist user details even after redirects to different page and again comeback
  useEffect(() => {
    if (localStorage.getItem("username") === username) {
      handleClick("submit");
    }
  }, [username]);

  return (
    <div>
      <h1 className="text-center pb-3 mb-0 pt-3 assignment">
        Autonomize AI - GitHub Explorer
      </h1>
      <hr className="mt-0" />
      <div className="d-flex gap-2 justify-content-center">
        <TextField
          type="text"
          className="w-50"
          fullWidth
          id="username"
          placeholder="Enter github username......"
          color="success"
          value={username}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="success"
          size="large"
          className="Button"
          onClick={() => handleClick("submit")}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="large"
          className="Button"
          onClick={() => handleClick("clear")}
        >
          Clear
        </Button>
      </div>
      <div>
        {/* rendering repository dashboard by passing repos and user data as props */}
        <ReposDashboard repos={repos} details={userDatails} />
      </div>
    </div>
  );
}

export default LandingPage;
