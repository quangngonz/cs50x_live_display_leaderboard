import React from "react";

import useTeamRankings from "./hooks/useTeamRankings.js";
import Typography from "@mui/material/Typography";
import "./App.css";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
import {Box, CircularProgress} from "@mui/material";
import Title from "./components/Title/Title.jsx";

const App = () => {
  const { data: rankings, isLoading, isError } = useTeamRankings();

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection='column'>
        <Typography variant="h4" color='#a40f33' align="center" sx={{ mt: 1, mb: 2 }}>ISPH Mini CS50x Leaderboard</Typography>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection='column'>
        <Typography variant="h4" color='#a40f33' align="center" sx={{mt: 3, mb: 2 }}>ISPH Mini CS50x Leaderboard</Typography>
        <Typography color="error">Error fetching rankings.</Typography>
      </Box>
    );

  return (
    <Box display="flex" justifyContent="top" alignItems="center" flexDirection='column' sx={{backgroundColor: "#fcf8ed", paddingX: 4, minHeight: "100vh"}}>
      <Title />
      <Leaderboard className='leaderboard' rankings={rankings}/>
    </ Box>
  );
};

export default App;
