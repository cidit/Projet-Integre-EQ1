import React from 'react';
import { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ContratService from '../../service/ContratService';
import { useRouteMatch } from "react-router-dom"
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Iframe from 'react-iframe'
import CircularProgress from '@material-ui/core/CircularProgress';





const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const iframeStyle = {
  width: '80%',
  height: '80%',
  border: '0',
  position: 'relative',
  margin: 'auto'

}



export default function CreationContratApercue() {
  const [open, setOpen] = useState(false);
  const [imageContrat, setImageContrat] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const { params } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false)
  const [candidatureHasContrat, setCandidatureHasContrat] = useState(false)
  const classes = useStyles();


  const getApercueContrat = async () => {
    setIsLoading(true)
    const response = await ContratService.telechargerApercueContrat(params.id)
    const url = window.URL.createObjectURL(new Blob([response.data]));
    await setImageContrat(url)
    setIsLoading(false)
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageContrat)
    }
  }, [])

  const handleClickOpen = () => {
    getApercueContrat();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const saveContrat = async (e) => {
   /* var response = await ContratService.createContrat(params.id, file);
    setMessageResponse(response.data);
    setIsButtonDisable(true)
    console.log(response.data.status)
    setIsSubmit(true)
*/

}

  return (

    <div>
        <div className="col">
          <Button variant="contained" color="primary" component="button" className="mt-4 btn btn-primary btn-lg btn-block" onClick={handleClickOpen}>
            Voir apercue
           </Button>
          {isLoading ?
            <CircularProgress />
            : null
          }
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Apercue de contrat
            </DialogTitle>

            <Dialog fullScreen open={open} >

              <Toolbar style={{ background: '#ECECEC' }}>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Fermer
               </Typography>
              </Toolbar>

              {/* affichage du contrat */}
              <Iframe src={imageContrat} width={'100%'} height={'90%'} style={iframeStyle}></Iframe>

            </Dialog>
            <DialogActions>

            </DialogActions>
          </Dialog>
        </div>
        <div className="col">
          <Button variant="contained" color="primary" component="span" className="mt-4 btn-lg btn-block" fullWidth
           onClick={saveContrat}
          disabled={isSubmit}
          >
            Confirmer et envoyer au employeur
        </Button>
        </div>
    </div>
  );
}
