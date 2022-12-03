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
import ResponsiveNavBar from "./ResponsiveNavBar";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { maxHeight } from "@mui/system";
import Footer from "./Footer";

const Account = (props:any) => {

return(
    <>
    
    <List>
        <ListItem disablePadding>
            <ListItemButton component="a" href="/personal-info">
              <ListItemIcon>
                <BadgeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Personal info" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component="a" href="/payment-methods">
              <ListItemIcon>
                <PaymentOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Payment methods" />
            </ListItemButton>
        </ListItem>
    </List>

    
    </>
)

}

export default Account