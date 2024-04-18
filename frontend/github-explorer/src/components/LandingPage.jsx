import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import ReposDashboard from "./ReposDashboard";

function LandingPage() {
  let [username, setUsername] = useState("");
  let [repos, setRepos] = useState([]);
  let [userDatails, setUserDetails] = useState();
  let { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => setUsername(e.target.value);

  const handleClick = () => {
    fetchUserDetails();
    fetchRepos();
    setUsername("");
  };

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
      enqueueSnackbar("Failed to load user profile", {
        variant: "error",
        autoHideDuration: 1500,
      });
    }
  };

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
      if (err?.response?.status === 404) {
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

  return (
    <div>
      <div className="d-flex gap-2 justify-content-center">
        <TextField
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
          onClick={handleClick}
        >
          Submit
        </Button>
      </div>
      <div>
        <ReposDashboard repos={repos} details={userDatails} />
      </div>
    </div>
  );
}

export default LandingPage;
