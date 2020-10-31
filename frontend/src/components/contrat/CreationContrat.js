import React, { useState, useEffect } from "react";
import useDocuments from './useDocuments'
import CircularUnderLoad from '../utils/IsLoading'
import Contrat from '../../model/Contrat'
import ContratService from "../../service/ContratService";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Telecharger from '../utils/telecharger'
import CandidatureService from '../../service/CandidatureService'
import ApercuContrat from './ApercuContrat'
import Televerser from './Televerser'
import ListCandidatureChoisi from './ListCandidatureChoisi'

import SauvegarderContrat from './Testdeq'
import ChoisirTemplateContrat from "./ChoisirTemplateContrat";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouteMatch } from "react-router-dom"


function CreationContrat(id) {
  const [candidatureFinal, setCandidatureFinal] = useState(null)
 

  //permet d'utiliser params.id from url
  const { params } = useRouteMatch();


  const getcandidaturefinal = async () => {
    const response = await CandidatureService.getById(params.id);
    setCandidatureFinal(response)
  }

  useEffect(() => {
    getcandidaturefinal();
    return () => {
      setCandidatureFinal(null);
    }
  }, [])



  return (
    <div className="container">
      <div className="row">
      </div>
      <div className="row aling-items-center">
        <div className="col-sm-6">
          <Card >
            <CardActionArea>
              <CardMedia
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {params.id}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
        </Button>
              <Button size="small" color="primary">
                Learn More
        </Button>
            </CardActions>
          </Card>

        </div>

        <div className="col-sm-6">

          <Card >
            <CardActionArea>
              <CardMedia
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {params.id}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Televerser idCandidture={params.id}/>
            </CardActions>
          </Card>
        </div>
      </div>
    </div >
  )



};
export default CreationContrat; 