import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';



const Login = (props:any) => {
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userInfo = new FormData(e.target)
        const username = Object.fromEntries(userInfo.entries()).username
        const password = Object.fromEntries(userInfo.entries()).password
    
        axios.post('http://localhost:3001/authenticate', {
            username: username,
            password: password
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
                navigate("../" + response.data);
            });
    }

    return (
        <>
            <Navbar>
            </Navbar>
            <div className="container">
                <div className="row g-2 m-3">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="p-2">
                            </div>
                            <div className="p-2">
                                <TextField id="outlined-basic" label="Username" variant="outlined" name="username" />
                            </div>
                        </div>
                        <div>
                            <div className="p-2">
                            
                            </div>
                            <div className="p-2">
                                <TextField id="outlined-basic" label="Password" variant="outlined" name="password" />
                            </div>
                        </div>
                        <div>
                        </div>
                        <button className="ms-2 mt-1 btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;