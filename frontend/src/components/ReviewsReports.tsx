import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const ReviewsReports = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <div style={{ opacity: '100%', paddingLeft: '3%', paddingBottom: '2%', margin: '1%', boxShadow: '2px 2px', borderRadius: '5px', border: 'solid rgb(170,170,170) 3px', marginLeft: 'auto', marginRight: 'auto', maxHeight: '40%', width: '95%', backgroundColor: 'rgb(200, 200, 200)' }}>
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                <Tab icon={<PhoneIcon />} label="RECENTS" />
                <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                <Tab icon={<PersonPinIcon />} label="NEARBY" />
            </Tabs>
        </div>
    )
}

export default ReviewsReports;