import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import { getFirestore, collection, doc, getDoc, addDoc } from "firebase/firestore";
import { app, auth } from '../../DatabaseConnection';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, FormControl, InputAdornment } from '@mui/material';

import "../Stil.css";


const db = getFirestore(app);


export default function Add_Anvelope() {
    const [nume, setnume] = useState('');
    const [brand, setbrand] = useState('');
    const [latime, setlatime] = useState('');
    const [profil, setprofil] = useState('');
    const [diametru, setdiametru] = useState('');
    const [sarcina, setsarcina] = useState('');
    const [viteza, setviteza] = useState();
    const [an, setan] = useState();
    const [pret, setpret] = useState();
    const [stoc, setstoc] = useState();

    async function add_player(event) {
        
        var a = await addDoc(collection(db, "anvelope"), {
            brand: brand,
            nume: nume,
            latime: latime,
            profil: profil,
            diametru: diametru,
            sarcina: sarcina,
            viteza: viteza,
            an: an,
            pret: pret,
            stoc: stoc,
        }).then(alert(`Ati adaugat anvelopa: ${brand} ${nume}`));
          
        await Promise.all([a]);
        window.location.href = "http://localhost:3000/toanvelope";
    }

    const [user, loading, error] = useAuthState(auth);
    const [rol_user, setRol_user] = useState("");

    let navigate = useNavigate();


    async function get_detalii_user(docID){
        const ref = doc(db, "users", docID);

        await getDoc(ref)
        .then(async (response) => {
            let res = response.data();
            
            setRol_user(res.rol);
            if(res.rol !== "admin" && res.rol !== "angajat"){
                return navigate("/");
            }
        })
        .catch((e) => console.log(e));
    }

    useEffect(() => {
        if (loading){
            return;
        } else if(user){
            get_detalii_user(user.uid);
        } else {
            return navigate("/");
        }
    }, [loading, user]);


    return (
        <div className='center'>
            {
                rol_user !== ""
                    ?
                    <FormControl className="formular">
                        <h2 className="bt2">Adauga anvelope</h2>


                         <TextField  
                                    style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Brand"
                                     placeholder = 'Brand'
                                    onChange = {(e) => {
                                         setbrand(e.target.value);
                                     }}
                                     value = {brand}
                                     
                                 />

                                  <TextField  
                                  style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Nume"
                                     placeholder = 'Nume'
                                    onChange = {(e) => {
                                        setnume(e.target.value);
                                     }}
                                     value = {nume}
                                     
                                 /> 

                                    <TextField  
                                  style={{margin:'10px'}} 
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Latime"
                                     placeholder = 'Latime'
                                    onChange = {(e) => {
                                        setlatime(e.target.value);
                                     }}
                                     value = {latime}
                                     
                                 />       
                                 

                                 <TextField  
                                  style={{margin:'10px'}} 
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Profil"
                                     placeholder = 'Profil'
                                    onChange = {(e) => {
                                        setprofil(e.target.value);
                                     }}
                                     value = {profil}
                                     
                                 />     

                                    <TextField  
                                  style={{margin:'10px'}} 
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Diametru"
                                     placeholder = 'Diametru'
                                    onChange = {(e) => {
                                        setdiametru(e.target.value);
                                     }}
                                     value = {diametru}
                                     
                                 />    
                                 
                                 <TextField   
                                  style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Indice Sarcina"
                                     placeholder = 'Indice Sarcina'
                                    onChange = {(e) => {
                                        setsarcina(e.target.value);
                                     }}
                                     value = {sarcina}
                                     
                                 />   
                                 
                                 <TextField   
                                  style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Indice Viteza"
                                     placeholder = 'Indice Viteza'
                                    onChange = {(e) => {
                                        setviteza(e.target.value);
                                     }}
                                     value = {viteza}
                                     
                                 />  
                                 
                                 <TextField   
                                  style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "An Fabricatie"
                                     placeholder = 'An Fabricatie'
                                    onChange = {(e) => {
                                        setan(e.target.value);
                                     }}
                                     value = {an}
                                     
                                 />  
                                 
                                 <TextField   
                                  style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Pret"
                                     placeholder = 'Pret'
                                    onChange = {(e) => {
                                        setpret(e.target.value);
                                     }}
                                     value = {pret}
                                     
                                 /> 
                                 
                                 <TextField   
                                  style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Numar Stoc"
                                     placeholder = 'Numar Stoc'
                                    onChange = {(e) => {
                                        setstoc(e.target.value);
                                     }}
                                     value = {stoc}
                                     
                                 />     

                                
                        <Button type="submit" onClick={add_player} style={{ backgroundColor: '#2196f3', color: 'white', margin:'10px'}}>Submit</Button>
                    </FormControl>
                    :
                        <></>
            }
        </div>

        // <div className='form'>
        //     {
        //         rol_user !== ""
        //             ?
        //                 <Form className="create-form1">
                            
        //                     <h2 className="bt2">Add a player</h2>
                            
        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>Brand</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'Brand'
        //                             onChange = {(e) => {
        //                                 setbrand(e.target.value);
        //                             }}
        //                             value = {brand}
        //                         />
        //                     </Box>

        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>Nume</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'Nume'
        //                             onChange = {(e) => {
        //                                 setnume(e.target.value);
        //                             }}
        //                             value = {nume}
        //                         />
        //                     </Box>

        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>Latime</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'Latime'
        //                             onChange = {(e) => {
        //                                 setlatime(e.target.value);
        //                             }}
        //                             value = {latime}
        //                         />
        //                     </Box>

        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>Profil</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'Profil'
        //                             onChange = {(e) => {
        //                                 setprofil(e.target.value);
        //                             }}
        //                             value = {profil}
        //                         />
        //                     </Box>

        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>Diametru</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'Diametru'
        //                             onChange = {(e) => {
        //                                 setdiametru(e.target.value);
        //                             }}
        //                             value = {diametru}
        //                         />
        //                     </Box>

        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>Indice Sarcina</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'Indice Sarcina'
        //                             onChange = {(e) => {
        //                                 setsarcina(e.target.value);
        //                             }}
        //                             value = {sarcina}
        //                         />
        //                     </Box>

        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>Indice Viteza</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'Indice Viteza'
        //                             onChange = {(e) => {
        //                                 setviteza(e.target.value);
        //                             }}
        //                             value = {viteza}
        //                         />
        //                     </Box>

        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>An Fabricatie</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'An Fabricatie'
        //                             onChange = {(e) => {
        //                                 setan(e.target.value);
        //                             }}
        //                             value = {an}
        //                         />
        //                     </Box>

        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>Pret</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'Pret'
        //                             onChange = {(e) => {
        //                                 setpret(e.target.value);
        //                             }}
        //                             value = {pret}
        //                         />
        //                     </Box>

        //                     <Box
        //                         className = "field"
        //                         sx = {{ display: 'flex', alignItems: 'flex-start' }}
        //                     >
        //                         <label className='scris'>Numar Stoc</label>
        //                         <TextField
        //                             className="raspuns"
        //                             variant = "outlined"
        //                             placeholder = 'Numar Stoc'
        //                             onChange = {(e) => {
        //                                 setstoc(e.target.value);
        //                             }}
        //                             value = {stoc}
        //                         />
        //                     </Box>
                            
        //                     <Button className='bt2' onClick={add_player} type = 'submit'>Submit</Button>

        //                 </Form>
        //             :
        //                 <></>
        //     }
        // </div>
    )
}