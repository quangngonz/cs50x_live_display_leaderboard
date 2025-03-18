import React, { useState } from "react";
import AdminPage from "../Admin/AdminPage.jsx";
import { Box, Button, TextField, Typography } from "@mui/material";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = "isphcs50x";

  const handleLogin = () => {
    console.log("login attempt");
    console.log(password);

    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Try again.");
      setPassword(""); // Clear password field for security
    }
  };

  if (isAuthenticated) {
    return <AdminPage />;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <TextField
        type="password"
        label="Enter Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default AdminLogin;
