import { Collapse, List, ListItemButton, ListItemText, ListSubheader, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'

const ViewReports = () => {
    const [coursesReports, setCoursesReports] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:3001/getReports', { withCredentials: true }).then(response => {
            setCoursesReports(response.data)
        });
    }, [])

    return (
        <List
            className='listGrad'
            sx={{ opacity: '80%', boxShadow: '2px 2px', borderRadius: '5px', border: 'solid rgb(170,170,170) 3px', marginRight: '1%', marginLeft: 'auto', width: '98%', bgcolor: 'rgb(200, 200, 200)' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader sx={{ opacity: '80%', bgcolor: 'initial' }} component="div">
                    <Typography fontSize={27}> Course Content </Typography>
                </ListSubheader>
            }
        >
            {coursesReports && coursesReports.map((reportsObj: any, idx) => (
                reportsObj.reports && reportsObj.reports.map((report: any) => (
                    <>
                        <ListItemButton>{report.reporter}</ListItemButton>
                        <ListItemButton>{report.type}</ListItemButton>
                        <ListItemButton>{report.status}</ListItemButton>
                        <ListItemButton>{report.seen}</ListItemButton>
                        <ListItemButton>{report.description}</ListItemButton>
                    </>
                ))
            ))}
            <></>
        </List >
    )
}

export default ViewReports