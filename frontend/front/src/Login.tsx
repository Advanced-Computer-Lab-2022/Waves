import 'bootstrap/dist/css/bootstrap.min.css';
import axios from './api/axios';
import Navbar from './navbar';
import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";




const Login = (props:any) => {
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userInfo = new FormData(e.target)
        console.log(Object.fromEntries(userInfo.entries()))
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
                                <label>Username:</label>
                            </div>
                            <div className="p-2">
                                <input className="form-control" placeholder="Username" name="username"  id="username"></input>
                            </div>
                        </div>
                        <div>
                            <div className="p-2">
                                <label>Password:</label>
                            </div>
                            <div className="p-2">
                                <input className="form-control" placeholder="Password" type="password" name="password"  id="password"></input>
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