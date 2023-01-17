import { Avatar, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import Rating from '@mui/material/Rating';


interface props {
    courseReviews: Array<any>
}

const Reviews: React.FC<props> = ({ courseReviews }) => {
    return (
        <div>
            <span className="horizontal-line" ></span>
            {courseReviews && courseReviews.map((review: any, idx) => (
                <Stack spacing={2} marginBottom={2} >
                    <Stack direction={'row'} spacing={2}>
                        <Avatar alt="Profile Pic" src={review.profilePic} />
                        <Stack spacing={1}>
                            <h2>{review.reviewer}</h2>
                            <Stack spacing={1} direction={'row'}>
                                <Typography color={'rgb(200,150,0)'} marginTop={0.3}>4</Typography>
                                <Rating style={{ color: "rgb(200,150,0)" }} name="read-only" value={4} readOnly precision={0.1} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={2}>
                        <h4 style={{ marginLeft: '5px' }}>{review.title}</h4>
                        <Typography style={{ marginLeft: '5px' }}>{review.description}</Typography>
                    </Stack>
                    { idx < courseReviews.length - 1 ? <span className="horizontal-line-thin" ></span> : <></>}
                </Stack>
            ))}
        </div>
    )
}

export default Reviews