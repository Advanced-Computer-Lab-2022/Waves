import { Link, useLocation } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { Stack } from '@mui/material';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const ExerciseSession: React.FC = () => {
    const location = useLocation();
    const data = location.state?.data;
    let [score, setScore] = React.useState(0);

    const check = (choice: Number, answer: String) => {
        if(choice+""==answer) setScore(score+1);
        console.log("choice: "+choice+" -answer: "+answer+ "-score: "+score)
      };

    console.log((data.exercise[0].choices.length) + " ***")
    return (
        <>
            {(data.exercise).map((exercise: {
                correctAnswerIndex: any;
                choices: String[]; question: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
            }) => (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 30 }} gutterBottom>
                            {"Question : "+exercise.question}
                        </Typography>
                        <Typography sx={{ fontSize: 24 }} gutterBottom>
                            {"Choices : "+exercise.choices + " "}
                        </Typography>
                        <Stack direction="column" spacing={2}>
                            {(exercise.choices).map((choice) => (
                                <Button onClick={() => check(exercise.choices.indexOf(choice),exercise.correctAnswerIndex)} variant="contained">{choice}</Button>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            ))}
            <Button variant="contained" style={{marginTop: 20}}> 
            <Link to="/exercise-results" style={{textDecoration: 'none', color: 'white'}} state={{ data: {score: score, total: data.exercise.length, exercise: data.exercise}}} className="link">
                Submit Answers
            </Link>
        </Button>
        </>
    );
}

export default ExerciseSession




