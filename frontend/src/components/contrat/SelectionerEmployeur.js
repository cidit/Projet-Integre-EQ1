// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
// import EmployeurService from '../../service/EmployeurService'
// import Radio from '@material-ui/core/Radio';
// import { withStyles } from '@material-ui/core/styles';

// const useRowStyles = makeStyles({
//     root: {
//         '& > *': {
//             borderBottom: 'unset',
//         },
//     },
// });

// function createData(name, calories, fat, carbs, protein, price) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//         price,
//         history: [
//             { date: '2020-01-05', customerId: '11091700', amount: 3 },
//             { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//         ],
//     };
// }


// const headCells = [
//     { id: 'name', numeric: false, disablePadding: true, label: 'select' },
//     { id: 'calories', numeric: true, disablePadding: false, label: 'employeur' },
//     { id: 'fat', numeric: true, disablePadding: false, label: 'nom' },
//     { id: 'carbs', numeric: true, disablePadding: false, label: 'telephone' },
// ];

// const headCellsDetails = [
//     { id: 'name', numeric: false, disablePadding: true, label: 'select' },
//     { id: 'calories', numeric: true, disablePadding: false, label: 'employeur' },
//     { id: 'fat', numeric: true, disablePadding: false, label: 'nom' },
//     { id: 'carbs', numeric: true, disablePadding: false, label: 'telephone' },
// ];

// function Row(props) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);
//     const [selectedValue, setSelectedValue] = React.useState('');
//     const classes = useRowStyles();
//     const [selected, setSelected] = React.useState(false);

//     const handleClick = (event, data) => {
        
//         setSelected(!selected);
//         console.log(data);
//     };

//     return (
//         <React.Fragment>
//             <TableRow className={classes.root}>
//                 {/* <TableCell component="th" scope="row">
//                     {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.calories}</TableCell>
//                 <TableCell align="right">{row.fat}</TableCell>
//                 <TableCell align="right">{row.carbs}</TableCell>
//                 <TableCell align="right">{row.protein}</TableCell> */}



//                 <TableBody>


//                     {headCells.map((headCell) => (

//                         <TableCell
//                             key={headCell.id}
//                             align={headCell.numeric ? 'right' : 'left'}
//                             padding={headCell.disablePadding ? 'none' : 'default'}
//                             component="th" scope="row"
//                         >
//                         </TableCell>

//                     ))}

//                     {row.map((historyRow) => (
//                         <TableRow key={historyRow.id}>

//                             <TableCell><Radio
//                                 onClick={(event) => handleClick(event, row.id)}
//                                 checked={selected}
//                                 value="e"
//                                 color="default"
//                                 name="radio-button-demo"
//                                 inputProps={{ 'aria-label': 'E' }}
//                                 size="small"
//                             /></TableCell>



//                             <TableCell component="th" scope="row">
//                                 {historyRow.nom}
//                             </TableCell>
//                             <TableCell>{historyRow.telephone}</TableCell>
//                             <TableCell align="right">{historyRow.id}</TableCell>



//                             <TableCell>

//                                 <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//                                     {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                                 </IconButton>
//                             </TableCell>

//                         </TableRow>
//                     ))}
//                 </TableBody>


//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box margin={1}>
//                             <Typography variant="h6" gutterBottom component="div">Details
//               </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         {headCellsDetails.map((headCell) => (
//                                             <TableCell
//                                                 key={headCell.id}
//                                                 align={headCell.numeric ? 'right' : 'left'}
//                                                 padding={headCell.disablePadding ? 'none' : 'default'}
//                                                 component="th" scope="row"
//                                             >
//                                             </TableCell>
//                                         ))}
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {row.map((historyRow) => (
//                                         <TableRow key={historyRow.id}>
//                                             <TableCell component="th" scope="row">
//                                                 {historyRow.nom}
//                                             </TableCell>
//                                             <TableCell>{historyRow.telephone}</TableCell>
//                                             <TableCell align="right">{historyRow.id}</TableCell>

//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );
// }

// /*Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };*/

// /*const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//     createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];*/

// export default function CollapsibleTable() {
//     const [employeurs, setEmployeurs] = useState([]);
//     const [employeurChoisi, setEmployeurChoisi] = useState(null);





//     useEffect(() => {
//         let mounted = true;
//         EmployeurService.getAll().then(response => {
//             if (mounted) setEmployeurs(response)
//         });
//         //EmployeurService.getById(4).then(reponse => setEmployeurChoisi(reponse)).then((res) => console.log(res))

//         return function cleanup() {
//             mounted = false;
//             setEmployeurs(null);
//             setEmployeurChoisi(null)
//         }
//     }, []);





//     return (
//         <TableContainer component={Paper}>
//             <Table aria-label="collapsible table">
//                 <TableHead>
//                     <TableRow>

//                         <TableCell>Dessert (100g serving)</TableCell>
//                         <TableCell align="right">Calories</TableCell>
//                         <TableCell align="right">Fat&nbsp;(g)</TableCell>
//                         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                         <TableCell align="right">Protein&nbsp;(g)</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>

//                     <Row row={employeurs} />

//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }
