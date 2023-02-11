import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';
import { app, auth } from './DatabaseConnection';
import { Button } from '@mui/material';

import Login from './Login';
import Register from './Register';

import "./Controlere/Stil.css";


const db = getFirestore(app);

function Auth() {
    const logout = () => {
        signOut(auth);
    }

    const [user, loading] = useAuthState(auth);
    const [rol_user, setRol_user] = useState("");
    const [det_user, setDet_user] = useState({});

    async function get_detalii_user(docID) {
        const ref = doc(db, "users", docID);

        await getDoc(ref)
            .then(async (response) => {
                let res = response.data();

                setRol_user(res.rol);
                setDet_user(res)

            })
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        if (loading) {
            return;
        } else if (user) {
            get_detalii_user(user.uid);
        } else {
            setRol_user("guest");
        }
    }, [loading, user]);

    return (
        <div>
            {
                rol_user === "guest"

                    ?

                    <div className='test'>

                        <Login />

                        <Register />


                    </div>

                    : user

                        ?

                        <div className="center">
                            <div className="text">
                                <h3 className='login_info' style={{marginTop:'20px'}}>Logged in as: {det_user.prenume} {det_user.nume}</h3>
                                <br />
                                <h3 className='login_info'>Role: {rol_user}</h3>
                                {/* </div>

                                            <div className='center'> */}
                                <br />
                                <Button
                                    className="buton"
                                    variant="contained"
                                    onClick={() => {
                                        logout();
                                    }}
                                    component={Link} to={'/'}
                                    style={{ backgroundColor: '#2196f3', color: 'white', marginTop: '10px'}}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>


                        :

                        <></>
            }
        </div>
    )
}

export default Auth;