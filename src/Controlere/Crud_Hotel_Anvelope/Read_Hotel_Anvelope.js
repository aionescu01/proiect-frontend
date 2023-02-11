import { getFirestore, collection, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
//import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { app, auth } from '../../DatabaseConnection';
import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";

import "../Stil.css";
import { Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
import { palette } from '@mui/system';
import UpdateHotelAnvelope from "./Update_Hotel_Anvelope";



const db = getFirestore(app);
let param ="width=500,height=500";


function Read_Contracts(){

    
  function update(x,y){    
    localStorage.setItem('hotel_anv_id',x)
    localStorage.setItem('data_caz', y)
  }

  function update2(x,y){    
    return(
      <div>
      <UpdateHotelAnvelope id={x} data_caz={y}/>
      </div>
    )
  }

  async function onDelete(id) {
    var a =deleteDoc(doc(db, "hotel", id));
    await Promise.all([a]);
    window.location.reload();
  }

  function add_contract(){
    window.open('http://localhost:3000/add_hotel_anvelopa','_parent','Adauga anvelopa la hotel', param); 
  }

  const [hotel, sethotel] = useState([]);
  const [data_cazare_formatat, setdatacazareformatat] = useState([]);
  const [data_cazare, setdatacazare] = useState([]);
  const [client, setclient] = useState([]);


  const fetchContracts = async()=>{
    let response=collection(db, 'hotel');
    await getDocs(response).then((querySnapshot) => {

      querySnapshot.forEach(element => {
        var date = element.data();
        date.id = element.id;
         
        var data_caz = date.data_cazare.toDate();
        date.data_cazare =("0"+(data_caz.getMonth()+1)).slice(-2)+"-"+("0"+data_caz.getDate()).slice(-2)+"-"+data_caz.getFullYear();
        date.data_cazare_formatat = ("0"+data_caz.getDate()).slice(-2)+"-"+("0"+(data_caz.getMonth()+1)).slice(-2)+"-"+data_caz.getFullYear()

        setdatacazareformatat(("0"+data_caz.getDate()).slice(-2)+"-"+("0"+(data_caz.getMonth()+1)).slice(-2)+"-"+data_caz.getFullYear())
        setdatacazare(("0"+(data_caz.getMonth()+1)).slice(-2)+"-"+("0"+data_caz.getDate()).slice(-2)+"-"+data_caz.getFullYear())

        getDoc(doc(db, "users", date.client._key.path.segments[6])).then(docSnap =>{
             date.nume_client=docSnap.data().nume;
             date.prenume_client=docSnap.data().prenume;
             setclient(docSnap.data());
           });

        //console.log(date.anvelope._key.path.segments[6])
        sethotel(arr => [...arr , date]);  
      });
      
    });

    //await Promise.all([a]);
  }
  


  useEffect(()=>{
    fetchContracts();
  },[])
  

  /////////////////////////
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
    { id: 'nume_client', numeric: false, disablePadding: true, label: 'Nume client' },
    { id: 'raft', numeric: false, disablePadding: false, label: 'Raft' },
    { id: 'data_cazare', numeric: false, disablePadding: false, label: 'Data inceput cazare' },
    { id: 'inmatriculare', numeric: false, disablePadding: false, label: 'Numar inmatriculare' },
    { id: 'anvelopa', numeric: false, disablePadding: false, label: 'Anvelopa' },
    { id: 'detalii', numeric: false, disablePadding: false, label: 'Detalii' },
    { id: 'delete', numeric: false, disablePadding: false, label: '' },
    { id: 'update', numeric: false, disablePadding: false, label: '' },
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
            <TableCell key={headCell.id}></TableCell>
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
      const newSelecteds = hotel.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, hotel.length - page * rowsPerPage);

  
  /////////////////////////


  return(
    <>
    <div className="center">
      <Button variant="contained" type="button" onClick={()=>add_contract()} endIcon={<AddIcon />} 
      style={{ backgroundColor: '#2196f3', color: 'white', margin: '10px', align:'center', marginBottom:'20px', marginTop:'20px'}}>
        Adauga cauciucuri
      </Button>
      </div>
      <div className="center">
      {/* <div className={classes.root}> */}
      <Paper className={classes.paper} elevation={3} style={{width:'98%', align:'center'}}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            //size={dense ? 'small' : 'medium'}
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
              rowCount={hotel.length}
            />
            <TableBody>
              {stableSort(hotel, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      
                  <TableCell >{row.nume_client+" "+row.prenume_client}</TableCell>
                  <TableCell >{row.raft}</TableCell>
                  <TableCell >{row.data_cazare_formatat}</TableCell>
                  <TableCell >{row.inmatriculare}</TableCell>
                  <TableCell >{row.anvelopa}</TableCell>
                  <TableCell >{row.detalii}</TableCell>
                       
                        {
                          <>
                          <TableCell>
                            <Button onClick={() =>onDelete(row.id)} style={{ backgroundColor: '#2196f3', color: 'white'}}>Delete</Button>
                          </TableCell> 
                          
                          <TableCell>
                              <Button component={Link} to={'/update_hotel_anvelope'} state={{id:row.id, data_cazare:row.data_cazare}} style={{ backgroundColor: '#2196f3', color: 'white', textDecoration:'none'}}>Update</Button>
                          </TableCell>
                        </>
                }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={hotel.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    {/* </div> */}
    </div>
    </>
  );
}

export default Read_Contracts;
