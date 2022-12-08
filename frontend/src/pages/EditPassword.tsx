



import { Button, Stack, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ResponsiveNavBar from '../components/ResponsiveNavBar';

const EditPassword = (props: any) => {
    const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    return (
        <>
            <ResponsiveNavBar pages={pagesArr} />
            <Stack marginTop={'1%'}>
                <TextField style={{marginLeft:'5%', marginRight:'5%',  marginTop: '1%'}} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} label="Current Password" size="medium" variant="outlined" />
                <TextField style={{marginLeft:'5%', marginRight:'5%',  marginTop: '1%'}} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label="New Password" size="medium" variant="outlined" />
                <TextField style={{marginLeft:'5%', marginRight:'5%',  marginTop: '1%'}} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} label="Confirm New Password" size="medium" variant="outlined" />
                <Button style={{height:'4vw', marginLeft:'5%', marginRight:'5%',  marginTop: '1%'}} variant='contained' onClick={() => {}}>Change Password</Button>
            </Stack>
        </>
    )
}

export default EditPassword