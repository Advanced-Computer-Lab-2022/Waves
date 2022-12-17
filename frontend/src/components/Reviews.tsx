import { Avatar, Divider, Stack, Typography } from '@mui/material'
import React from 'react'


interface props {
    courseReviews: Array<any>
}

const Reviews: React.FC<props> = ({ courseReviews }) => {
    return (
        <div>
            <span className="horizontal-line" ></span>
            {courseReviews && courseReviews.map((review: any) => (
                <Stack spacing={4}>
                    <Stack direction={'row'} spacing={2}>
                        <Avatar alt="Profile Pic" src={review.profilePic} />
                        <h2>{review.reviewer}</h2>
                    </Stack>
                    <Stack spacing={4}>
                        <Typography style={{marginLeft:'5px'}}>{review.title}</Typography>
                        <Typography style={{marginLeft:'5px'}}>{review.description}</Typography>
                    </Stack>
                    <Divider orientation='horizontal' />
                </Stack>
            ))}
        </div>
    )
}

export default Reviews