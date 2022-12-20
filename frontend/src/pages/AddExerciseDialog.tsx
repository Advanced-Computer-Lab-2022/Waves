import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ExamForm from './ExamForm';
export default function FormDialog(props:any) {
    const [open, setOpen] = React.useState(false);
    const { questions, setQuestions } = props;

    const addEmptyQuestion = () => {
        setQuestions([...questions, { question: '', choices: [], correctAnswerIndex: -1 }]);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {props.buttonName}
            </Button>
            <Dialog
                PaperProps={{
                    sx: {
                        width: "30%",
                        height: "100%"
                    }
                }}
                open={open} onClose={handleClose}>
                <DialogTitle>Create Exercise</DialogTitle>
                <DialogContent>
                    <div>
                        {questions.map((q:any, idx:any) => (<ExamForm questionNum={idx + 1} question={q} setQuestion={(v:any) => setQuestions((a:any) => a.map((q:any, i:any) => i === idx ? v : q))} />))}
                        <Button onClick={addEmptyQuestion}>Add Question</Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}