import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function LandingPage() {
  let [username, setUsername] = useState("");

  const handleChange = (e) => setUsername(e.target.value);

  return (
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
      <Button variant="contained" color="success" size="large">
        Submit
      </Button>
    </div>
  );
}

export default LandingPage;
