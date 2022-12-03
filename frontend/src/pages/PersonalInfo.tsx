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


const Info = (props:any) => {

    var cardStyle = {
        width: '50vw',
        height: '30vw'
    }

return(
    <>
    <ResponsiveNavBar/>
    <Stack direction="row">
        <Account/>
        <Stack marginLeft={20}>
        <Card style={cardStyle}>
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
                <CreateOutlinedIcon/>
                </Button>
                </Stack>  
                </Stack> 
                <Stack marginTop={5}/>
                <Divider sx={{ bgcolor: "secondary.light" }}/>
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
                <CreateOutlinedIcon/>
                </Button>
                </Stack>  
                </Stack> 
                <Stack marginTop={5}/>
                <Divider sx={{ bgcolor: "secondary.light" }}/>
            </CardContent>
        </Card>
        </Stack>
    </Stack>
    <Footer/>
    </>
)

}

export default Info