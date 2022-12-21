//React Imports

import React, { CSSProperties, useCallback, useContext, useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";

//File Imports

//MaterialUI Imports

import { Button, TextField, List, ListItemAvatar, Tabs, Autocomplete, Dialog, Typography, Select, SelectChangeEvent, MenuItem, InputLabel, Stack, Checkbox, FormGroup} from "@mui/material";
import { ListItem, Divider, Avatar, Link, Drawer, Box, Alert, Tab} from "@mui/material";
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { Info, HelpCenter, ListAlt, LocalHospital, Person, Logout } from '@mui/icons-material';

import { textAlign } from "@mui/system";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
//CSS - Variables
const darkBlue = "#28536B"
const customRed = 'rgb(180,40,40)'

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
    height: "110vh",
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
    minHeight: "70%",
    borderRadius: "15px",
    border: "solid black 1px",
    marginBottom: 100
}

const title: CSSProperties = {
    fontSize: "85px",
    fontWeight: "bolder",
    fontFamily: "Inter",
    textShadow: "2px 2px 2px rgba(2,2,2,0.3)",

}

const signUp: CSSProperties = {
    fontSize: "40px",
    fontWeight: "bold",
    color: 'white',
    textShadow: "2px 2px 2px rgba(2,2,2,0.3)",
    marginTop: "30px",
    marginBottom: "20px",
}    

const textFields: CSSProperties = {
    width: "70%",
    marginTop: "20px",
    boxShadow: "2px 2px 6px rgba(1,1,1,0.5)",
    borderRadius: "4px",
}

const signUpButton: CSSProperties = {
    width: "70%",
    height: "20%",
    marginTop: "2%",
    fontSize: "17px",
}

const alert: CSSProperties = {
    position: "fixed",
    left: "0.5vw",
    top: "92vh",
    border: "1px black solid",
    zIndex: "101",
}

const SignUp = () => {

    //State declarations and Hooks
    
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const [signPop,setSignPop] = useState(false);

    const [password, setPassword] = React.useState("");
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    
    const [invCr, setInvCr] = useState(false);

    const [country, setCountry] = React.useState('');
      
    const handleCountryChange = (event: SelectChangeEvent) => {
      setCountry(event.target.value);
    }

    function handleSignUp() {
        if(email!==''&&password!=='' &&username!==''&&firstName!==''&&lastName!==''){
            try{
            axios.post('http://localhost:3001/register', {
                username: username,
                password: password,
                email: email,
                first_name: firstName,
                last_name: lastName,
                country: country,
                type: "Individual"
              }, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
                .then(response => {
                    //send email
                    setSignPop(true)
                });
            }
            catch{
                setInvCr(true)
            }

        } else{
             setInvCr(true)
            }
    }
    
    const pagesArr = ['Courses', 'Instructors', 'Add User', 'About Us'];

    //External functions

    //Main TSX starts here

    return (
        <>
        <ResponsiveNavBar pages={pagesArr} isNotLoggedIn={true}/>
            
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
                            mr: 1,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 1000,
                            fontSize: 60,
                            letterSpacing: '.4rem',
                            color: 'white',
                            textDecoration: 'none',
                            }}>Alien Learning</Typography>
                    </div>
                    <div style={signUpBox}>
                        <header style={signUp}>Sign Up</header>
                            <div>
                                <TextField style={textFields} value={firstName} onChange={(e) => setFirstName(e.target.value)} label="First Name" size="medium" variant="outlined" />
                                <br/>
                                <TextField style={textFields} value={lastName} onChange={(e) => setLastName(e.target.value)} label="Last Name" size="medium" variant="outlined" />
                                <br/>
                                <TextField style={textFields} value={username} onChange={(e) => setUsername(e.target.value)} label="Username" type="String" size="medium" variant="outlined" />
                                <br/>
                                <TextField style={textFields} value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" size="medium" variant="outlined" />
                                <br/>
                                <TextField style={textFields} value={password} onChange={(e) => setPassword(e.target.value)}  label="Password" type='password' size="medium" variant="outlined" />
                                <br/>
                                <FormControl variant="outlined" sx={{marginTop:2, width: "70%" }}>
                                <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={country}
                                        label="Country"
                                        onChange={handleCountryChange}
                                    >
                                        <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                                        <MenuItem value="Albania">Albania</MenuItem>
                                        <MenuItem value="Algeria">Algeria</MenuItem>
                                        <MenuItem value="American Samoa">American Samoa</MenuItem>
                                        <MenuItem value="Andorra">Andorra</MenuItem>
                                        <MenuItem value="Angola">Angola</MenuItem>
                                        <MenuItem value="Anguilla">Anguilla</MenuItem>
                                        <MenuItem value="Antartica">Antarctica</MenuItem>
                                        <MenuItem value="Antigua and Barbuda">Antigua and Barbuda</MenuItem>
                                        <MenuItem value="Argentina">Argentina</MenuItem>
                                        <MenuItem value="Armenia">Armenia</MenuItem>
                                        <MenuItem value="Aruba">Aruba</MenuItem>
                                        <MenuItem value="Australia">Australia</MenuItem>
                                        <MenuItem value="Austria">Austria</MenuItem>
                                        <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                                        <MenuItem value="Bahamas">Bahamas</MenuItem>
                                        <MenuItem value="Bahrain">Bahrain</MenuItem>
                                        <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                                        <MenuItem value="Barbados">Barbados</MenuItem>
                                        <MenuItem value="Belarus">Belarus</MenuItem>
                                        <MenuItem value="Belgium">Belgium</MenuItem>
                                        <MenuItem value="Belize">Belize</MenuItem>
                                        <MenuItem value="Benin">Benin</MenuItem>
                                        <MenuItem value="Bermuda">Bermuda</MenuItem>
                                        <MenuItem value="Bhutan">Bhutan</MenuItem>
                                        <MenuItem value="Bolivia">Bolivia</MenuItem>
                                        <MenuItem value="Bosnia and Herzegowina">Bosnia and Herzegowina</MenuItem>
                                        <MenuItem value="Botswana">Botswana</MenuItem>
                                        <MenuItem value="Bouvet Island">Bouvet Island</MenuItem>
                                        <MenuItem value="Brazil">Brazil</MenuItem>
                                        <MenuItem value="British Indian Ocean Territory">British Indian Ocean Territory</MenuItem>
                                        <MenuItem value="Brunei Darussalam">Brunei Darussalam</MenuItem>
                                        <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                                        <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
                                        <MenuItem value="Burundi">Burundi</MenuItem>
                                        <MenuItem value="Cambodia">Cambodia</MenuItem>
                                        <MenuItem value="Cameroon">Cameroon</MenuItem>
                                        <MenuItem value="Canada">Canada</MenuItem>
                                        <MenuItem value="Cape Verde">Cape Verde</MenuItem>
                                        <MenuItem value="Cayman Islands">Cayman Islands</MenuItem>
                                        <MenuItem value="Central African Republic">Central African Republic</MenuItem>
                                        <MenuItem value="Chad">Chad</MenuItem>
                                        <MenuItem value="Chile">Chile</MenuItem>
                                        <MenuItem value="China">China</MenuItem>
                                        <MenuItem value="Christmas Island">Christmas Island</MenuItem>
                                        <MenuItem value="Cocos Islands">Cocos (Keeling) Islands</MenuItem>
                                        <MenuItem value="Colombia">Colombia</MenuItem>
                                        <MenuItem value="Comoros">Comoros</MenuItem>
                                        <MenuItem value="Congo">Congo</MenuItem>
                                        <MenuItem value="Congo">Congo, the Democratic Republic of the</MenuItem>
                                        <MenuItem value="Cook Islands">Cook Islands</MenuItem>
                                        <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                                        <MenuItem value="Cota D'Ivoire">Cote d'Ivoire</MenuItem>
                                        <MenuItem value="Croatia">Croatia (Hrvatska)</MenuItem>
                                        <MenuItem value="Cuba">Cuba</MenuItem>
                                        <MenuItem value="Cyprus">Cyprus</MenuItem>
                                        <MenuItem value="Czech Republic">Czech Republic</MenuItem>
                                        <MenuItem value="Denmark">Denmark</MenuItem>
                                        <MenuItem value="Djibouti">Djibouti</MenuItem>
                                        <MenuItem value="Dominica">Dominica</MenuItem>
                                        <MenuItem value="Dominican Republic">Dominican Republic</MenuItem>
                                        <MenuItem value="East Timor">East Timor</MenuItem>
                                        <MenuItem value="Ecuador">Ecuador</MenuItem>
                                        <MenuItem value="Egypt">Egypt</MenuItem>
                                        <MenuItem value="El Salvador">El Salvador</MenuItem>
                                        <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem>
                                        <MenuItem value="Eritrea">Eritrea</MenuItem>
                                        <MenuItem value="Estonia">Estonia</MenuItem>
                                        <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                                        <MenuItem value="Falkland Islands">Falkland Islands (Malvinas)</MenuItem>
                                        <MenuItem value="Faroe Islands">Faroe Islands</MenuItem>
                                        <MenuItem value="Fiji">Fiji</MenuItem>
                                        <MenuItem value="Finland">Finland</MenuItem>
                                        <MenuItem value="France">France</MenuItem>
                                        <MenuItem value="France Metropolitan">France, Metropolitan</MenuItem>
                                        <MenuItem value="French Guiana">French Guiana</MenuItem>
                                        <MenuItem value="French Polynesia">French Polynesia</MenuItem>
                                        <MenuItem value="French Southern Territories">French Southern Territories</MenuItem>
                                        <MenuItem value="Gabon">Gabon</MenuItem>
                                        <MenuItem value="Gambia">Gambia</MenuItem>
                                        <MenuItem value="Georgia">Georgia</MenuItem>
                                        <MenuItem value="Germany">Germany</MenuItem>
                                        <MenuItem value="Ghana">Ghana</MenuItem>
                                        <MenuItem value="Gibraltar">Gibraltar</MenuItem>
                                        <MenuItem value="Greece">Greece</MenuItem>
                                        <MenuItem value="Greenland">Greenland</MenuItem>
                                        <MenuItem value="Grenada">Grenada</MenuItem>
                                        <MenuItem value="Guadeloupe">Guadeloupe</MenuItem>
                                        <MenuItem value="Guam">Guam</MenuItem>
                                        <MenuItem value="Guatemala">Guatemala</MenuItem>
                                        <MenuItem value="Guinea">Guinea</MenuItem>
                                        <MenuItem value="Guinea-Bissau">Guinea-Bissau</MenuItem>
                                        <MenuItem value="Guyana">Guyana</MenuItem>
                                        <MenuItem value="Haiti">Haiti</MenuItem>
                                        <MenuItem value="Heard and McDonald Islands">Heard and Mc Donald Islands</MenuItem>
                                        <MenuItem value="Holy See">Holy See (Vatican City State)</MenuItem>
                                        <MenuItem value="Honduras">Honduras</MenuItem>
                                        <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                                        <MenuItem value="Hungary">Hungary</MenuItem>
                                        <MenuItem value="Iceland">Iceland</MenuItem>
                                        <MenuItem value="India">India</MenuItem>
                                        <MenuItem value="Indonesia">Indonesia</MenuItem>
                                        <MenuItem value="Iran">Iran (Islamic Republic of)</MenuItem>
                                        <MenuItem value="Iraq">Iraq</MenuItem>
                                        <MenuItem value="Ireland">Ireland</MenuItem>
                                        <MenuItem value="Italy">Italy</MenuItem>
                                        <MenuItem value="Jamaica">Jamaica</MenuItem>
                                        <MenuItem value="Japan">Japan</MenuItem>
                                        <MenuItem value="Jordan">Jordan</MenuItem>
                                        <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
                                        <MenuItem value="Kenya">Kenya</MenuItem>
                                        <MenuItem value="Kiribati">Kiribati</MenuItem>
                                        <MenuItem value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</MenuItem>
                                        <MenuItem value="Korea">Korea, Republic of</MenuItem>
                                        <MenuItem value="Kuwait">Kuwait</MenuItem>
                                        <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
                                        <MenuItem value="Lao">Lao People's Democratic Republic</MenuItem>
                                        <MenuItem value="Latvia">Latvia</MenuItem>
                                        <MenuItem value="Lebanon">Lebanon</MenuItem>
                                        <MenuItem value="Lesotho">Lesotho</MenuItem>
                                        <MenuItem value="Liberia">Liberia</MenuItem>
                                        <MenuItem value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</MenuItem>
                                        <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
                                        <MenuItem value="Lithuania">Lithuania</MenuItem>
                                        <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                                        <MenuItem value="Macau">Macau</MenuItem>
                                        <MenuItem value="Macedonia">Macedonia, The Former Yugoslav Republic of</MenuItem>
                                        <MenuItem value="Madagascar">Madagascar</MenuItem>
                                        <MenuItem value="Malawi">Malawi</MenuItem>
                                        <MenuItem value="Malaysia">Malaysia</MenuItem>
                                        <MenuItem value="Maldives">Maldives</MenuItem>
                                        <MenuItem value="Mali">Mali</MenuItem>
                                        <MenuItem value="Malta">Malta</MenuItem>
                                        <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
                                        <MenuItem value="Martinique">Martinique</MenuItem>
                                        <MenuItem value="Mauritania">Mauritania</MenuItem>
                                        <MenuItem value="Mauritius">Mauritius</MenuItem>
                                        <MenuItem value="Mayotte">Mayotte</MenuItem>
                                        <MenuItem value="Mexico">Mexico</MenuItem>
                                        <MenuItem value="Micronesia">Micronesia, Federated States of</MenuItem>
                                        <MenuItem value="Moldova">Moldova, Republic of</MenuItem>
                                        <MenuItem value="Monaco">Monaco</MenuItem>
                                        <MenuItem value="Mongolia">Mongolia</MenuItem>
                                        <MenuItem value="Montserrat">Montserrat</MenuItem>
                                        <MenuItem value="Morocco">Morocco</MenuItem>
                                        <MenuItem value="Mozambique">Mozambique</MenuItem>
                                        <MenuItem value="Myanmar">Myanmar</MenuItem>
                                        <MenuItem value="Namibia">Namibia</MenuItem>
                                        <MenuItem value="Nauru">Nauru</MenuItem>
                                        <MenuItem value="Nepal">Nepal</MenuItem>
                                        <MenuItem value="Netherlands">Netherlands</MenuItem>
                                        <MenuItem value="Netherlands Antilles">Netherlands Antilles</MenuItem>
                                        <MenuItem value="New Caledonia">New Caledonia</MenuItem>
                                        <MenuItem value="New Zealand">New Zealand</MenuItem>
                                        <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                                        <MenuItem value="Niger">Niger</MenuItem>
                                        <MenuItem value="Nigeria">Nigeria</MenuItem>
                                        <MenuItem value="Niue">Niue</MenuItem>
                                        <MenuItem value="Norfolk Island">Norfolk Island</MenuItem>
                                        <MenuItem value="Northern Mariana Islands">Northern Mariana Islands</MenuItem>
                                        <MenuItem value="Norway">Norway</MenuItem>
                                        <MenuItem value="Oman">Oman</MenuItem>
                                        <MenuItem value="Pakistan">Pakistan</MenuItem>
                                        <MenuItem value="Palau">Palau</MenuItem>
                                        <MenuItem value="Palestine">Palestine</MenuItem>
                                        <MenuItem value="Panama">Panama</MenuItem>
                                        <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem>
                                        <MenuItem value="Paraguay">Paraguay</MenuItem>
                                        <MenuItem value="Peru">Peru</MenuItem>
                                        <MenuItem value="Philippines">Philippines</MenuItem>
                                        <MenuItem value="Pitcairn">Pitcairn</MenuItem>
                                        <MenuItem value="Poland">Poland</MenuItem>
                                        <MenuItem value="Portugal">Portugal</MenuItem>
                                        <MenuItem value="Puerto Rico">Puerto Rico</MenuItem>
                                        <MenuItem value="Qatar">Qatar</MenuItem>
                                        <MenuItem value="Reunion">Reunion</MenuItem>
                                        <MenuItem value="Romania">Romania</MenuItem>
                                        <MenuItem value="Russia">Russian Federation</MenuItem>
                                        <MenuItem value="Rwanda">Rwanda</MenuItem>
                                        <MenuItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</MenuItem> 
                                        <MenuItem value="Saint LUCIA">Saint LUCIA</MenuItem>
                                        <MenuItem value="Saint Vincent">Saint Vincent and the Grenadines</MenuItem>
                                        <MenuItem value="Samoa">Samoa</MenuItem>
                                        <MenuItem value="San Marino">San Marino</MenuItem>
                                        <MenuItem value="Sao Tome and Principe">Sao Tome and Principe</MenuItem> 
                                        <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                                        <MenuItem value="Senegal">Senegal</MenuItem>
                                        <MenuItem value="Seychelles">Seychelles</MenuItem>
                                        <MenuItem value="Sierra">Sierra Leone</MenuItem>
                                        <MenuItem value="Singapore">Singapore</MenuItem>
                                        <MenuItem value="Slovakia">Slovakia (Slovak Republic)</MenuItem>
                                        <MenuItem value="Slovenia">Slovenia</MenuItem>
                                        <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
                                        <MenuItem value="Somalia">Somalia</MenuItem>
                                        <MenuItem value="South Africa">South Africa</MenuItem>
                                        <MenuItem value="South Georgia">South Georgia and the South Sandwich Islands</MenuItem>
                                        <MenuItem value="Span">Spain</MenuItem>
                                        <MenuItem value="SriLanka">Sri Lanka</MenuItem>
                                        <MenuItem value="St. Helena">St. Helena</MenuItem>
                                        <MenuItem value="St. Pierre and Miguelon">St. Pierre and Miquelon</MenuItem>
                                        <MenuItem value="Sudan">Sudan</MenuItem>
                                        <MenuItem value="Suriname">Suriname</MenuItem>
                                        <MenuItem value="Svalbard">Svalbard and Jan Mayen Islands</MenuItem>
                                        <MenuItem value="Swaziland">Swaziland</MenuItem>
                                        <MenuItem value="Sweden">Sweden</MenuItem>
                                        <MenuItem value="Switzerland">Switzerland</MenuItem>
                                        <MenuItem value="Syria">Syrian Arab Republic</MenuItem>
                                        <MenuItem value="Taiwan">Taiwan, Province of China</MenuItem>
                                        <MenuItem value="Tajikistan">Tajikistan</MenuItem>
                                        <MenuItem value="Tanzania">Tanzania, United Republic of</MenuItem>
                                        <MenuItem value="Thailand">Thailand</MenuItem>
                                        <MenuItem value="Togo">Togo</MenuItem>
                                        <MenuItem value="Tokelau">Tokelau</MenuItem>
                                        <MenuItem value="Tonga">Tonga</MenuItem>
                                        <MenuItem value="Trinidad and Tobago">Trinidad and Tobago</MenuItem>
                                        <MenuItem value="Tunisia">Tunisia</MenuItem>
                                        <MenuItem value="Turkey">Turkey</MenuItem>
                                        <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
                                        <MenuItem value="Turks and Caicos">Turks and Caicos Islands</MenuItem>
                                        <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                                        <MenuItem value="Uganda">Uganda</MenuItem>
                                        <MenuItem value="Ukraine">Ukraine</MenuItem>
                                        <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
                                        <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                                        <MenuItem value="United States">United States</MenuItem>
                                        <MenuItem value="United States Minor Outlying Islands">United States Minor Outlying Islands</MenuItem>
                                        <MenuItem value="Uruguay">Uruguay</MenuItem>
                                        <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                                        <MenuItem value="Vanuatu">Vanuatu</MenuItem>
                                        <MenuItem value="Venezuela">Venezuela</MenuItem>
                                        <MenuItem value="Vietnam">Viet Nam</MenuItem>
                                        <MenuItem value="Virgin Islands (British)">Virgin Islands (British)</MenuItem>
                                        <MenuItem value="Virgin Islands (U.S)">Virgin Islands (U.S.)</MenuItem>
                                        <MenuItem value="Wallis and Futana Islands">Wallis and Futuna Islands</MenuItem>
                                        <MenuItem value="Western Sahara">Western Sahara</MenuItem>
                                        <MenuItem value="Yemen">Yemen</MenuItem>
                                        <MenuItem value="Serbia">Serbia</MenuItem>
                                        <MenuItem value="Zambia">Zambia</MenuItem>
                                        <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
                                    </Select>
                                </FormControl>
                            <br/>
                            <FormControl>
                                <Stack marginTop={2} spacing={3} direction={"row"}>
                                    <FormLabel style={{marginTop: 7, fontSize: "20px", color: customRed}} >Gender:</FormLabel>
                                    <RadioGroup row>
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </Stack>
                            </FormControl>
                            <br/>
                            <FormGroup>
                                <FormControlLabel sx={{marginLeft:11, marginTop:1}} control={<Checkbox />} label={<div>
                                    <span>I accept the </span>
                                    <Link href='/terms'>terms of use</Link>
                                    <span> and </span>
                                    <Link href='/privacy'>privacy policy</Link>
                                </div>
                                }/>
                            </FormGroup>
                            <br/>
                            <ThemeProvider theme={theme}>
                                <Button color="primary" variant="contained" onClick={() => {handleSignUp()} } style={signUpButton}>Sign Up</Button>
                            </ThemeProvider>
                            <br/>
                        </div>    
                    </div>
                </div>
            </div>
            <Footer/>
            </ThemeProvider>
        </>
    );
};

export default SignUp;
