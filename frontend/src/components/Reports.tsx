import { Avatar, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface props {
    courseReports: Array<any>
}

const Reports: React.FC<props> = ({ courseReports }) => {

    return (
        <div>
            <span className="horizontal-line" ></span>
            {courseReports && courseReports.map((report: any, idx) => (
                <Stack spacing={2} marginBottom={2} >
                    <Stack direction={'row'} spacing={2}>
                        <Avatar alt="Profile Pic" src={report.profilePic} />
                        <Stack spacing={1}>
                            <h2>{report.reporter}</h2>
                            <Stack spacing={1} direction={'row'}>
                                {report.status == 'Pending' ? <PendingIcon color='warning'/> : <CheckCircleIcon color='success'/>}
                                <Typography>{report.status}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={2}>
                        <h4 style={{ marginLeft: '5px' }}>{report.type}</h4>
                        <Typography style={{ marginLeft: '5px' }}>{report.description}</Typography>
                    </Stack>
                    {idx < courseReports.length - 1 ? <span className="horizontal-line-thin" ></span> : <></>}
                </Stack>
            ))}
        </div>
    )
}

export default Reports