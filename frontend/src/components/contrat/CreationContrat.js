import React, { useState, useEffect } from "react";
import CandidatureService from '../../service/CandidatureService'
import Televerser from './Televerser'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouteMatch } from "react-router-dom"
import CreationContratApercue from './CreationContratApercue'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AnnouncementIcon from '@material-ui/icons/Announcement';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,

  },
}));

function CreationContrat(id) {
  const [candidatureFinal, setCandidatureFinal] = useState('')
  const classes = useStyles();
  const [isCreationAuto, setIsCreationAuto] = useState(false);
  const [isTeleversement, setIsTeleversement] = useState(false)

  //permet d'utiliser params.id from url
  const { params } = useRouteMatch();


  const getcandidaturefinal = async () => {
    const response = await CandidatureService.getById(params.id);
    await setCandidatureFinal(response)


  }

  useEffect(() => {
    getcandidaturefinal();
    return () => {
      setCandidatureFinal('');
    }
  }, [])


  const creationAutomatique = () => {
    setIsCreationAuto(!isCreationAuto)

  }
  const creationParTeleversement = () => {
    setIsTeleversement(!isTeleversement)
  }

  return (
    <div className="container-fluid">

      {/* info contrat */}
      <Accordion className=" m-3 ">
        <AccordionSummary className="row justify-content-md-center p-2" style={{ background: '#ECECEC' }} >
          <ExpandMoreIcon />
          <Typography className={classes.heading} variant="h4" component="h4"> Informations pour le contrat</Typography>
        </AccordionSummary>
        <AccordionDetails className="row justify-content-md-center m-3  p-2" >
          {candidatureFinal &&
            createTableauEntreprise(candidatureFinal)
          }
          {candidatureFinal &&
            createTableauEtudiant(candidatureFinal)
          }
          {candidatureFinal &&
            createTableauStage(candidatureFinal)
          }
        </AccordionDetails>
      </Accordion>

      {/* creation contrat */}
      <Accordion className=" m-3 ">
        <AccordionSummary className="row justify-content-md-center p-2" style={{ background: '#ECECEC' }} >
          <ExpandMoreIcon />
          <Typography className={classes.heading} variant="h4" component="h4">  Créer et envoyer un contrat</Typography>
        </AccordionSummary>
        <AccordionDetails className="row justify-content-md-center m-3 p-2" >
          <div className="col-5">

            <Button variant="contained" color="primary"
              component="span"
              className="mt-4 btn-lg btn-block"
              fullWidth onClick={creationAutomatique}
              disabled={isTeleversement}>
              Créer un contrat automatiquement
           </Button>

          </div>

          <div className="col-5">
            <Button variant="contained" color="primary" component="span" className="mt-4 btn-lg btn-block"
              fullWidth disabled={isCreationAuto}
              onClick={creationParTeleversement}>
              téléverser un fichier depuis mon ordinateur
            </Button>
          </div>


        </AccordionDetails>
      </Accordion>

      {isCreationAuto &&
        <div className="row m-3">
          <Card className="col p-4 ">
            <CardActionArea>
              <CardContent className="text-center">
                <Typography className={classes.heading} >
                  <AnnouncementIcon className="mr-3 " style={{ color: "#F2DE15  " }} />
            La création automatique permet d'utiliser un modèle de contrat défini par le Cégep.
            Cela inclut automatiquement les informations de l'entreprise, de l'étudiant et du stage.
              </Typography>
              </CardContent >

            </CardActionArea >
            <CardActions className="row justify-content-md-center m-3">
              <CreationContratApercue />
            </CardActions>
          </Card>
        </div>


      }
      {/* televerser lui meme */}
      {isTeleversement &&

        <div className="row m-3">
          <Card className="col p-4 ">
            <CardActionArea>
              <CardContent className="text-center">
                <Typography className={classes.heading} >
                  <AnnouncementIcon className="mr-3 " style={{ color: "#F2DE15  " }} />
                  Seuls les fichiers au format PDF sont acceptés.
              </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="row justify-content-md-center m-3">
              <Televerser idCandidture={params.id} />
            </CardActions>
          </Card>
        </div>


      }
    </div >
  )



};
export default CreationContrat;

function createTableauEntreprise(candidatureFinal) {

  return (
    <Paper elevation={3} className="col-3 m-3">
      <Typography variant="h5" component="h5"
        className="text-center font-weight-bold p-3 border-bottom"
      >
        Entreprise
      </Typography>

      <div className="row">
        <Typography className="col-6">
          Nom de l'entreprise:
      </Typography>
        <Typography className="col-6">
          {candidatureFinal.stage.employeur.nom}
        </Typography>
      </div>

      <div className="row">
        <Typography className="col-6">
          Email:
        </Typography>
        <Typography className="col-6">
          {candidatureFinal.stage.employeur.email}
        </Typography>
      </div>

      <div className="row">
        <Typography className="col-6">
          Adresse :
        </Typography>
        <Typography className="col-6" >
          {candidatureFinal.stage.employeur.adresse}
        </Typography>
      </div>

      <div className="row">
        <Typography className="col-6">
          Téléphone :
        </Typography>
        <Typography className="col-6">
          {candidatureFinal.stage.employeur.telephone}
        </Typography>
      </div>

    </Paper>

  )
};

function createTableauEtudiant(candidatureFinal) {

  return (
    <Paper elevation={3} className="col-3 m-3">
      <Typography variant="h5" component="h5"
        className="text-center font-weight-bold p-3 border-bottom"
      >
        Étudiant
    </Typography>

      <div className="row m-2">
        <Typography className="col-4">
          Nom :
    </Typography>
        <Typography className="col-8">
          {candidatureFinal.etudiant.nom}
        </Typography>
      </div>

      <div className="row m-2">
        <Typography className="col-4">
          Prenom :
    </Typography>
        <Typography className="col-8">
          {candidatureFinal.etudiant.prenom}
        </Typography>
      </div>

      <div className="row m-2">
        <Typography className="col-4">
          Programme :
    </Typography>
        <Typography className="col-8">
          {candidatureFinal.etudiant.programme}
        </Typography>
      </div>

      <div className="row m-2">
        <Typography className="col-4">
          Email:
      </Typography>
        <Typography className="col-8">
          {candidatureFinal.etudiant.email}
        </Typography>
      </div>

      <div className="row m-2">
        <Typography className="col-4">
          Adresse :
      </Typography>
        <Typography className="col-8" >
          {candidatureFinal.etudiant.adresse}
        </Typography>
      </div>

      <div className="row m-2">
        <Typography className="col-4">
          Téléphone :
      </Typography>
        <Typography className="col-8">
          {candidatureFinal.etudiant.telephone}
        </Typography>
      </div>

    </Paper>
  )
}

function createTableauStage(candidatureFinal) {
  return (
    <Paper elevation={3} className="col-3 m-3">
      <Typography variant="h5" component="h5"
        className="text-center font-weight-bold p-3 border-bottom "
      >
        Stage
    </Typography>

      <div className="row m-2">
        <Typography className="col-4">
          Titre :
    </Typography>
        <Typography className="col-8">
          {candidatureFinal.stage.titre}
        </Typography>
      </div>

      <div className="row m-2">
        <Typography className="col-4">
          Date début :
    </Typography>
        <Typography className="col-8">
          {candidatureFinal.stage.dateDebut}
        </Typography>
      </div>

      <div className="row m-2">
        <Typography className="col-4">
          Date Fin :
    </Typography>
        <Typography className="col-8">
          {candidatureFinal.stage.dateFin}
        </Typography>
      </div>
      <div className="row m-2">
        <Typography className="col-4">
          Programme :
    </Typography>
        <Typography className="col-8">
          {candidatureFinal.stage.programme}
        </Typography>
      </div>

      <div className="row m-1">
        <Typography className="col-4">
          Heures par Semaine:
      </Typography>
        <Typography className="col-8">
          {candidatureFinal.stage.nbHeuresParSemaine}
        </Typography>
      </div>

      <div className="row m-1">
        <Typography className="col-4">
          Ville :
      </Typography>
        <Typography className="col-8" >
          {candidatureFinal.stage.ville}
        </Typography>
      </div>

    </Paper>
  )
}

