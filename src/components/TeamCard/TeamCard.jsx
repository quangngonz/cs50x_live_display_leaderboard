import React, {useState, useEffect} from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DecryptedText from "../DecryptedText/DecryptedText.jsx";
import Counter from "../Counter/Counter.jsx";

const TeamCard = ({ teamData }) => {
  const {team_name_string, solves, score, hints_given, wrong_answers } = teamData;
  const [statuses, _] = solves;

  return (
    <Card sx={{ display: "flex", alignItems: "center", px: 2, py: 1, gap: 2, minHeight: 60, boxShadow: 2, borderRadius: 1,}}>
      {/* Team Name */}
      <Typography
        variant="h6"
        sx={{
          paddingLeft: 2,
          flexShrink: 0,
          width: 200,
          fontSize: "1.25rem",
          fontWeight: "normal",
          textAlign: "left",
        }}
      >
        <DecryptedText
          text={team_name_string}
          animateOn="view"
          speed={100}
          maxIterations={30}
          className="revealed"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
        />
      </Typography>

      <Divider orientation="vertical" flexItem />

      {/* Status Icons */}
      <Box sx={{ display: "flex", gap: 1, flexGrow: 1, justifyContent: "center", minWidth: 200 }}>
        {statuses.map((status, index) => (
          status ? (
            <CheckCircleIcon key={index} sx={{ color: "green", fontSize: "1.8rem" }} />
          ) : (
            <CancelIcon key={index} sx={{ color: "red", fontSize: "1.8rem" }} />
          )
        ))}
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Wrong Answers Given */}
      <Box sx={{ display: "flex", flexShrink: 0, minWidth: 50, gap: 1, justifyContent: "center", }}>
        <Typography variant="h6" sx={{ fontWeight: 'normal', fontSize: "1rem", whiteSpace: "nowrap", textAlign: "left"}}>
          {wrong_answers}
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Hints Given */}
      <Box sx={{ display: "flex", flexShrink: 0, minWidth: 50, gap: 1, justifyContent: "center", }}>
        <Typography variant="h6" sx={{ fontWeight: 'normal', fontSize: "1rem", whiteSpace: "nowrap", textAlign: "left"}}>
          {hints_given}
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Score */}
      <Box sx={{ display: "flex", flexShrink: 0, minWidth: 120, gap: 1, justifyContent: "center", }}>
        <Counter
          value={score}
          places={score >= 10 ? [10, 1] : [1]}
        />
      </Box>
    </Card>
  );
};

export default TeamCard;
