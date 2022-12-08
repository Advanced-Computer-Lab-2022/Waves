import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect } from "react";
import { Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, SvgIcon, Typography } from "@mui/material";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { maxHeight } from "@mui/system";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Account from "../components/Account";
import Footer from "../components/Footer";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];

function updateInfo() {

}

const Info = (props: any) => {

    return (
        <>
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
                            <Stack marginTop={2}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    NAME
                                </Typography>
                            </Stack>
                            <Stack direction="row" marginTop={2}>
                                <Typography variant="h5" component="div">
                                    Username
                                </Typography>
                                <Stack marginLeft={50}>
                                    <Button href="/personal-info/edit-name">
                                        <CreateOutlinedIcon />
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack marginTop={5} />
                            <Divider sx={{ bgcolor: "secondary.light" }} />
                            <Stack marginTop={2}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    EMAIL
                                </Typography>
                            </Stack>
                            <Stack direction="row" marginTop={2}>
                                <Typography variant="h5" component="div">
                                    your email
                                </Typography>
                                <Stack marginLeft={50}>
                                    <Button href="/personal-info/edit-email">
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
                                <Typography variant="h5" component="div">
                                    ***********
                                </Typography>
                                <Stack marginLeft={50}>
                                    <Button href="/personal-info/edit-password">
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
                                <Typography variant="h5" component="div">
                                    your biography
                                </Typography>
                                <Stack marginLeft={50}>
                                    <Button href="/personal-info/edit-biographyA">
                                        <CreateOutlinedIcon />
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack marginTop={5} />
                            <Divider sx={{ bgcolor: "secondary.light" }} />
                        </CardContent>
                        <Button style={{marginLeft:'38%', marginTop:'5vh'}} color="primary" variant="contained" onClick={() => {updateInfo()} }> Update Information</Button>
                    </Card>
                </Stack>
            </Stack>
            <Footer />
        </>
    )

}

export default Info