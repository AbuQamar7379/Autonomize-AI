import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../App";
import ReposDashboard from "./RepoDashboard";

function FollowersRepo() {
  // eslint-disable-next-line no-unused-vars
  let [username, setUsername] = useState(
    localStorage.getItem("followerUsername")
  );
  let { enqueueSnackbar } = useSnackbar();
  let [userDatails, setUserDetails] = useState();
  let [repos, setRepos] = useState([]);
  let navigate = useNavigate();

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
      enqueueSnackbar("Failed to load user profile", {
        variant: "error",
        autoHideDuration: 1500,
      });
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
      if (err?.response?.status === 404) {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          autoHideDuration: 1500,
        });
      } else if (err?.response?.status === 403) {
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

  // useEffect to handle searched user and it's follower details if we have followerUsername in localstorage then we make api call to just show the repo details and user profile
  useEffect(() => {
    fetchUserDetails();
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div>
      <ReposDashboard repos={repos} details={userDatails} follower={true} />
    </div>
  );
}

export default FollowersRepo;
