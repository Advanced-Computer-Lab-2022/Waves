import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import axios from 'axios';

const handleSubmit = (e: any) => {
    e.preventDefault();
    const userInfo = new FormData(e.target)
    console.log(Object.fromEntries(userInfo.entries()))
    const username = Object.fromEntries(userInfo.entries()).username
    const password = Object.fromEntries(userInfo.entries()).password
    axios.post('/authenticate', {
        username: username,
        password: password
      })
      .then(function (response) {
        console.log('success');
      })
      .catch(function (error) {
        console.log('error');
      });
}



const Login = (props:any) => {
    return (
        <>

            <Navbar>
            </Navbar>
            <div className="container">
                <div className="row g-2 m-3">
                    <form method="POST" action="/authenticate">
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