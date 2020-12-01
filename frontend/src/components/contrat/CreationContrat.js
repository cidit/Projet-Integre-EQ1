import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import CandidatureService from '../../service/CandidatureService';
import CreationContratApercue from './CreationContratApercue';
import Televerser from './Televerser';
import { Card, CardContent, CardActions, IconButton } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,

  },
  paper: {
    width: '100%'
  }
}));


function CreationContrat() {
  const [candidatureFinal, setCandidatureFinal] = useState('')
  const classes = useStyles();
  const [isCreationAuto, setIsCreationAuto] = useState(false);
  const [isTeleversement, setIsTeleversement] = useState(false)
  const { params } = useRouteMatch();

  const getcandidaturefinal = async () => {
    const response = await CandidatureService.getById(params.id);
    console.log(response)
    setCandidatureFinal(response)
  }

  useEffect(() => {
    getcandidaturefinal();
    return () => {
      setCandidatureFinal('');
    }
  }, [])

  const creationAutomatique = () => {
    setIsCreationAuto(true)
    setIsTeleversement(false)

  }
  const creationParTeleversement = () => {
    setIsTeleversement(true)
    setIsCreationAuto(false)
  }

  return (
    <div className="container-fluid">

      {/* info contrat */}


      {candidatureFinal &&
        <div className='container'>
          <h4 className='m-3 sticky-top' align='left' >Informations du contrat </h4>
          <div >
            <CreateTableauEtudiant candidatureFinal={candidatureFinal} />
          </div>
          <div  >
            <CreateTableauEntreprise candidatureFinal={candidatureFinal} />
          </div>

          <div  >
            <CreateTableauStage candidatureFinal={candidatureFinal} />
          </div>
         

        </div>
      }

      {/* creation contrat */}

      <div className='row justify-content-md-center'>
        <div className='m-3'>
          <Button variant="contained" color="primary"
            component="span"
            fullWidth onClick={creationAutomatique}
            >
            Créer un contrat automatiquement
           </Button>
        </div>

        <div className='m-3'>
          <Button variant="contained" color="primary" component="span" 
            fullWidth 
            onClick={creationParTeleversement}>
            téléverser un fichier depuis mon ordinateur
            </Button>
        </div>
      </div>

      {isCreationAuto &&
        <div className="row ">
          <Card className="col ">
            <CardActionArea>
              <CardContent className="text-center">
                <Typography className={classes.heading} >
                  <AnnouncementIcon className="mr-3 " style={{ color: "#F2DE15  " }} />
            La création automatique permet d'utiliser un modèle de contrat défini par le Cégep.
            Cela inclut automatiquement les informations de l'entreprise, de l'étudiant et du stage.
              </Typography>
              </CardContent >

            </CardActionArea >
            <CardActions className="row justify-content-md-center ">
              <CreationContratApercue />
            </CardActions>
          </Card>
        </div>
      }
      {/* televerser lui meme */}
      {isTeleversement &&

        <div className="row">
          <Card className="col">
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


}
export default CreationContrat;

const useStylesCards = makeStyles((theme) => ({
  root: {
    width: 'auto',
    //padding: theme.spacing(1),
    margin: theme.spacing(2),
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "Bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "Bold",

    //padding: theme.spacing(0),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    //border: 1,
    //margin: 'auto',
    //width: '80%',
    //marginLeft: theme.spacing(30),
  },
  pos: {
    marginBottom: 2,
  },
}));



function CreateTableauEntreprise(props) {
  const classes = useStylesCards();

  return (

    <Card className={classes.root}>
      <CardContent>
        <div className='row'>
          <Typography variant="h5" component="h2"
            className={classes.title}
          >  Entreprise   </Typography>
        </div>

        <div className='row'>

        <div className='col'>
            <Typography className={classes.subtitle}> Nom </Typography>
            <Typography className={classes.pos}> {props.candidatureFinal.stage.employeur.nom} </Typography>
          </div>

          <div className='col'>
            <Typography className={classes.subtitle}> Email: </Typography>
            <Typography className={classes.pos}> {props.candidatureFinal.stage.employeur.email} </Typography>
          </div>

          <div className='col'>
            <Typography className={classes.subtitle}> Adresse :  </Typography>
            <Typography className={classes.pos}> {props.candidatureFinal.stage.employeur.adresse} </Typography>

          </div>
          <div className='col'>
            <Typography className={classes.subtitle}>Téléphone : </Typography>
            <Typography className={classes.pos}> {props.candidatureFinal.stage.employeur.telephone} </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CreateTableauEtudiant(props) {
  const classes = useStylesCards();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className='row'>
          <Typography variant="h5" component="h2" className={classes.title}> Étudiant</Typography>
        </div>

        <div className='row'>
          <div className='col'>
            <Typography className={classes.subtitle}> Nom :  </Typography>
            <Typography className={classes.pos}>{props.candidatureFinal.etudiant.nom}   {props.candidatureFinal.etudiant.prenom}</Typography>
          </div>

          <div className='col '>
            <Typography className={classes.subtitle}>Email: </Typography>
            <Typography className={classes.pos}>{props.candidatureFinal.etudiant.email}</Typography>
          </div>

          <div className='col'>
            <Typography className={classes.subtitle}>Adresse :</Typography>
            <Typography className={classes.pos}>{props.candidatureFinal.etudiant.adresse} </Typography>
          </div>

          <div className='col'>
            <Typography className={classes.subtitle}> Téléphone : </Typography>
            <Typography className={classes.pos}>{props.candidatureFinal.etudiant.telephone}</Typography>
          </div>

          <div className='col'>
            <Typography className={classes.subtitle}>Programme : </Typography>
            <Typography className={classes.pos}>{props.candidatureFinal.etudiant.programme} </Typography>
          </div>
        </div>

      </CardContent>
    </Card >
  )
}

function CreateTableauStage(props) {
  const classes = useStylesCards();
  return (


    <Card className={classes.root}>
      <CardContent>
        <div className='row'>
          <Typography variant="h5" component="h2" className={classes.title}> Stage</Typography>
        </div>


        <div className='row'>
          <div className='col'>
            <Typography className={classes.subtitle}> Titre :</Typography>
            <Typography className={classes.pos}>{props.candidatureFinal.stage.titre}</Typography>
          </div>

          <div className='col'>
            <Typography className={classes.subtitle}> Date début : </Typography>
            <Typography className={classes.pos}>{props.candidatureFinal.stage.dateDebut} </Typography>
          </div>

          <div className='col'>
            <Typography className={classes.subtitle}> Date Fin : </Typography>
            <Typography className={classes.pos}> {props.candidatureFinal.stage.dateFin} </Typography>
          </div>

          <div className='col'>
            <Typography className={classes.subtitle}> Heures par Semaine: </Typography>
            <Typography className={classes.pos}>{props.candidatureFinal.stage.nbHeuresParSemaine} </Typography>
          </div>

          <div className='col'>
            <Typography className={classes.subtitle}> Ville :   </Typography>
            <Typography className={classes.pos}> {props.candidatureFinal.stage.ville}  </Typography>
          </div>
        </div>
      </CardContent>

    </Card >
  )
}

