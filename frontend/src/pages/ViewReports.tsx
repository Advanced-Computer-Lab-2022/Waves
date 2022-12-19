import { Avatar, Badge, Collapse, List, ListItemButton, ListItemText, ListSubheader, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import ResponsiveNavBar from '../components/ResponsiveNavBar';
import Footer from '../components/Footer';
import CircleIcon from '@mui/icons-material/Circle';

const ViewReports = () => {
    const adminPages = ['All Courses', 'Instructors', 'Corporate Trainees', 'Add User', 'View Reports', 'About Us'];

    const [coursesReports, setCoursesReports] = React.useState([]);


    React.useEffect(() => {
        axios.get('http://localhost:3001/getReports', { withCredentials: true }).then(response => {
            setCoursesReports(response.data)
        });
    }, [])

    return (
        <>
            <ResponsiveNavBar pages={adminPages} />
            <List
                className='listGrad'
                sx={{ minHeight: '60rem', boxShadow: '2px 2px', borderRadius: '5px', border: 'solid rgb(170,170,170) 3px', marginRight: 'auto%', width: '25%', bgcolor: 'rgb(200, 200, 200)' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader sx={{ bgcolor: 'initial' }} component="div">
                        <Typography fontSize={27}> Reports </Typography>
                    </ListSubheader>
                }
            >
                {coursesReports && coursesReports.map((reportsObj: any, idx) => (
                    reportsObj.reports && reportsObj.reports.map((report: any) => (
                        <>
                            <Stack direction={'row'}>
                                {report.seen ? <CircleIcon color="primary" style={{ visibility: 'hidden' }} /> : <CircleIcon color="primary" />}

                                <ListItemButton>
                                    <Stack>
                                        <Stack direction={'row'}>
                                            <Avatar alt="Profile Pic" src={report.profilePic} />
                                            <ListItemButton>{report.reporter}</ListItemButton>
                                        </Stack>
                                        {report.status}
                                        {report.type}
                                    </Stack>
                                </ListItemButton>
                            </Stack>
                        </>
                    ))
                ))}
            </List >
            <Footer />
        </>
    )

}

export default ViewReports