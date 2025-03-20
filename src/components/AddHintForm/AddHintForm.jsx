import {Box, Button, MenuItem, Paper, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import useFetchQuestions from "../../hooks/useFetchQuestions.js";

const teams = ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8"];

const AddHintForm =  () => {
  const [teamNameId, setTeamNameId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: questions, isLoading, error } = useFetchQuestions();
  const [questionsList, setQuestionsList] = useState([]);

  function getQuestionId(questionName) {
    const question = questions.find(q => q.question === questionName);
    return question ? question.id : null;  // Returns null if not found
  }

  useEffect(() => {
    if (!isLoading){
      const questionsNames = questions.map((question) => question.question);
      setQuestionsList(questionsNames);
    }
  }, [isLoading, questions]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ width: "100%" }}>
        <Typography variant="h5" color="#a40f33" align="center" sx={{ mt: 3, mb: 2 }}>
          Add Hint
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 1, mb: 1 }}>
          Fetching questions...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ width: "100%" }}>
        <Typography variant="h5" color="#a40f33" align="center" sx={{ mt: 3, mb: 2 }}>
          Add Hint
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 1, mb: 1 }}>
          Error fetching questions
        </Typography>
      </Box>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teamNameId || !questionId) {
      alert("Please select a team and question ID");
      return;
    }

    setLoading(true);

    const question_Id = getQuestionId(questionId);

    if (!question_Id) {
      alert("Question not found");
      setLoading(false);
      return
    }

    try {
      const response = await fetch("https://isph-mini-cs50x-api.vercel.app/addHint", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          team_name_id: teamNameId,
          question_id: question_Id
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

      <Paper maxWidth="sm" sx={{ width: "100%", maxWidth: "80%"}}>

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
            label="Question"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            fullWidth
            margin="normal"
          >
            {questionsList.map((id, idx) => (
              <MenuItem key={id} value={id}>
                {idx + 1}. {id}
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
