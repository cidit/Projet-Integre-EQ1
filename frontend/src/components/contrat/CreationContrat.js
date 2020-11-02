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
              {/* <CardMedia
              
                title="Contemplative Reptile"
              /> */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard_1
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {params.id}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <CreationContratApercue />
            </CardActions>
          </Card>

        </div>


        {/* televerser lui meme */}
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
              <Televerser idCandidture={params.id} />
            </CardActions>
          </Card>
        </div>
      </div>
    </div >
  )



};
export default CreationContrat;

