import React, { useState,useEffect } from 'react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, FormControl, InputAdornment } from '@mui/material';
import "../Stil.css";
import { useLocation } from 'react-router-dom'


const db = getFirestore(app);
var date;


export default function Update_Anvelope() {
    const [id_anvelopa, setid_anvelopa] = useState();
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

    let navigate = useNavigate();

    const location = useLocation();
    const id = location.state.id;
    //var id = localStorage.getItem('anvelopa_id');


    const update = () =>{

        if(id){
            getDoc(doc(db, "anvelope", id)).then(docSnap =>{
                date = docSnap.data();
                setid_anvelopa(date.id);
                setnume(date.nume);
                setbrand(date.brand);
                setlatime(date.latime);
                setpret(date.pret);
                setprofil(date.profil);
                setdiametru(date.diametru);
                setsarcina(date.sarcina);
                setviteza(date.viteza);
                setan(date.an);
                setstoc(date.stoc);
            });
        } else {
            navigate('/');
        }
    }
    


    useEffect(()=>{
        update();
      },[])
    
    const handleSubmit = (event) => {
        const ref = doc(db, "anvelope", id);
        updateDoc(ref, {
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

        });     
        
        event.preventDefault();
        alert(`S-a modificat anvelopa: ${brand} ${nume}`);
        window.location.href = "http://localhost:3000/toanvelope";
    }
    
    const [user, loading, error] = useAuthState(auth);
    const [rol_user, setRol_user] = useState("");


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
                    <FormControl className="formular" onSubmit={handleSubmit}>
                        <h2 className="bt2">Modifica anvelope</h2>


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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
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
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
                                 />     

                                
                        <Button type="submit" onClick={handleSubmit} style={{ backgroundColor: '#2196f3', color: 'white', margin:'10px'}}>Update</Button>
                    </FormControl>
                    :
                        <></>
            }
        </div>
    )
}