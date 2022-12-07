import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import ResponsiveNavBar from "../components/ResponsiveNavBar";

const ResetPassword = (props:any) => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userInfo = new FormData(e.target)
        const email = Object.fromEntries(userInfo.entries()).email
        
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
    }

    return (
        <>
        
            <form onSubmit={handleSubmit}>
            <Stack spacing={1.5} direction="column"
                justifyContent="space-evenly"
                alignItems="baseline" marginTop={1.5} marginLeft={1.5}>
            <TextField
                id="email"
                name="email"
                label="Email"
                placeholder="eg. name@example.com"
                multiline
            />
            
            </Stack>
            <button className="ms-2 mt-1 btn btn-primary">Send Email</button>
            </form>
        </>
    )
}

export default ResetPassword
