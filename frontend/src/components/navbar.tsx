import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = (props:any) => {
    const navigate = useNavigate();
    return(
            <>
                <nav className="navbar navbar-expand-lg bg-secondary bg-gradient">
                    <div className="container-fluid">
                        <img style={{width:30, height:40, marginRight:20}} src={'../AlienwareLogo.png'} alt="Alien"/>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-white" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled text-white">Disabled</a>
                            </li>
                            </ul>
                            <div className="d-flex">
                                <button id="loginButton" onClick = {() => navigate('/login')} className="me-2 btn btn-outline-dark" type="submit">Login</button>
                                <button id="signupButton" onClick = {() => navigate('/signup')} className="btn btn-outline-dark" type="submit">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
    )
}

export default Navbar;