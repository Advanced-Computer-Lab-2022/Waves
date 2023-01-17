import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReportIcon from '@mui/icons-material/Report';
import RateReviewIcon from '@mui/icons-material/RateReview';
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

export default function ReviewOrReport(props: any) {
    const open = props.open;
    const setOpen = props.setOpen;
    const [dialog, setDialog] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [type, setType] = React.useState('');
    const [description, setDescription] = React.useState('');

    let profilePic: any;

    let username: any;

    axios.get('http://localhost:3001/getProfilePic', { withCredentials: true }).then(response => {
        profilePic = response.data;
    })

    axios.get('http://localhost:3001/getUsername', { withCredentials: true }).then(response => {
        username = response.data;
    })

    const handleReviewClickOpen = () => {
        setDialog('Review')
        setOpen(true);
    };

    const handleReportClickOpen = () => {
        setDialog('Report')
        setOpen(true);
    };

    const handleClose = () => {
        setTitle('')
        setDescription('')
        setType('')
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
        if (dialog == 'Review') {
            if (title != '' && description != '') {
                axios.put('http://localhost:3001/addReview', { courseID: props.courseID, title: title, description: description, profilePic: profilePic, reviewer: username }, { withCredentials: true
                }).then(response => {
                    props.setCourseReviews((prevArray: any) => [...prevArray, { title: title, description: description, profilePic: profilePic, reviewer: username, rating: props.rating }])
                })
            }
        }

        else if (dialog == 'Report') {
            if (type != '' && description != '') {
                axios.put('http://localhost:3001/addReport', { courseID: props.courseID, type: type, description: description, profilePic: profilePic, reporter: username, status: 'Pending' }, { withCredentials: true
                }).then(response => {
                    props.setCourseReports((prevArray: any) => [...prevArray, { type: type, description: description, profilePic: profilePic, reporter: username, status: 'Pending' }])
                })
            }
        }
    };

    return (
        <div style={{ marginLeft: 'auto' }}>
            <RateReviewIcon onClick={handleReviewClickOpen} fontSize='large' style={{ marginLeft: 'auto', marginTop: '3px', marginRight: '20px', cursor: 'pointer' }} color='primary' />
            <ReportIcon onClick={handleReportClickOpen} fontSize='large' style={{ marginRight: '20px', cursor: 'pointer' }} color='error' />
            <Dialog
                PaperProps={{
                    sx: {
                        width: "35%",
                        height: "35%"
                    }
                }}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {dialog == 'Review' ? 'Write Review' : 'Report Course'}
                </DialogTitle>
                <DialogContent>
                    {dialog == 'Review' ?
                        <TextField
                            style={{ width: '45%' }}
                            margin="dense"
                            label="Title"
                            variant="outlined"
                            onChange={(event) => { setTitle(event.target.value) }}
                        /> :

                        <FormControl margin='dense' style={{ width: '45%' }}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                autoFocus
                                fullWidth
                                value={type}
                                label="Type"
                                onChange={(event) => { setType(event.target.value as string) }}
                            >
                                <MenuItem value={'Technical'}>Technical</MenuItem>
                                <MenuItem value={'Financial'}>Financial</MenuItem>
                                <MenuItem value={'Other'}>Other</MenuItem>
                            </Select>
                        </FormControl>
                    }
                    <TextField
                        margin="dense"
                        id="name"
                        label="Description"
                        fullWidth
                        multiline
                        rows={5}
                        variant="outlined"
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} autoFocus>
                        {dialog == 'Review' ? 'Post Review' : 'Sumbit Report'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}