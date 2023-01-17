import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useRef } from "react";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, SvgIcon, TextField, Typography } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Account from "../components/Account";
import Footer from "../components/Footer";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];

const NewPassword = (props: any) => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState<string>();
    const [newPassword, setNewPassword] = React.useState<string>();



    function change() {
        if (newPassword != "") {
            axios.put('http://localhost:3001/updatePassword', {
                user: username,
                password: newPassword
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            })
                .then(response => {
                    navigate('../login')
                });
        }
    }

    var cardStyle = {
        width: '20vw',
        height: '15vw',
        display: "flex",
        //alignItems:"center",
        justifyContent: "center",
        marginLeft: 750,
        marginTop: 40
    }

    var textSpace = {
        marginLeft: 70
    }

    return (
        <div>
            <Card style={cardStyle}>
                <CardContent>
                    <Typography sx={{ fontSize: 34, mb: 1.5 }} component="div" gutterBottom>
                        Reset Your Password
                        <Divider sx={{ borderBottomWidth: 5 }} color='black' />
                    </Typography>
                    <Stack spacing={1.5} direction="column">
                        <TextField id="outlined-basic" label="Username" onChange={(e) => setUsername(e.target.value)} type="String" size="medium" variant="outlined" />
                        <TextField id="outlined-basic" label="New Password" onChange={(e) => setNewPassword(e.target.value)} type="String" size="medium" variant="outlined" />
                        <Button variant="contained" style={{ marginTop: 20 }}  onClick={change}>
                            Reset Password
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
            <Footer />
        </div>
    )

}

export default NewPassword
