import React, { useEffect, useState } from "react";
import { app, auth } from "./DatabaseConnection";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import ReadHotelAnvelope from './Controlere/Crud_Hotel_Anvelope/Read_Hotel_Anvelope';
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table"

const db = getFirestore(app);


export default function Hotel_Anvelope() {

  const [user, loading, error] = useAuthState(auth);
  const [rol_user, setRol_user] = useState("");

  let navigate = useNavigate();

  async function get_detalii_user(docID){
    const ref = doc(db, "users", docID);

    await getDoc(ref)
    .then(async (response) => {
        let res = response.data();
        
        setRol_user(res.rol);
        if(res.rol === "guest"){
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
    <div>
      {
        rol_user !== ""
          ?
            <div className="main">

            {
            rol_user !="client"
            ?
              <div className="pls">
                <ReadHotelAnvelope/>
              </div>
            :
            <div>
              <h2>Tarife Hotel</h2>
              <Table className="tabel" striped bordered hover>
              
              <thead>
                <tr>
                <th>Depozitare</th>
                <th>Tarif 4 buc/luna</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>Anvelope maxim R16 </td>
                <td>20 lei</td>
              </tr>
              <tr>
                <td>Anvelope R17-R18 </td>
                <td>23 lei</td>
              </tr>
              <tr>
                <td>Anvelope minim R19 </td>
                <td>30 lei</td>
              </tr>
              </tbody>
              </Table>
            </div>
              
            }
            </div>
          : 
            <></>
      }
    </div>
  );
}
