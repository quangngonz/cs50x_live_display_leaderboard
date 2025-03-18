import {Box, Card, List, ListItem, Typography} from "@mui/material";
import React from "react";

const RecentSubmissions = ({ recentSubmissions }) => {

  if (recentSubmissions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' sx={{width: "100%"}}>
        <Typography variant="h5" color='#a40f33' align="center" sx={{mt: 3, mb: 2 }}>Recent Submissions</Typography>
        <Typography variant="body1" align="center" sx={{mt: 1, mb: 1 }}>No recent submissions</Typography>
      </Box>
    );
  }

  return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' sx={{width: "100%"}}>
          <Typography variant="h5" color='#a40f33' align="center" sx={{mt: 3, mb: 2 }}>Recent Submissions</Typography>
          <List sx={{width: "100%"}}>
            {recentSubmissions.map((submission, index) => (
              <ListItem key={index}>
                <Card sx={{width: "100%"}}>
                  <Typography variant="body1" align="center" sx={{mt: 1, mb: 1 }}>{submission.team_name_id}</Typography>
                  <Typography variant="body1" align="center" sx={{mt: 1, mb: 1 }}>{submission.correct ? "Correct" : "Incorrect"}</Typography>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      )
}

export default RecentSubmissions;
