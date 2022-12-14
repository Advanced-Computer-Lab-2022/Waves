import * as React from 'react';
import jsPDF from "jspdf";
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dialog, DialogTitle, FormControl, OutlinedInput, Rating, Stack, TextField } from '@mui/material';
//var Blur = require('react-blur');
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import { useLocation } from "react-router-dom";
import CourseContent from '../components/CourseContent';
import Footer from '../components/Footer';
import DownloadIcon from '@mui/icons-material/Download';
import ReportIcon from '@mui/icons-material/Report';
import RateReviewIcon from '@mui/icons-material/RateReview';

const pages = ['Courses', 'Instructors', 'Add User', 'About Us'];

const background: React.CSSProperties = {
    backgroundImage: `url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0ea6dc6b-661f-483c-a9ef-eac204799228/d4ugudv-7f412932-3e06-4cd3-a2c8-b57f398f59d1.jpg/v1/fill/w_1600,h_659,q_75,strp/gray_website_background_by_maruron_d4ugudv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjU5IiwicGF0aCI6IlwvZlwvMGVhNmRjNmItNjYxZi00ODNjLWE5ZWYtZWFjMjA0Nzk5MjI4XC9kNHVndWR2LTdmNDEyOTMyLTNlMDYtNGNkMy1hMmM4LWI1N2YzOThmNTlkMS5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.i5u4A7oBQ756gcNRl72YJkQaA4RQdC5X9-1Wi5HGrhI')`,
    minWidth: '100%'
}

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Write Review</DialogTitle>
            <TextField></TextField>
        </Dialog>
    );
}

const ViewCourse = (props: any) => {
    const location = useLocation();
    const course = location.state?.data;

    const [instructorRating, setInstructorRating] = React.useState(0);
    const [courseRating, setCourseRating] = React.useState(0);

    const [notes, setNotes] = React.useState<string>("");

    const [open, setOpen] = React.useState(false);

    const [selectedValue, setSelectedValue] = React.useState("");

    const downloadPDFFile = () => {
        let doc = new jsPDF("landscape", "px", "a4", false);
        doc.text(notes, 20, 20)
        doc.save("My Notes.pdf");
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div style={background}>
            <ResponsiveNavBar pages={pages} />
            <Stack direction={'row'} marginBottom={2} marginTop={2} >
                <Stack direction={'column'} marginLeft={'auto'} marginBottom={2} marginTop={2} >
                    <Typography sx={{ textShadow: '2px 2px black' }} marginTop={'auto'} marginBottom={'auto'} fontFamily={'Cairo'} color={'rgb(200,200,200)'} fontSize={60}>{course.courseName}</Typography>
                    <Typography sx={{ textShadow: '2px 2px black' }} marginTop={'auto'} marginBottom={'auto'} fontFamily={'Cairo'} color={'rgb(200,200,200)'} fontSize={60}>{"Instructor " + course.courseInstructor}</Typography>
                </Stack>
                <img src={course.courseImg} style={{ boxShadow: '2px 2px', borderRadius: '30px', border: 'solid rgb(170,170,170) 5px', marginRight: '5%', width: '35%', height: '20%', marginLeft: 'auto' }} />
            </Stack>
            <CourseContent course={course} />

            <div style={{ opacity: '80%', padding: '1%', margin: '1%', boxShadow: '2px 2px', borderRadius: '5px', border: 'solid rgb(170,170,170) 3px', width: '98%', backgroundColor: 'rgb(230, 230, 230)' }}>

                <Typography marginLeft={1} gutterBottom variant="h5" component="div">
                    Notes
                </Typography>
                <FormControl style={{ width: '100%' }}>
                    <OutlinedInput rows={5} multiline placeholder="Write here.." style={{ fontSize: '20px' }} value={notes} onChange={(e) => { setNotes(e.target.value) }} />
                </FormControl>
                <div style={{ display: 'flex', paddingTop: '10px' }}>
                    <DownloadIcon fontSize='large' sx={{ marginLeft: 'auto', marginRight: '0.5%', cursor: 'pointer' }} onClick={downloadPDFFile} />
                </div>

            </div>
            <div style={{ opacity: '100%', paddingLeft: '3%', paddingBottom: '2%', margin: '1%', boxShadow: '2px 2px', borderRadius: '5px', border: 'solid rgb(170,170,170) 3px', marginLeft: 'auto', marginRight: 'auto', maxHeight: '40%', width: '40%', backgroundColor: 'rgb(200, 200, 200)' }}>
                <Typography marginTop={4} marginBottom={1} fontSize={35}>Instructor: {course.courseInstructor}</Typography>
                <Typography marginBottom={1} fontSize={25} component="legend">Rate Instructor</Typography>
                <Rating
                    size='large'
                    name="simple-controlled"
                    value={instructorRating}
                    onChange={(event, newValue) => {
                        setInstructorRating(newValue ? newValue : 0);
                    }}
                />
                <Typography marginTop={4} marginBottom={1} fontSize={35}>Course Name: {course.courseName}</Typography>
                <Typography marginBottom={1} fontSize={25} component="legend">Rate Course</Typography>
                <Rating
                    size='large'
                    name="simple-controlled"
                    value={courseRating}
                    onChange={(event, newValue) => {
                        setCourseRating(newValue ? newValue : 0);
                    }}
                />
                <Stack flexDirection={'row'}>
                    <RateReviewIcon onClick={handleClickOpen} fontSize='large' style={{ marginLeft: 'auto', marginTop: '3px', marginRight: '20px', cursor: 'pointer' }} color='primary' />
                    <ReportIcon onClick={handleClickOpen} fontSize='large' style={{ marginRight: '20px', cursor: 'pointer' }} color='error' />
                    <SimpleDialog
                        selectedValue={selectedValue}
                        open={open}
                        onClose={handleClose}
                    />
                </Stack>
            </div>
            <Footer />
        </div>
    )
}

export default ViewCourse