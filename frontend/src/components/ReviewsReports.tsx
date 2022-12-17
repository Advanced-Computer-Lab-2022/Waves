import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReportIcon from '@mui/icons-material/Report';
import { Button, Stack, Toolbar, Typography } from '@mui/material';
import { InputBase, styled } from '@mui/material';
import Reviews from './Reviews';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 200,
    backgroundColor: 'rgb(180,180,180)',
    '&:hover': {
        backgroundColor: 'rgb(190,190,190)'
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#000000',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

interface props {
    courseReviews: Array<any>,
    courseReports: Array<any>
}

const ReviewsReports: React.FC<props> = ({ courseReviews, courseReports }) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <div style={{ opacity: '100%', paddingLeft: '1%', paddingRight: '1%', paddingBottom: '2%', margin: '1%', boxShadow: '2px 2px', borderRadius: '5px', border: 'solid rgb(170,170,170) 3px', marginLeft: 'auto', marginRight: 'auto', maxHeight: '40%', width: '95%', backgroundColor: 'rgb(200, 200, 200)' }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab sx={{ minWidth: '50%' }} icon={<RateReviewIcon fontSize='large' color='primary' />} label="Reviews" />
                <Tab sx={{ minWidth: '50%' }} icon={<ReportIcon fontSize='large' color='error' />} label="Reports" />
            </Tabs>
            <Stack direction={'row'}>
                <Toolbar>
                    <Search>
                        <SearchIconWrapper>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => { }}
                        />
                    </Search>
                </Toolbar>
            </Stack>
            <Stack>
                <h1>Reviews</h1>
                <Reviews courseReviews={courseReviews} />
            </Stack>
        </div>
    )
}

export default ReviewsReports;