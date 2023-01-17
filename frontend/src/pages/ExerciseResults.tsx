import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const ExerciseResults = (props: any) => {
    const location = useLocation();
    const data = location.state?.data;

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography sx={{ mb: 1.5 }}>
                        Score
                    </Typography>
                    <Typography sx={{ fontSize: 30 }} gutterBottom>
                        {data.score} / {data.total}
                    </Typography>
                </CardContent>
            </Card>
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
                        <Typography sx={{ fontSize: 24 }} gutterBottom>
                            {"Correct Choice : "+exercise.correctAnswerIndex}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export default ExerciseResults