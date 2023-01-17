import { Button, Card, CardContent, Divider, IconButton, Snackbar, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import CloseIcon from '@mui/icons-material/Close';
import Footer from "../components/Footer";

const ResetPassword = (props: any) => {
    const [email, setEmail] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {

        setOpen(true);

        axios.post('http://localhost:3001/reset-password', {
            email: email,

        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                alert('email received successfully')
            });

    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

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
        <>
            <Card style={cardStyle}>
                <CardContent>
                    <Typography sx={{ fontSize: 34, mb: 1.5 }} component="div" gutterBottom>
                        Reset Password
                        <Divider sx={{ borderBottomWidth: 5 }} color='black' />
                    </Typography>
                    <Stack spacing={1.5} direction="column">
                        <TextField
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            placeholder="eg. name@example.com"
                            multiline
                        />

                        <Button variant="contained" onClick={handleClick}>Send Email</Button>
                        <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message="Email Sent"
                            action={action}
                        />
                    </Stack>
                </CardContent>
            </Card>
            <Footer />
        </>
    )
}

export default ResetPassword
