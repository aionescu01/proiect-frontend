import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { Button, Table } from 'semantic-ui-react'
import { app } from './DatabaseConnection';
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { Weather } from "./Weather";

import "./Controlere/Stil.css";

const db = getFirestore(app);

const months = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12",
};


const Match = () => {
    const {id} = useParams();
    const [match, SetMatch] = useState({});
    const [stadion, SetStadion] = useState({});
    const [jucatori, setJucatori] = useState([]);

    const fetch = async() => {
        const docRef = doc(db, "meci", id);

        await getDoc(docRef)
        .then(async (response) => {
            let res = response.data();
            
            SetMatch(res);

            const id_stadion = res.id_stadion._key.path.segments[6];
            const stadionDocRef = doc(db, "stadion", id_stadion);

            let aux = res.data.toString().split(" ");

            aux[1] = aux[1].split(",")[0];
            if (aux[1].length === 1){
                aux[1] = "0" + aux[1];
            }
            aux[0] = months[aux[0]];

            let ora = res.ora.split(":");
            ora[1] = "00";
            switch(ora[0]){
                case "01":
                    ora[0] = "00";
                    break;
                case "02":
                case "04":
                    ora[0] = "03";
                    break;
                case "05":
                case "07":
                    ora[0] = "06";
                    break;
                case "08" :
                case "10":
                    ora[0] = "09";
                    break;
                case "11":
                case "13":
                    ora[0] = "12";
                    break;
                case "14":
                case "16":
                    ora[0] = "15";
                    break;
                case "17":
                case "19":
                    ora[0] = "18";
                    break;
                case "20":
                case "22":
                case "23":
                    ora[0] = "21";
                    break;
                default:
                    break;
            }

            console.log(ora);

            localStorage.setItem("dataString", aux[2] + "-" + aux[0] + "-" + aux[1] + " " + ora[0] + ":" + ora[1] + ":00");
            localStorage.setItem("data", [aux[2], aux[0], aux[1], ora[0], ora[1]]);
            
            await getDoc(stadionDocRef)
            .then(async (response2) => {
                let res2 = response2.data();

                // daca meciul e in deplasare, inverseaza scorul
                if (res2.denumire !== "Arena Nationala"){
                    let echipa_gazda = res.adversar;
                    res["echipa_gazda"] = echipa_gazda;
                    res["echipa_oaspete"] = "FCSB";

                    SetMatch(res);
                } else {
                    let echipa_oaspete = res.adversar;
                    res["echipa_gazda"] = "FCSB";
                    res["echipa_oaspete"] = echipa_oaspete;

                    SetMatch(res);
                }

                let oras = res2.adresa.split(" ")[res2.adresa.split(" ").length - 1];
                res2["oras"] = oras;
                SetStadion(res2);

                let ls_juc = [];

                await res.lista_jucatori.forEach(async(element) => {
                    let jucator = {};
                    jucator["id"] = element._key.path.segments[6];
                    const jucatorDocRef = doc(db, "jucator", jucator?.id);
            
                    await getDoc(jucatorDocRef)
                    .then(async(response3) => {
                        let res3 = response3.data();
                        jucator["date"] = res3;
                    })
                    .catch((e) => console.log(e));

                    ls_juc.push(jucator);

                    if(ls_juc.length === 11){
                        setJucatori(ls_juc);
                    }
                });
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    };

    useEffect(() => {
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SetMatch, SetStadion, setJucatori]);

    return (
        <div className="match">
            <div className="title">
                <div>
                    <h1>{match?.competitie}</h1>

                    <h2>{match?.data} {match?.ora}</h2>

                    <h2>{match?.echipa_gazda} {match?.scor} {match?.echipa_oaspete}</h2>
                </div>

                <div>
                    { stadion ? <Weather oras={stadion?.oras}/> : <></>}
                </div>
            </div>
            
            <h3>Echipa de start: </h3>

            {
                jucatori.length !== 0
                    ?
                        <div>
                            <Table singleLine className='tabel'>
                                <Table.Body>
                                    {jucatori.map((data) =>  {
                                        return (
                                            <Table.Row key = {data.id}>
                                                <Table.Cell >{data.id}</Table.Cell>
                                                <Table.Cell >{data.date?.prenume} {data.date?.nume}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </div>
                    :
                        <div>
                            <h3> Indisponibila</h3>
                        </div>
            }

            <br />

            <footer>
                {
                    match?.arbitru !== "" 
                        ?
                            <h4>Arbitru: {match?.arbitru}</h4>
                        :
                            <></>
                }

                {
                    stadion?.denumire !== ""
                        ?
                            <h4>Stadion: {stadion?.denumire}({stadion?.oras})</h4>
                        :
                            <></>
                }

                <Link to="/tomeci">
                    <Button>Go back</Button>
                </Link>
            </footer>

        </div>
    );
}

export default Match;