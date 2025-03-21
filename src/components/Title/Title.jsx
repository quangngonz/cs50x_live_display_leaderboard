import {Box} from "@mui/material";
import React from "react";
import DecryptedText from "../DecryptedText/DecryptedText.jsx";

const Title = () => {
  return (
    <Box display="flex" justifyContent="space-around" flexDirection='row' alignItems='center' sx={{width: "100%"}}>
      <Box
        component="img"
        src="/rubber-duck.png"
        sx={{height: "10vh", mt: 2, mb: 2}}
      />
      <Box display="flex" justifyContent="top" alignItems="center" flexDirection='column'>
        <h1
          style={{fontSize: '2rem', marginTop: "1rem", marginBottom: 0, textAlign: 'center', color: '#a40f33'}}>
          MINI CS50x PUZZLE DAY
        </h1>


        <h1
          style={{fontSize: '2.5rem', marginTop: 0, marginBottom: "1rem", textAlign: 'center', color: '#a40f33'}}>
          <DecryptedText
            text="LEADERBOARD"
            animateOn="view"
            speed={100}
            maxIterations={35}
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
          />
        </h1>
      </Box>
      <Box
        component="img"
        src="/rubber-duck.png"
        sx={{height: "10vh", mt: 2, mb: 2, transform: "scaleX(-1)"}}
      />
    </Box>
  )
}

export default Title;
