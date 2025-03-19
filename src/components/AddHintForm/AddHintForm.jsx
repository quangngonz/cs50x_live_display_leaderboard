import {Box, Button, MenuItem, Paper, TextField, Typography} from "@mui/material";
import React, {useState} from "react";

const teams = ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8"];
const questionIds = [1, 2, 3, 4, 5];

const AddHintForm =  () => {
  const [teamNameId, setTeamNameId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teamNameId || !questionId) {
      alert("Please select a team and question ID");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://isph-mini-cs50x-api.vercel.app/addHint", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          team_name_id: teamNameId,
          question_id: questionId
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Hint submitted successfully! ${data.data.team_name_id} - Question ${data.data.question_id}`);
        setTeamNameId("");
        setQuestionId("");
      } else {
        alert(`Error: ${data.message || "Failed to submit hint"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ width: "100%" }}>
      <h1
        style={{fontSize: '2rem', marginTop: "1rem", textAlign: 'center', color: '#a40f33', fontWeight: 'normal'}}>
        Add Hint
      </h1>

      <Paper maxWidth="sm" sx={{ width: "100%"}}>

        <form onSubmit={handleSubmit} style={{ margin: "1rem" }}>
          <TextField
            select
            label="Select Team"
            value={teamNameId}
            onChange={(e) => setTeamNameId(e.target.value)}
            fullWidth
            margin="normal"
          >
            {teams.map((team, index) => (
              <MenuItem key={index} value={team}>
                {team}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Question Number"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            fullWidth
            margin="normal"
          >
            {questionIds.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? "Submitting..." : "Add Hint"}
          </Button>
        </form>
      </Paper>
    </Box>

  )
}

export default AddHintForm;
