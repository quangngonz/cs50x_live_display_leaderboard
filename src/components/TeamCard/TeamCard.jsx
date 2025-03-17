import React from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const TeamCard = ({ teamData }) => {
  const { team_name, solves, score, hints_given } = teamData;
  const [statuses, timestamps] = solves;

  return (
    <Card sx={{ display: "flex", alignItems: "center", px: 2, py: 1, gap: 2, minHeight: 60, boxShadow: 2, borderRadius: 2 }}>
      {/* Team Name */}
      <Typography variant="h5" sx={{ paddingLeft: 2, flexShrink: 0, width: 150, fontSize: "1.5rem", textAlign: "left" }}>
        {team_name}
      </Typography>

      <Divider orientation="vertical" flexItem />

      {/* Status Icons */}
      <Box sx={{ display: "flex", gap: 1, flexGrow: 1, justifyContent: "center", minWidth: 200 }}>
        {statuses.map((status, index) => (
          status ? (
            <CheckCircleIcon key={index} sx={{ color: "green", fontSize: "2rem" }} />
          ) : (
            <CancelIcon key={index} sx={{ color: "red", fontSize: "2rem" }} />
          )
        ))}
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Hints Given */}
      <Box sx={{ display: "flex", flexShrink: 0, minWidth: 80, gap: 1, justifyContent: "center", }}>
        <Typography variant="h6" sx={{ fontWeight: 'normal', fontSize: "1.25rem", whiteSpace: "nowrap", textAlign: "left"}}>
          {hints_given}
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Score */}
      <Box sx={{ display: "flex", flexShrink: 0, minWidth: 120, gap: 1, justifyContent: "center", }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1.25rem", whiteSpace: "nowrap", textAlign: "left"}}>
          {score} ⭐
        </Typography>
      </Box>
    </Card>
  );
};

export default TeamCard;
