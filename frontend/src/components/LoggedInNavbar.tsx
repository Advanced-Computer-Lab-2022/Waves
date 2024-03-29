import {
    BrowserRouter as Router,
    Route,
    useNavigate,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, SvgIcon } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';

const LoggedInNavbar = (props:any) => {
    const navigate = useNavigate();
    return(
            <>
                <nav className="navbar navbar-expand-lg bg-secondary bg-gradient">
                    <div className="container-fluid">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-apple" viewBox="0 0 16 16">
                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                        </svg>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-lg-0">
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
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled text-white">Disabled</a>
                            </li>
                            </ul>
                            <Badge badgeContent={4} color="primary">
                                <SvgIcon style={{cursor: 'pointer'}} onClick={e => navigate("../inbox")} fontSize="large" component={MailIcon} inheritViewBox />
                            </Badge>
                            <div className="row">
                                <form method="POST" action="/search">
                                    <div className="col-8">
                                        <input className="form-control" placeholder="search" name="searchTerm"  id="search"></input>
                                    </div>
                                    <div className="p-1">
                                        <select name = "rating" id="ratingfilter"> 
                                            <option selected disabled>Rating</option>
                                            <option value = "1">1</option>
                                            <option value = "2">2</option>
                                            <option value = "3">3</option>
                                            <option value = "4">4</option>
                                            <option value = "5">5</option>
                                        </select>
                    
                                        <select name = "subject">
                                            <option selected disabled>Subject</option>
                                            <option value = "Math">Math</option>
                                            <option value = "Physics">Physics</option>
                                            <option value = "Chemistry">Chemistry</option>
                                            <option value = "Biology">Biology</option>
                                            <option value = "Computer Science">Computer Science</option>
                                        </select>
                    
                                        <select name = "price">
                                            <option selected disabled>Price</option>
                                            <option value = "0">0</option>
                                            <option value = "100>">100</option>
                                            <option value = "200">200</option>
                                            <option value = "350">350</option>
                                            <option value = "500">500</option>
                                        </select>
                                        <div className="col p-1">
                                            <button id="searchButton" className="btn btn-outline-dark" type="submit">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
    )
}

export default LoggedInNavbar;