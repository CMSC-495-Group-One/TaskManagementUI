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
    maxwidth: '25vh',
  },
  content: {
    padding: '16px',
  },  
});

export default function Cards({ task, currId}) {
  const classes = useStyles();

  const { title, description, difficulty, status, userId } = task;
  
  let bool = (userId != currId) ? true : false;

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
        <div className={classes.content}>
          <Typography color="textSecondary" variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography color="textSecondary" variant="body1" gutterBottom>
            {description}
          </Typography>
          <Typography variant="body2" component="p">
            {difficulty}
          </Typography>
        </div>          
      </CardActionArea>
      <Dialog open={showModal} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Modal
         title={title}
         description={description}
         difficulty={difficulty}
         status={status}
         onTitleChange={(e) => setTitle(e.target.value)}
         onDescriptionChange={(e) => setDescription(e.target.value)}
         onDifficultyChange={(e) => setDifficulty(e.target.value)}
         onStatusChange={(e) => setStatus(e.target.value)}
         readOnlyBool={bool}
         />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}