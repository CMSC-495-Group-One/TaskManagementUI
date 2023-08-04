import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    Typography,
    DialogActions,
    Dialog
} from '@material-ui/core'
import Modal from './modals';

const useStyles = makeStyles({
  root: {
    // minWidth: 230,
    // maxHeight: 150,
    width: '25vh',
    maxHeight: '16vh',    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Cards() {
  const classes = useStyles();

  const [showModal, setShowModal]= React.useState(false);
  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
      </CardActionArea>
      <Dialog open={showModal} onClose={handleClose} aria-labelledby="form-dialog-title">
          <Modal/>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Publish
            </Button>
          </DialogActions>
      </Dialog>
    </Card>
  );
}