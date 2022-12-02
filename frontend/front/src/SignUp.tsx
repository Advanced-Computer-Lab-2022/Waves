//React Imports

import React, { CSSProperties, useCallback, useContext, useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";

//File Imports

//MaterialUI Imports

import { Button, TextField, List, ListItemAvatar, Tabs, Autocomplete, Dialog, Typography} from "@mui/material";
import { ListItem, Divider, Avatar, Link, Drawer, Box, Alert, Tab} from "@mui/material";
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { Info, HelpCenter, ListAlt, LocalHospital, Person, Logout } from '@mui/icons-material';

import { textAlign } from "@mui/system";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

import { createTheme, ThemeProvider } from '@mui/material/styles';
//CSS - Variables
const darkBlue = "#28536B"
const customRed = 'rgb(210,40,40)'

//CSS - Style Objects

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
  
    interface Palette {
      neutral: Palette['primary'];
    }
    interface PaletteOptions {
      neutral: PaletteOptions['primary'];
    }
  
    interface PaletteColor {
      darker?: string;
    }
    interface SimplePaletteColorOptions {
      darker?: string;
    }
    interface ThemeOptions {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
  }
  


const theme = createTheme({
  status: {
    danger: 'rgb(200,25,25)',
  },
  palette: {
    primary: {
      main: customRed,
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const backgroundStyle: CSSProperties = {
    height: "120vh",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden"
    
}

const midBar: CSSProperties = {
    backgroundImage: `url('../GreyBackground.png')`,
    width: "100%",
    borderLeft: "solid #747474 2px",
    borderRight: "solid #747474 2px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
}

const signUpBox: CSSProperties = {
    backgroundImage: `url('../Test.jpg')`,
    width: "28%",
    height: "75vh",
    borderRadius: "15px",
    border: "solid black 1px",
}

const title: CSSProperties = {
    fontSize: "85px",
    fontWeight: "bolder",
    fontFamily: "Inter",
    textShadow: "2px 2px 2px rgba(2,2,2,0.3)",
    color: 'white',

}

const signUp: CSSProperties = {
    fontSize: "40px",
    fontWeight: "bold",
    color: 'white',
    textShadow: "2px 2px 2px rgba(2,2,2,0.3)",
    marginTop: "15px",
}    

const textFields: CSSProperties = {
    width: "70%",
    marginTop: "20px",
    boxShadow: "2px 2px 6px rgba(1,1,1,0.5)",
    borderRadius: "4px",
}

const passForget: CSSProperties = {
    float: "left",
    paddingLeft: "15%",
    color: "#4b93ff",
    paddingTop: "5px",
}

const signUpButton: CSSProperties = {
    width: "70%",
    height: "45px",
    marginTop: "10px",
    fontSize: "17px",
}

const alert: CSSProperties = {
    position: "fixed",
    left: "0.5vw",
    top: "92vh",
    border: "1px black solid",
    zIndex: "101",
}

const signUpTab: CSSProperties = {
    fontSize: "15px",
    fontFamily: "Inter",
}

const pushAuto: CSSProperties = {
    display: "flex",
    justifyContent: "center",
}

const SignUp = () => {

    //State declarations and Hooks
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState('');
    const [tab, setTab] = React.useState(0);
    const navigate = useNavigate();
    const [signPop,setSignPop] = useState(false);

    const [email, setEmail] = useState('')
    
    const [invCr, setInvCr] = useState(false);

    //External functions

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
      };

    //Main TSX starts here

    return (
        <>
        <Navbar></Navbar>
            
        <ThemeProvider theme={theme}>
            <div style={backgroundStyle}>
                {error&&            
                <Alert style={alert} severity="error">
                    {error}
                </Alert>}
                <Dialog open={signPop}>
                    <div style={{ paddingTop:"40px",width:"450px", height:"160px", textAlign: "center", }}>
                        An email containing a verification link has been sent to {email}
                        <br/>
                        <br/>                    
                        <Button onClick={() => navigate("/login")}  variant="contained">Continue</Button>
                    </div>
                </Dialog>
                <Dialog open={invCr}>
                    <div style={{ paddingTop:"40px",width:"450px", height:"160px", textAlign: "center", fontSize:"21px"}}>
                    Invalid Credentials
                        <br/>
                        <br/>                    
                        <Button onClick={() => setInvCr(false)}  variant="contained">Continue</Button>
                    </div>
                </Dialog>
                <div style={midBar}>
                    <div style={title}>
                        <img style={{width:90, height:120, marginRight:20}} src={"../AlienwareLogo.png"}/>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 1000,
                            fontSize: 50,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                            }}>Alien Learning</Typography>
                    </div>
                    <div style={signUpBox}>
                        <header style={signUp}>Sign Up</header>
                        {(tab===0)&&
                            <div>
                                    <TextField style={textFields} label="First Name" size="medium" variant="outlined" />
                                    <br/>
                                    <TextField style={textFields} label="Last Name" size="medium" variant="outlined" />
                                    <br/>
                                    <TextField style={textFields} label="Username" type="String" size="medium" variant="outlined" />
                                    <br/>
                                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} style={textFields} label="Email Address" size="medium" variant="outlined" />
                                    <br/>
                                    <TextField style={textFields} value={password} onChange={(e) => setPassword(e.target.value)}  label="Password" size="medium" variant="outlined" type="password" />
                                    <br/>
                                <br/>
                                <FormControl>
                                    <FormLabel style={{fontSize: "20px", color: customRed}} >Gender</FormLabel>
                                    <RadioGroup row >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                                <br/>
                                <br/>
                                <ThemeProvider theme={theme}>
                                    <Button color="primary" variant="contained" onClick={() => {if(email!==''&&password!==''){setSignPop(true)} else{ setInvCr(true)}} } style={signUpButton}>Sign Up</Button>
                                </ThemeProvider>
                                <br/>
                                <Link style={passForget} href="" onClick={() => navigate("/login")} underline="hover">
                                    Already have an account? Sign In!
                                </Link>
                            </div>    
                        }
                        {(tab===1)&&
                            <div>
                                <TextField style={textFields} label="Name" size="medium" variant="outlined" />
                                <br/>
                                <span style={pushAuto}>
                                </span>
                                <TextField style={textFields} value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" size="medium" variant="outlined" />
                                <br/>
                                <TextField style={textFields} value={password} onChange={(e) => setPassword(e.target.value)} label="Password" size="medium" variant="outlined" type="password" />
                                <br/>
                                <br/>
                                <FormControl>
                                    <FormLabel style={{fontSize: "20px", color: darkBlue}} >Gender</FormLabel>
                                    <RadioGroup row >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                                <br/>
                                <span style={{fontWeight: "bold", fontSize: "15px", fontFamily: "Inter", paddingLeft:"50px"}}>Upload Documents</span>
                                <input style={{float: "right"}}type="file" />
                                <br/>
                                <Button variant="contained" onClick={() => {if(email!==''&&password!==''){setSignPop(true)} else{ setInvCr(true)}} } style={signUpButton}>Sign Up</Button>
                                <br/>
                                <Link style={passForget} href="" onClick={() => navigate("/login")} underline="hover">
                                    Already have an account? Sign In!
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer/>
            </ThemeProvider>
        </>
    );

};

export default SignUp;



/*
    <div class="p-2">
                <Label>Select Country:</Label>
            </div>
            <div class="p-1">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                    <option value="Select Country" selected>Select Country</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antartica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo">Congo, the Democratic Republic of the</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                    <option value="Croatia">Croatia (Hrvatska)</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="East Timor">East Timor</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="France Metropolitan">France, Metropolitan</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                    <option value="Holy See">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran (Islamic Republic of)</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                    <option value="Korea">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia, Federated States of</option>
                    <option value="Moldova">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
                    <option value="Saint LUCIA">Saint LUCIA</option>
                    <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia (Slovak Republic)</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                    <option value="Span">Spain</option>
                    <option value="SriLanka">Sri Lanka</option>
                    <option value="St. Helena">St. Helena</option>
                    <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Viet Nam</option>
                    <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                    <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                    <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                </select>
            </div>
*/