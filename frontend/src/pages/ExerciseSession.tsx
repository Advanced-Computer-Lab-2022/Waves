import { Link, useLocation } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ExerciseSession: React.FC = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [score, setScore] = React.useState(0);

  const [choices, setChoices] = React.useState([]);

  const [choiceIdxs, setChoiceIdxs] = React.useState([]);

  React.useEffect(() => {
    console.log(choices);
    console.log(choiceIdxs);
  }, [choices]);

  const calcScore = () => {
    let scoreTemp = 0;
    for (let i = 0; i < data.exercise.length; i++) {
      if (data.exercise[i].correctAnswerIndex === choiceIdxs[i]) {
        scoreTemp++;
      }
    }
    setScore(scoreTemp);
  };

  function handleChange(choice: String, idx: number) {
    let choicesTemp: any = [...choices];
    choicesTemp[idx] = choice;
    setChoices(choicesTemp);
  }

  function handleIdxChange(idx: number, choiceIdx: number) {
    let choicesIdxsTemp: any = [...choiceIdxs];
    choicesIdxsTemp[idx] = choiceIdx;
    setChoiceIdxs(choicesIdxsTemp);
  }

  return (
    <>
      {data.exercise.map(
        (
          exercise: {
            correctAnswerIndex: any;
            choices: String[];
            question:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
          },
          idx: number
        ) => (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 30 }} gutterBottom>
                {"Question : " + exercise.question}
              </Typography>
              <Stack direction="column" spacing={2}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Choices:
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={choices[idx]}
                    onChange={(e) => {
                      handleChange(e.target.value, idx);
                    }}
                  >
                    {exercise.choices.map((choice: String, choiceIdx) => (
                      <>
                        <FormControlLabel
                          value={choice}
                          control={<Radio />}
                          label={choice}
                        />
                      </>
                    ))}
                  </RadioGroup>
                </FormControl>
              </Stack>
            </CardContent>
          </Card>
        )
      )}
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => {
          console.log(choices);
        }}
      >
        <Link
          to="/exercise-results"
          style={{ textDecoration: "none", color: "white" }}
          state={{
            data: {
              score: score,
              total: data.exercise.length,
              exercise: data.exercise,
            },
          }}
          className="link"
        >
          Submit Answers
        </Link>
      </Button>
    </>
  );
};

export default ExerciseSession;
