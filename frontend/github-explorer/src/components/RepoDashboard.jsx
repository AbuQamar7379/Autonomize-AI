import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./RepoDashboard.css";

// Function for repository dashboard
function ReposDashboard({ repos: data, details }) {
  let navigate = useNavigate();
  return (
    <div>
      {data.length > 0 && (
        <div>
          {/*Rendering user details by passing user date to this function component*/}
          <UserProfile data={details} />
        </div>
      )}
      <div className="mt-5 p-3 pb-5">
        {data.length > 0 && <h3 className="text-center mb-3">Repos</h3>}
        <Grid container spacing={2}>
          {data.map((repo) => {
            return (
              <Grid item xs={6} sm={4} md={3} key={repo.id}>
                <Card className="repoCard">
                  <p className="repoName">{repo.name}</p>
                  <p
                    className="moreDetails"
                    onClick={() =>
                      // whenever user click on specific repo card it redirects to repo details page as well as we are passing repo and user data as url state
                      navigate(`${details.login}/repo/${repo.name}`, {
                        state: { repoDetails: repo, userDetails: details },
                      })
                    }
                  >
                    Click for more details
                  </p>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

// Function for user profile
const UserProfile = ({ data }) => {
  return (
    <div className="m-auto mt-5 userProfileParent">
      <h3 className="text-center">Profile</h3>
      <div className="d-flex flex-column gap-3 align-items-center">
        <div className="userProfileImg">
          <img src={data.avatar_url} alt={data.login} />
        </div>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {data.login}
            </Typography>
            <div className="d-flex userDetails">
              <p>Followers : {data.followers}</p>
              <p>Follwing : {data.following}</p>
              <p>Public Repos : {data.public_repos}</p>
              <p>Location : {data.location}</p>
            </div>
            <p className="userDetails">Fullname : {data.name}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReposDashboard;
