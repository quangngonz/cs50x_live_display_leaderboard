import React from "react";

import {Box} from "@mui/material";

import useRecentSubmissions from "../../hooks/useRecentSubmission.js";

import RecentSubmissions from "../../components/RecentSubmissions/RecentSubmissions.jsx";
import AddHintForm from "../../components/AddHintForm/AddHintForm.jsx";

const AdminPage = () => {
  const recentSubmissions = useRecentSubmissions();

  return (
    <Box  sx={{ mt: 3 }}>
      <h1
        style={{fontSize: '2rem', marginTop: "1rem", marginBottom: 0, textAlign: 'center', color: '#a40f33'}}>
        MINI CS50x PUZZLE DAY ADMIN DASHBOARD
      </h1>
      <Box display="flex" justifyContent="center" alignItems="flex-start" flexDirection="row" sx={{ mt: 1}}>
        <AddHintForm />
        <RecentSubmissions recentSubmissions={recentSubmissions}/>
      </Box>
    </Box>

  );
}


export default AdminPage;

