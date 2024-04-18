import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../App";
import axios from "axios";
import "./FollowersList.css";
import { useSnackbar } from "notistack";
import { Grid } from "@mui/material";

function FollowersList() {
  let { username } = useParams();
  let [followersList, setFollowersList] = useState([]);
  let { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();

  const fetchFollowersList = async () => {
    try {
      let res = await axios.get(`${config.endpoint}${username}/followers`);
      if (res.status === 200) {
        enqueueSnackbar(`Successfully fetch ${username}'s followers`, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setFollowersList(res.data);
      }
    } catch (err) {
      enqueueSnackbar(`Failed to fetch ${username}'s followers list`, {
        variant: "error",
        autoHideDuration: 1500,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchFollowersList, [username]);
  console.log(followersList);

  return (
    <div className="followersListParent">
      <p
        className="border-bottom d-inline-block followerBack"
        onClick={() => navigate("/")}
      >
        BACK
      </p>
      <h3 className="text-center">{username}'s follower list</h3>
      <hr />
      <div className="d-flex justify-content-center">
        <div className="followerCardParent">
          <Grid container columnGap={1} rowGap={3}>
            {followersList.map((follower) => (
              <Grid
                item
                xs={4}
                sm={3}
                md={2}
                key={follower.login}
                className="followerCard"
              >
                <img src={follower.avatar_url} alt={follower.login} />
                <p className="text-center">{follower.login}</p>
                <span
                  className="followerDetails"
                  onClick={() => {
                    //localStorage.setItem("username", follower.login);
                    navigate("/");
                  }}
                >
                  more details
                </span>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default FollowersList;
