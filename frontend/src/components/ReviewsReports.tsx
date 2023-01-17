import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReportIcon from '@mui/icons-material/Report';
import { Button, Stack } from '@mui/material';
import Reviews from './Reviews';
import Reports from './Reports';

interface props {
    courseReviews: Array<any>,
    courseReports: Array<any>,
}

const ReviewsReports: React.FC<props> = ({ courseReviews, courseReports }) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <div style={{ opacity: '100%', paddingLeft: '1%', paddingRight: '1%', paddingBottom: '2%', margin: '0.75%', boxShadow: '2px 2px', borderRadius: '5px', border: 'solid rgb(170,170,170) 3px', marginLeft: 'auto', marginRight: 'auto', maxHeight: '40%', width: '97.5%', backgroundColor: 'rgb(200, 200, 200)' }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab sx={{ minWidth: '50%' }} icon={<RateReviewIcon fontSize='large' color='primary' />} label="Reviews" />
                <Tab sx={{ minWidth: '50%' }} icon={<ReportIcon fontSize='large' color='error' />} label="Reports" />
            </Tabs>
            <Stack paddingLeft={2} marginTop={4}>
                {value == 0 ?
                    <>
                        <h1>Reviews</h1>
                        <Reviews courseReviews={courseReviews} />
                    </> :
                    <>
                        <h1>Reports</h1>
                        <Reports courseReports={courseReports} />
                    </>
                }
            </Stack>
        </div>
    )
}

export default ReviewsReports;