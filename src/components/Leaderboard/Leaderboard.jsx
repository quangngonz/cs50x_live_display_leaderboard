import React from "react";

import {Flipped, Flipper} from "react-flip-toolkit";

import TeamCard from "../TeamCard/TeamCard.jsx";
import {Box, Divider} from "@mui/material";
import Header from "../Header/Header.jsx";

const Leaderboard = ({ rankings }) => {
  return (
    <Box sx={{ width: "100%", mb: 2, paddingX: 3,  borderRadius: 2}}>
      <Header />
      <Divider sx={{ width: "100%", my: 1 }} />
      <Flipper flipKey={rankings.map(d => d.team_name).join("-")}>
        <Box component="ul" sx={{ width: "100%", listStyle: "none", padding: 0, margin: 0 }}>
          {rankings.map((d, index) => (
            <Flipped key={d.team_name + index} flipId={d.team_name}>
              <Box component="li" sx={{ mb: 1 }}>
                <TeamCard teamData={d} />
              </Box>
            </Flipped>
          ))}
        </Box>
      </Flipper>
    </Box>
  );
};

export default Leaderboard;