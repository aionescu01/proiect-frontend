import { getFirestore, collection, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
//import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { app, auth } from '../../DatabaseConnection';
import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import AddIcon from '@mui/icons-material/Add';

import "../Stil.css";
import { Button } from "@material-ui/core";
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


const db = getFirestore(app);
let param ="width=500,height=500";

function Read_Players(){

  const docRef = doc(db, "anvelope", "id");

  deleteDoc(docRef)
  .then(() => {
      //console.log("Entire Document has been deleted successfully.")
  })
  .catch(error => {
      console.log(error);
  })

  function update(x){
    localStorage.setItem('anvelopa_id',x)
  }

  async function onDelete(id) {
    var a =deleteDoc(doc(db, "anvelope", id));
    await Promise.all([a]);
    window.location.reload();
  }

  function add_anvelopa(){
    window.open('http://localhost:3000/add_anvelopa','_parent','Adauga anvelope',param);
  }

  const [jucatori, setJucatori] = useState([]);
  

  const fetchJucatori = async()=>{
    let response=collection(db, 'anvelope');

    await getDocs(response).then((querySnapshot) => {

      querySnapshot.forEach(element => {
        var date = element.data();
        date_tabel.push(date);
        SetDate(date_tabel);
        date.id = element.id;

        setJucatori(arr => [...arr , date]);  
      });
    });
  }

  useEffect(()=>{
    fetchJucatori();
  },[])
    

  const [user, loading, error] = useAuthState(auth);
  const [rol_user, setRol_user] = useState("");
    
    
  async function get_detalii_user(docID){
    const ref = doc(db, "users", docID);

    await getDoc(ref)
    .then((response) => {
        let res = response.data();
        
        setRol_user(res.rol);
    })
    .catch((e) => console.log(e));
  }

  const [date_tabel, SetDate] = useState([]);

  
  useEffect(() => {
    if (loading){
      return;
    } else if(user){
      get_detalii_user(user.uid)
    } else {
      setRol_user("guest");
    }
  }, [loading, user]);

///////////////////////////////////////
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    { id: 'brand', numeric: false, disablePadding: true, label: 'Brand' },
    { id: 'nume', numeric: false, disablePadding: false, label: 'Nume' },
    { id: 'latime', numeric: true, disablePadding: false, label: 'Latime' },
    { id: 'profil', numeric: true, disablePadding: false, label: 'Profil' },
    { id: 'diametru', numeric: false, disablePadding: false, label: 'Diametru' },
    { id: 'sarcina', numeric: false, disablePadding: false, label: 'Indice Sarcina' },
    { id: 'viteza', numeric: false, disablePadding: false, label: 'Indice Viteza' },
    { id: 'an', numeric: true, disablePadding: false, label: 'An Fabricatie' },
    { id: 'pret', numeric: true, disablePadding: false, label: 'Pret/bucata' },
    { id: 'stoc', numeric: true, disablePadding: false, label: 'Bucati in stoc' },
  ];


  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            headCell.id!=='delete'&&headCell.id!=='update'
            ?
            <TableCell
              key={headCell.id}
              align='left'
              padding='normal'
              sortDirection={orderBy === headCell.id ? order : false}
              style={{fontWeight:'700', fontSize:'medium'}}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
            :
            <TableCell></TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };


  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = jucatori.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, jucatori.length - page * rowsPerPage);

////////////////////////

  if (rol_user==='admin'||rol_user==='angajat') {
    headCells.push( { id: 'delete', numeric: false, disablePadding: false, label: '' })
    headCells.push( { id: 'update', numeric: false, disablePadding: false, label: '' })
  }

  return(
    <>
      <h1 style={{textAlign:'center'}}>Anvelope</h1>

      {
        rol_user === "admin" || rol_user === "angajat"
          ?
          <div className="center">
          <Button variant="contained" type="button" onClick={()=>add_anvelopa()} endIcon={<AddIcon />} 
          style={{ backgroundColor: '#2196f3', color: 'white', margin: '10px', align:'center', marginBottom:'20px'}}>
            Adauga cauciucuri
          </Button>
          </div>
          :
            <></>
      } 

{/* <div className={classes.root}> */}
<div className="center">
      <Paper className={classes.paper} elevation={3} style={{width:'98%', align:'center'}}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            //size={dense ? 'small' : 'medium'}
            align='left'
            size = 'small'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={jucatori.length}
            />
            <TableBody>
              {stableSort(jucatori, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      
                      <TableCell align="left">{row.brand}</TableCell>
                      <TableCell align="left">{row.nume}</TableCell>
                      <TableCell align="left">{row.latime}</TableCell>
                      <TableCell align="left">{row.profil}</TableCell>
                      <TableCell align="left">{row.diametru}</TableCell>
                      <TableCell align="left">{row.sarcina}</TableCell>
                      <TableCell align="left">{row.viteza}</TableCell>
                      <TableCell align="left">{row.an}</TableCell>
                      <TableCell align="left">{row.pret}</TableCell>
                      <TableCell align="left">{row.stoc}</TableCell>
                       {
                    rol_user === "admin" || rol_user === "angajat"
                      ?
                        <>
                          <TableCell>
                            <Button onClick={() =>onDelete(row.id)} style={{ backgroundColor: '#2196f3', color: 'white'}}>Delete</Button>
                          </TableCell> 
                          
                          <TableCell>
                              {/* <Button component={Link} to={'/update_anvelopa'} onClick={() =>update(row.id)} style={{ backgroundColor: '#2196f3', color: 'white'}}>Update</Button> */}
                              <Button component={Link} to={'/update_anvelopa'} state={{id:row.id}} style={{ backgroundColor: '#2196f3', color: 'white'}}>Update</Button>
                          </TableCell>
                        </>
                      :
                        <></>
                    }  
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  {
                    rol_user === "admin" || rol_user === "angajat"
                    ?
                    <TableCell colSpan={12} />
                    :
                    <TableCell colSpan={10} />
                  }
                  
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={jucatori.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
      
                  




      
    </>
  );
}

export default Read_Players;
