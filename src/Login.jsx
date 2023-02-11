import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./DatabaseConnection";

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Box, TextField, Button, FormControl, Input, FormHelperText, InputLabel, FormLabel, InputAdornment, IconButton } from '@mui/material';

import "./Login.css"


function Login(){
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwdError, setPasswdError] = useState(false);


    const handleShowPassword = () => setShowPassword(!showPassword);

    const login = async (event) => {
        try{
            event.preventDefault();

            setEmailError(false);
            setPasswdError(false);

            await signInWithEmailAndPassword(auth, email, passwd);
            
            setEmail('');
            setPasswd('');
        } catch (error){
            if(error.code === "auth/invalid-email"){
                setEmailError(true);
            }
            else if (error.code === "auth/wrong-password"){
                setPasswdError(true);
            } else if(error.code === "auth/user-not-found"){
                setEmailError(true);
                setPasswdError(true);
            }
        }
    }
    

    return(
        <div className = "login">

            <label className="scrislogin">LOGIN</label>
            
            {/* <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
                //style={{padding:'16.5px 33px'}}
            >
                <EmailOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />

                <TextField
                
                    className="scriere"
                    variant = "outlined"
                    label = "Email"
                    error = {emailError}
                    helperText = {emailError ? passwdError ? "Userul nu exista" : "Email incorect" : ""}
                    placeholder = "Email"
                    onChange = {(event) => {
                        if(emailError){
                            setEmailError(false);
                        }
                        setEmail(event.target.value);
                    }}
                    value = {email}
                />
                
            </Box> */}
            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <EmailOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />

                <TextField
                    className="scriere"
                    variant = "outlined"
                    error = {emailError}
                    helperText = {emailError ? passwdError ? "Userul nu exista" : "Email incorect" : ""}
                    placeholder = "Email"
                    onChange = {(event) => {
                        if(emailError){
                            setEmailError(false);
                        }
                        setEmail(event.target.value);
                    }}
                    value = {email}
                />
                
            </Box>
            
            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <PasswordOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                <TextField
                    variant = "outlined"
                    className="scriere"
                    //label = "Parola"
                    error = {passwdError}
                    helperText = {passwdError ? emailError ? "Userul nu exista" : "Parola incorecta" : ""}
                    type = {showPassword ? "text" : "password"}
                    placeholder = "Parola"
                    onChange = {(event) => {
                        if(passwdError){
                            setPasswdError(false);
                        }
                        setPasswd(event.target.value);
                    }}
                    value = {passwd}
                />
                 <IconButton
                    onClick = { handleShowPassword }
                    sx = {{ color: '#E3F6F5', mt: 1, ml:-1}}
                >
                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </IconButton>
            </Box>

            <Button
            style={{ backgroundColor: '#2196f3', color: 'white', margin:'10px'}}
                className = "butonlogin" 
                variant = "contained"
                onClick = {(event) => {
                    login(event);
                    }}>
                        Login
            </Button>
        
        </div>
        
    );
}

export default Login;