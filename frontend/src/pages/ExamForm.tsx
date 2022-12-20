import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import RadioQuestion from './radioQuestion';
import { Button } from '@mui/material';

/*
    ['A', 'B', 'C', 'D']
*/

const possibleChoices = ['A', 'B', 'C', 'D'];


export default function ExamForm(props:any) {
    // const [questions, setQuestions] = React.useState([]);
    // const [correctAnswerIndex, setCorrectAnswerIndex] = React.useState(-1);
    const q = props.question;
    const { question, choices, correctAnswerIndex } = q;
    // React.useEffect(() => {
    //     props.setQuestion({ question, choices, correctAnswerIndex });

    // }, [questions, correctAnswerIndex])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    label={"Question " + props.questionNum}
                    id="q1"
                    value={question}
                    onChange={(e) => { props.setQuestion(({ ...q, question: e.target.value })) }}
                    size="small"
                />

            </div>
            <div>
                <Stack marginLeft={'25px'} marginBottom={'25px'} direction={'column'}>
                    {choices.map((_:any, idx:any) => (<TextField
                        label={"Choice " + idx}
                        onChange={(e) => { props.setQuestion(({ ...q, choices: choices.map((q:any, i:any) => i === idx ? e.target.value : q) })) }}
                        id="filled-size-small"
                        size="small"

                    />))}
                    <Button onClick={() => props.setQuestion(({ ...q, choices: [...choices, ''] }))}>Add Choice</Button>
                    <RadioQuestion correctAnswerIndex={correctAnswerIndex} possibleAnswersNum={choices.length} setAnswerIndex={(v:any) => props.setQuestion(({ ...q, correctAnswerIndex: v }))} />
                </Stack>
            </div>
        </Box>
    );
}
