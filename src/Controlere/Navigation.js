import React, { useEffect, useState } from "react";
import { app, auth } from "../DatabaseConnection";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const db = getFirestore(app);


function Navigation() {
  const [user, loading, error] = useAuthState(auth);
  const [rol_user, setRol_user] = useState("");
  const [det_user, setDet_user] = useState({});

  async function get_detalii_user(docID){
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
    if (loading){
        return;
    } else if(user){
        get_detalii_user(user.uid)
    } else {
        setRol_user("guest");
    }
  }, [loading, user]);

  return (
    <>

      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            {
                  rol_user === "guest"
                    ?
                        <Nav.Link className="nav-link" href="/toauth">
                          Auth
                        </Nav.Link>
                    :
                        <Nav.Link className="nav-link" href="/toauth">
                          Profil
                        </Nav.Link>
                }
            <Nav.Link className="nav-link" href="/toanvelope">
                    Anvelope
            </Nav.Link>
            {
                  rol_user === "guest" 
                    ?
                      <></>
                    : 
                        <Nav.Link className="nav-link" href="/tohotel">
                          Hotel Anvelope
                        </Nav.Link>
                }
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default Navigation;