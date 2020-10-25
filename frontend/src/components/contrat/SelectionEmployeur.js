// import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
// import Employeur from '../../model/Employeur'
// import EmployeurService from '../../service/EmployeurService'
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import UseCreerContrat from '../contrat2.js/useCreerContrat';
// import HorizontalNonLinearStepper from '../contrat2.js/CreationContrat'
// import useCreationContrat from '../contrat2.js/useCreerContrat'
// import Radio from '@material-ui/core/Radio';
// import { withStyles } from '@material-ui/core/styles';




// const columns = [
//     { field: 'nom', headerName: 'Nom', width: 70 },
//     { field: 'email', headerName: 'Courriel', width: 130 },
//     { field: 'telephone', headerName: 'téléphone', width: 130 },
//     { field: 'adresse', headerName: 'Adresse', type: 'number', width: 90, },
// ];


// const useStyles = makeStyles({
//     table: {
//         minWidth: 100,
//     },
// });

// const headCells = [
//     { id: 'name', numeric: false, disablePadding: true, label: 'select' },
//     { id: 'calories', numeric: true, disablePadding: false, label: 'employeur' },
//     { id: 'fat', numeric: true, disablePadding: false, label: 'nom' },
//     { id: 'carbs', numeric: true, disablePadding: false, label: 'telephone' },
// ];




// export default function SelectionEmployeur() {
//     const [employeurs, setEmployeurs] = useState([]);
//     const [employeurChoisi, setEmployeurChoisi] = useState(null);
//     const classes = useStyles();
//     const [selected, setSelected] = React.useState(false);

//     const isSelected = (name) => selected.indexOf(name) !== -1;

//     //const { employeur, error, isLoading } = useCreationContrat(employeurChoisi);

//     console.log(employeur);


//     useEffect(() => {
//         let mounted = true;
//         EmployeurService.getAll().then(response => {
//             if (mounted) setEmployeurs(response)
//         });
//         EmployeurService.getById(4).then(reponse => setEmployeurChoisi(reponse)).then((res) => console.log(res))

//         return function cleanup() {
//             mounted = false;
//             setEmployeurs(null);
//             setEmployeurChoisi(null)
//         }
//     }, []);



//     const handleClick = (event, data) => {
//         setSelected(!selected);
//         console.log(data);
//     };

//     return (

//         <TableContainer component={Paper}>
//             <Table className={classes.table} aria-label="simple table">
//                 <TableHead>
//                     <TableRow                      hover
//                         role="checkbox"

//                         tabIndex={-1}

//                     >
//                         {headCells.map((headCell) => (
//                             <TableCell
//                                 key={headCell.id}
//                                 align={headCell.numeric ? 'right' : 'left'}
//                                 padding={headCell.disablePadding ? 'none' : 'default'}
                             
//                             >
//                                 <TableSortLabel
                                   
//                                 >
//                                     {headCell.label}
                                 
//                                 </TableSortLabel>
//                             </TableCell>
//                         ))}











//                     </TableRow>
//                 </TableHead>
//                 <TableBody>

//                     {employeurs.map(row => (

//                         <TableRow key={row.id}>
//                             <Checkbox
//                                 onClick={(event) => handleClick(event, row.id)}
//                                 checked={selected}

//                             />
//                             <TableCell component="th" scope="row">
//                                 {row.nom}
//                             </TableCell>
//                             <TableCell align="center">{row.nom}</TableCell>
//                             <TableCell align="center">{row.telephone}</TableCell>
//                         </TableRow>


//                     ))}


//                 </TableBody>
//             </Table>

//         </TableContainer>

//     )
// }
