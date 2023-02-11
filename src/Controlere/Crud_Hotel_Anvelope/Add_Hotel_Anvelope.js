import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, Timestamp } from "firebase/firestore";
import { app, auth } from '../../DatabaseConnection';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, TextField, Button, FormControl, Input, FormHelperText, InputLabel, FormLabel, InputAdornment } from '@mui/material';
import Calendar from "react-select-date";
import cldIcon from "../../cldIcon.jpeg";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


import "../Stil.css";
import { async } from '@firebase/util';

const db = getFirestore(app);

export function addZero(num) {
    return num > 9 ? num : "0" + num;
  }
  const currentDate =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();

export default function Add_Hotel_Anvelope() {
    const [email, setemail] = useState('');
    const [clientref, setidclient] = useState();
    const [raft, setraft] = useState();
    const [data_inceput, setdata_inceput] = useState('');
    const [timestamp, settimestamp] = useState('');
    const [inmatriculare, setinmatriculare] = useState('');
    const [anvelopa, setanvelopa] = useState();
    const [detalii, setdetalii] = useState();


    const [showcld_single, setShowcld_single] = useState(true);
    const [singleDate, setSingleDate] = useState(new Date());


    async function add_anvelopa(event) {

        event.preventDefault();

        let response=collection(db, 'users');
    var a = getDocs(response).then((querySnapshot) => {

      querySnapshot.forEach(element => {
        var date = element.data();
        if(date.email===email)
        {
            var client = doc(db,'users/'+element.id);
            var myTimestamp = Timestamp.fromDate(new Date(data_inceput));
            console.log(data_inceput)
            console.log(new Date(data_inceput))
            console.log(myTimestamp)
            setidclient(client);
            settimestamp(myTimestamp);
            
            addDoc(collection(db, "hotel"), {
                    client: doc(db,'users/'+element.id),
                    raft: raft,
                    data_cazare: Timestamp.fromDate(new Date(data_inceput)),
                    inmatriculare: inmatriculare,
                    anvelopa: anvelopa,
                    detalii: detalii,
                    
                }).then(alert(`Ai adaugat anvelope pentru: ${email}`));
                  
                //window.location.href = "http://localhost:3000/tohotel";

        }  
    });
});
            await Promise.all([a]);
            window.location.href = "http://localhost:3000/tohotel";
}



    

    const [user, loading, error] = useAuthState(auth);
    const [rol_user, setRol_user] = useState("");

    let navigate = useNavigate();

    async function get_detalii_user(docID){
        const ref = doc(db, "users", docID);
        setdata_inceput(Date.now())
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
                        <h2 className="bt2">Adauga anvelope la hotel</h2>

                        <TextField  
                                    style={{margin:'10px'}}
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Email Client"
                                     placeholder = 'Email Client'
                                    onChange = {(e) => {
                                         setemail(e.target.value);
                                     }}
                                     value = {email}
                                     
                                 />


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
                                     
                                 />

                         <div className="rsd_container">
                         <div className="inputRelative">
                         <div className="imgRelative" onClick={() => setShowcld_single(!showcld_single)}>
                            
            


            <TextField  
                                aria-readonly = 'true'
                                  style={{margin:'10px'}}
                                     name= "inputdata"
                                     className="raspuns"
                                     type='text'
                                     variant = "outlined"
                                     label = "Data Inceput Cazare"
                                     placeholder = 'Data Inceput Cazare'
                                    //  onChange = {(e) => {
                                    //     setdata_inceput(e.target.value);
                                    
                                    // }}
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
              //defaultValue={{ date:  }}
              showDateInputField={false}
              slotInfo={false}
              onSelect={(date) => {setSingleDate(date); setdata_inceput( singleDate?.getFullYear() +"-" +addZero(singleDate?.getMonth()+1) +"-" +addZero(singleDate?.getDate()))}}
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
                                     
                                 />        

                                
                        <Button onClick={(event) => {
                    add_anvelopa(event);
                    }} type = 'submit' style={{ backgroundColor: '#2196f3', color: 'white', margin:'10px'}}>Submit</Button>
                    </FormControl>
                :
                    <></>
            }
        </div>
    )
}