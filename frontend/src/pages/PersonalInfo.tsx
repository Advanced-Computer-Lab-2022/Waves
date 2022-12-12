import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { ChangeEvent, useRef } from "react";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, SvgIcon, TextField, Typography } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Account from "../components/Account";
import Footer from "../components/Footer";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];

const Info = (props: any) => {
    const [isPassword, setIsPassword] = React.useState(false);
    const [isEmail, setIsEmail] = React.useState(false);
    const [isBiography, setIsBiography] = React.useState(false);

    const [profilePic, setProfilePic] = React.useState('/static/images/avatar/2.jpg');

    const [profilePicHover, setProfilePicHover] = React.useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    axios.get('http://localhost:3001/getProfilePic', { withCredentials: true }).then(response => {
        setProfilePic(response.data);
    })

    function updateInfo() {

    }

    const handleUpload = (e: any) => {
        inputRef.current?.click();
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
                                    <Avatar onClick={handleUpload} style={profilePicHover ? { transition: '.3s ease', filter: 'blur(2px)' } : {transition: '.3s ease'}} onMouseEnter={() => { setProfilePicHover(true) }} onMouseLeave={() => { setProfilePicHover(false) }} title="Profile Picture" sx={{ position: 'absolute', width: 125, height: 125 }} alt="Remy Sharp" src={profilePic} />
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
                                    admin
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
                                    isEmail ? <TextField id="outlined-basic" label="New Email" variant="outlined" name="email" /> : <Typography variant="h5" component="div">alienlearning@gmail.com</Typography>
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
                                    isPassword ? <TextField id="outlined-basic" label="New Password" variant="outlined" name="password" /> : <Typography variant="h5" component="div">***********</Typography>
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
                                    isBiography ? <TextField id="outlined-basic" label="New Biography" variant="outlined" name="biography" /> : <Typography variant="h5" component="div">My name is Barry Allen, and I am the fastest man alive</Typography>
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
                        <Button style={{ marginLeft: '38%', marginTop: '5vh' }} color="primary" variant="contained" onClick={() => { updateInfo() }}> Update Information</Button>
                    </Card>
                </Stack>
            </Stack>
            <Footer />
        </div>
    )

}

export default Info