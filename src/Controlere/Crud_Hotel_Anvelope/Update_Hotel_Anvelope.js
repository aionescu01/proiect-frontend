import React, { useState,useEffect } from 'react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, FormControl, Input, FormHelperText, InputLabel, FormLabel, InputAdornment } from '@mui/material';
import Calendar from "react-select-date";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "../Stil.css";
import { useLocation } from 'react-router-dom'

const db = getFirestore(app);
var date;

export function addZero(num) {
    return num > 9 ? num : "0" + num;
  }
  const currentDate =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();

export default function Update_Hotel_Anvelope() {
    const [raft, setraft] = useState();
    const [data_cazare, setdata_cazare] = useState('');
    const [inmatriculare, setinmatriculare] = useState('');
    const [anvelopa, setanvelopa] = useState();
    const [detalii, setdetalii] = useState();

    const [showcld_single, setShowcld_single] = useState(true);
    const [singleDate, setSingleDate] = useState(new Date());

    let navigate = useNavigate();


    const location = useLocation();
    const id = location.state.id;
    const data = location.state.data_cazare;

    const update = () =>{
        if(id){
            getDoc(doc(db, "hotel", id)).then(docSnap =>{
                date = docSnap.data();


                setraft(date.raft);
                setdata_cazare(data);
                setinmatriculare(date.inmatriculare);
                setdetalii(date.detalii);
                setanvelopa(date.anvelopa);

                
            });
        } else {
            navigate('/');
        }
    }
    
    useEffect(()=>{
        update();
    },[])
    
    const handleSubmit = (event) => {

        const washingtonRef = doc(db, "hotel", id);

        updateDoc(washingtonRef, {
            raft: raft,
            inmatriculare: inmatriculare,
            data_cazare: Timestamp.fromDate(new Date(data_cazare)),
            detalii: detalii,
            anvelopa:anvelopa
        });     
        
        event.preventDefault();
        alert(`S-au modificat datele anvelopei: ${anvelopa}`);
        window.location.href = "http://localhost:3000/tohotel";
    }

    const [user, loading, error] = useAuthState(auth);
    const [rol_user, setRol_user] = useState("");


    async function get_detalii_user(docID){
        const ref = doc(db, "users", docID);

        await getDoc(ref)
        .then(async (response) => {
            let res = response.data();
            setRol_user(res.rol);
            if(res.rol !== "admin" && res.rol !=="angajat"){
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
                        <h2 className="bt2">Actualizeaza detalii anvelopa</h2>


                         <TextField  
                                    style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Raft"
                                     placeholder = 'Raft'
                                    onChange = {(e) => {
                                         setraft(e.target.value);
                                     }}
                                     value = {raft}
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
                                 />

              {/* <label htmlFor="inputdata" className='scris' >Data Inceput Cazare</label>    */}
                         <div className="rsd_container">
                         <div className="inputRelative">
                         <div className="imgRelative" onClick={() => setShowcld_single(!showcld_single)}>
                            
            
                         {/* <input
              readOnly
              value={
                addZero(singleDate?.getDate()) +
                "-" +
                addZero(singleDate?.getMonth()+1) +
                "-" +
                singleDate?.getFullYear()
              }
              onChange = {(e) => {
                setdata_cazare(e.target.value);
            
            }}
              className="cldInput raspuns"
              name= "inputdata" 
            />*/}

            <TextField  
                                aria-readonly = 'true'
                                  style={{margin:'10px'}}
                                     name= "inputdata"
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Data Inceput Cazare"
                                     placeholder = 'Data Inceput Cazare'
                                     onChange = {(e) => {
                                        setdata_cazare(e.target.value);
                                    
                                    }}
                                     value = {addZero(singleDate?.getDate()) +
                                        "-" +
                                        addZero(singleDate?.getMonth()+1) +
                                        "-" +
                                        singleDate?.getFullYear()}
                                     InputProps={{
                                        endAdornment: <InputAdornment><CalendarMonthIcon /></InputAdornment>,
                                      }}
                                 /> 

          </div>
          <div className={`${!showcld_single && "d-none"} cldAbsolute`}>
            <Calendar
              defaultValue={{ date: data }}
              showDateInputField={false}
              slotInfo={false}
              onSelect={(date) => {setSingleDate(date); setdata_cazare( singleDate?.getFullYear() +"-" +addZero(singleDate?.getMonth()+1) +"-" +addZero(singleDate?.getDate()))}}
            />
          </div></div></div>

                                  <TextField  
                                  style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Numar Inmatriculare"
                                     placeholder = 'Numar Inmatriculare'
                                    onChange = {(e) => {
                                        setinmatriculare(e.target.value);
                                     }}
                                     value = {inmatriculare}
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
                                 /> 

                                    <TextField  
                                  style={{margin:'10px'}} 
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Anvelopa"
                                     placeholder = 'Anvelopa'
                                    onChange = {(e) => {
                                        setanvelopa(e.target.value);
                                     }}
                                     value = {anvelopa}
                                     InputProps={{
                                        startAdornment: <InputAdornment></InputAdornment>,
                                      }}
                                 />       
                                 

                                 <TextField  
                                  style={{margin:'10px'}} 
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Detalii"
                                     placeholder = 'Detalii'
                                    onChange = {(e) => {
                                        setdetalii(e.target.value);
                                     }}
                                     value = {detalii}
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