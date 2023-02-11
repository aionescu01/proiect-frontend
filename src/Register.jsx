import { useState } from "react";
import { app, auth } from "./DatabaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, where, query, collection, getDocs, limit } from "firebase/firestore";

import { MenuItem, FormControl, Select, Box, TextField, IconButton, Button, FormHelperText } from '@mui/material';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import "./Controlere/Stil.css";
import "./Login.css"

const db = getFirestore(app);

function Register(){
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [rol, setRol] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [userError, setUserError] = useState(false);
    const [emailUsedError, setEmailUsedError] = useState(false);
    const [emailInvalidError, setEmailInvalidError] = useState(false);
    const [passwdError, setPasswdError] = useState(false);


    const handleShowPassword = () => setShowPassword(!showPassword);

    const register = async (event) => {
        try{
            event.preventDefault();

            //const userRef = await checkUser(rol, nume, prenume);

            // if (userRef){
                createUserWithEmailAndPassword(auth, email, passwd)
                .then(async (res) => {

                    await setDoc(doc(db, "users", res.user.uid), {
                        email: email,
                        nume: nume,
                        parola: passwd,
                        prenume: prenume,
                        rol: "client",
                        //user: userRef,
                    });

                    setEmail('');
                    setPasswd('');
                    setNume('');
                    setPrenume('');
                    //setRol('');
                })
                .catch((error) => {
                    if(error.code === "auth/weak-password"){
                        setPasswdError(true);
                    } else if(error.code === "auth/email-already-in-use"){
                        setEmailUsedError(true);
                    } else if(error.code === "auth/invalid-email"){
                        setEmailInvalidError(true);
                    }
                });
            // } 
            // else {
            //     setUserError(true);
            // }
        } catch (error){
            console.log(error.message);
        }
    }
    

    return(
        <div className = "login">
            
            <label className="scrislogin">REGISTER</label>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
                //style={{paddingRight:'30px'}}
            >
                <EmailOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                <TextField
                    className="scriere"
                    autoComplete = "new-password"
                    variant = "outlined"
                    error = {emailUsedError || emailInvalidError}
                    helperText = {emailUsedError ? "Email deja utilizat" : emailInvalidError ? "Format nevalid de e-mail" : ""}
                    placeholder = "Email"
                    onChange = {(event) => {
                        if(emailUsedError){
                            setEmailUsedError(false);
                        } else if (emailInvalidError){
                            setEmailInvalidError(false);
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
                    autoComplete = "new-password"
                    variant = "outlined"
                    className="scriere"
                    id="parola"
                    error = {passwdError}
                    helperText = {passwdError ? "Parola slaba" : ""}
                    type = {showPassword ? "text" : "password"}
                    placeholder = "Parola"
                    onChange = {(event) => {
                        if(passwdError){
                            setPasswdError(false);
                        }
                        setPasswd(event.target.value);
                    }}
                    value = {passwd}
                    //sx = {{ mr: 1}}
                />
                <IconButton
                    onClick = { handleShowPassword }
                    sx = {{ color: '#E3F6F5', mt: 1, ml:-1}}
                >
                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </IconButton>
            </Box>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <AccountCircleOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                <TextField
                    className="scriere"
                    autoComplete = "off"
                    variant = "outlined"
                    error = {userError}
                    helperText = {userError ? "Membru inexistent" : ""}
                    placeholder = "Nume"
                    onChange = {(event) => {
                        if(userError){
                            setUserError(false);
                        }
                        setNume(event.target.value);
                    }}
                    value = {nume}
                />
            </Box>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <AccountCircleOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                <TextField
                    autoComplete = "off"
                    className="scriere"
                    variant = "outlined"
                    error = {userError}
                    helperText = {userError ? "Membru inexistent" : ""}
                    placeholder = "Prenume"
                    onChange = {(event) => {
                        if(userError){
                            setUserError(false);
                        }
                        setPrenume(event.target.value);
                    }}
                    value = {prenume}
                />
            </Box>

            <Button 
             style={{ backgroundColor: '#2196f3', color: 'white', margin:'10px'}}
                className = "butonlogin"
                variant = "contained"
                onClick={(event) => {
                    register(event);
                    }}>
                        Register
            </Button>
            
        </div>
    );
}

export default Register;