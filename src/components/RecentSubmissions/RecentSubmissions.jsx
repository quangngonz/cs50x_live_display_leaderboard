import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import React from "react";

const RecentSubmissions = ({ recentSubmissions }) => {
  console.log(recentSubmissions);

  if (recentSubmissions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ width: "100%" }}>
        <Typography variant="h5" color="#a40f33" align="center" sx={{ mt: 3, mb: 2 }}>
          Recent Submissions
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 1, mb: 1 }}>
          No recent submissions
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ width: "100%" }}>
      <h1
        style={{fontSize: '2rem', marginTop: "1rem", textAlign: 'center', color: '#a40f33', fontWeight: 'normal'}}>
        Recent Submission
      </h1>

      <TableContainer component={Paper} sx={{maxWidth: "80%"}}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell align="center">Team Name</TableCell>
              <TableCell align="center">Question</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentSubmissions.map((submission, index) => (
              <TableRow key={index}>
                <TableCell align="center">{submission.team_name_id}</TableCell>
                <TableCell align={'center'}>{submission.question_id}</TableCell>
                <TableCell align="center" sx={{ color: submission.correct ? "green" : "red" }}>
                  {submission.correct ? "Correct" : "Incorrect"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentSubmissions;
