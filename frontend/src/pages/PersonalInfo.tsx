import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useRef } from "react";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, SvgIcon, TextField, Typography } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Account from "../components/Account";
import Footer from "../components/Footer";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import { Navigate, useNavigate } from 'react-router-dom';


const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];

const Info = (props: any) => {
    const navigate=useNavigate();
    const [isPassword, setIsPassword] = React.useState(false);
    const [isEmail, setIsEmail] = React.useState(false);
    const [isBiography, setIsBiography] = React.useState(false);
    const [profilePic, setProfilePic] = React.useState('/static/images/avatar/2.jpg');
    const [profilePicHover, setProfilePicHover] = React.useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [username, setUsername] = React.useState<string>();
    const [email, setEmail] = React.useState<string>();
    const [bio, setBio] = React.useState<string>();
    const [newEmail, setNewEmail] = React.useState<string>();
    const [newPassword, setNewPassword] = React.useState<string>();
    const [newBio, setNewBio] = React.useState<string>();

    useEffect(() => {
        axios.get('http://localhost:3001/getUsername', { withCredentials: true }).then(response => {
            setUsername(response.data)
        });

        axios.get('http://localhost:3001/getProfilePic', { withCredentials: true }).then(response => {
            setProfilePic(response.data);
        })

        axios.get('http://localhost:3001/getEmail', { withCredentials: true }).then(response => {
            setEmail(response.data);
        })

        axios.get('http://localhost:3001/getBio', { withCredentials: true }).then(response => {
            setBio(response.data);
        })

    }, []);

    const handleUpload = (e: any) => {
        inputRef.current?.click();
    }



    function updateInfo() {
        if (newEmail != "" && isEmail) {
            setEmail(newEmail)
            axios.put('http://localhost:3001/updateEmail', {
                user: username,
                email: newEmail
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'        
                },
                withCredentials: true
            })
                .then(response => {
                    navigate(0)                
                });
        }

        if (newPassword != "" && isPassword) {
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
                    navigate(0)                
                });
        }

        if (newBio != "" && isBiography) {
            axios.put('http://localhost:3001/updateBio', {
                user: username,
                bio: newBio
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            })
                .then(response => {
                    navigate(0)                
                });
        }
    }
    return (
        <div>
            <ResponsiveNavBar pages={pagesArr} />
            <Stack direction="row">
                <Account />
                <Stack marginLeft={20}>
                    <Card style={{
                        marginBottom: '3vw',
                        width: '50vw',
                        height: '45vw'
                    }}>
                        <CardContent>
                            <Stack sx={{ alignItems: 'center' }} marginTop={2}>
                                <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                    Profile Picture
                                </Typography>
                                <div style={{ width: 125, height: 125, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Avatar onClick={handleUpload} style={profilePicHover ? { transition: '.3s ease', filter: 'blur(2px)' } : { transition: '.3s ease' }} onMouseEnter={() => { setProfilePicHover(true) }} onMouseLeave={() => { setProfilePicHover(false) }} title="Profile Picture" sx={{ position: 'absolute', width: 125, height: 125 }} alt="Remy Sharp" src={profilePic} />
                                    <input type='file' id='file' ref={inputRef} style={{ display: 'none' }} />
                                    {profilePicHover ?
                                        <div style={{ transition: '.5s ease', width: 125, height: 125, display: 'flex', justifyContent: 'center' }}>
                                            <Typography fontFamily={"initial"} fontSize={15} style={{ transition: '.5s ease', opacity: '1', pointerEvents: 'none', userSelect: 'none', marginTop: '45px', position: 'absolute' }}>Upload Image</Typography>
                                            <PhotoCameraBackIcon style={{ transition: '.5s ease', opacity: '1', pointerEvents: 'none', marginTop: '65px', position: 'absolute' }} />
                                        </div>
                                        : <div style={{ transition: '.5s ease', width: 125, height: 125, display: 'flex', justifyContent: 'center' }}>
                                            <Typography fontFamily={"initial"} fontSize={15} style={{ transition: '.5s ease', opacity: '0', pointerEvents: 'none', userSelect: 'none', marginTop: '45px', position: 'absolute' }}>Upload Image</Typography>
                                            <PhotoCameraBackIcon style={{ transition: '.5s ease', opacity: '0', pointerEvents: 'none', marginTop: '65px', position: 'absolute' }} />
                                        </div>}
                                </div>
                            </Stack>
                            <Stack marginTop={3} />
                            <Divider sx={{ bgcolor: "secondary.light" }} />
                            <Stack marginTop={2}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Username
                                </Typography>
                            </Stack>
                            <Stack direction="row" marginTop={2}>
                                <Typography variant="h5" component="div">
                                    {username}
                                </Typography>
                            </Stack>
                            <Stack marginTop={5} />
                            <Divider sx={{ bgcolor: "secondary.light" }} />
                            <Stack marginTop={2}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    EMAIL
                                </Typography>
                            </Stack>
                            <Stack direction="row" marginTop={2}>
                                {
                                    isEmail ? <TextField id="outlined-basic" label="New Email" onChange={(e) => setNewEmail(e.target.value)} type="String" size="medium" variant="outlined" /> : <Typography variant="h5" component="div">{email}</Typography>
                                }
                                <Stack marginLeft={50}>
                                    <Button onClick={() => { setIsEmail(!isEmail) }}>
                                        <CreateOutlinedIcon />
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack marginTop={5} />
                            <Divider sx={{ bgcolor: "secondary.light" }} />


                            <Stack marginTop={2}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    PASSWORD
                                </Typography>
                            </Stack>
                            <Stack direction="row" marginTop={2}>
                                {
                                    isPassword ? <TextField id="outlined-basic" label="New Password" variant="outlined" onChange={(e) => setNewPassword(e.target.value)} type="String" size="medium" /> : <Typography variant="h5" component="div">***********</Typography>
                                }
                                <Stack marginLeft={50}>
                                    <Button onClick={() => { setIsPassword(!isPassword) }}>
                                        <CreateOutlinedIcon />
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack marginTop={5} />
                            <Divider sx={{ bgcolor: "secondary.light" }} />
                            <Stack marginTop={2}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Mini Biography
                                </Typography>
                            </Stack>
                            <Stack direction="row" marginTop={2}>
                                {
                                    isBiography ? <TextField id="outlined-basic" label="New Biography" variant="outlined" onChange={(e) => setNewBio(e.target.value)} type="String" size="medium" /> : <Typography variant="h5" component="div">{bio}</Typography>
                                }
                                <Stack marginLeft={50}>
                                    <Button onClick={() => { setIsBiography(!isBiography) }}>
                                        <CreateOutlinedIcon />
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack marginTop={5} />
                            <Divider sx={{ bgcolor: "secondary.light" }} />
                        </CardContent>
                        <Button style={{ marginLeft: '38%', marginTop: '5vh' }} color="primary" variant="contained" onClick={() => { updateInfo() }} > Update Information</Button>
                    </Card>
                </Stack>
            </Stack>
            <Footer />
        </div>
    )

}

export default Info