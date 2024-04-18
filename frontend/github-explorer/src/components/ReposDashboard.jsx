import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

function ReposDashboard({ repos: data, details }) {
  return (
    <div>
      {data.length > 0 && (
        <div>
          <UserProfile data={details} />
        </div>
      )}
      <div className="mt-5">
        {data.length > 0 && <h3 className="text-center">Repos</h3>}
        <Grid container spacing={2}>
          {data.map((repo) => (
            <Grid item xs={4} key={repo.id}>
              <Card style={{ backgroundColor: "beige", marginBottom: "10px" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {repo.full_name.split("/")[1]}
                  </Typography>
                  <p style={{ fontSize: "12px" }}>Click for more details</p>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

const UserProfile = ({ data }) => {
  return (
    <div style={{ width: "60vw", height: "auto" }} className="m-auto mt-5">
      <h3 className="text-center">Profile</h3>
      <Card style={{ width: "inherit", height: "inherit" }}>
        <CardMedia
          component="img"
          image={data.avatar_url}
          alt={data.login}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.login}
          </Typography>
          <div className="d-flex gap-4">
            <Typography variant="body2" color="text.secondary">
              Followers : {data.followers}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Follwing : {data.following}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Public Repos : {data.public_repos}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location : {data.location}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReposDashboard;
