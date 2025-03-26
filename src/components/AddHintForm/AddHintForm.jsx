import {Box, Button, MenuItem, Paper, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import useFetchQuestions from "../../hooks/useFetchQuestions.js";
import useTeamRankings from "../../hooks/useTeamRankings.js";


const AddHintForm =  () => {
  const [teamNameId, setTeamNameId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [loading, setLoading] = useState(false);

  const {data: allTeamData, isLoading: isLoadingTeam} = useTeamRankings();
  const [teams, setTeams] = useState([]);

useEffect(() => {
  if (allTeamData) {
    const teamNames = allTeamData.map(team => [team.team_name_string, team.team_name]);
    setTeams(teamNames);
  }
}, [allTeamData]);

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

  if (isLoading || isLoadingTeam) {
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
          team_name_id: teamNameId[1],
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
                {team[0]}
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
