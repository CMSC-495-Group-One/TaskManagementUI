import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Modal from './modals';

const useStyles = makeStyles({
  root: {
    maxwidth: '25vh',
    maxHeight: '16vh',
    display: 'flex',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Cards({ title, description, difficulty, status, 
  onTitleChange, onDescriptionChange, onDifficultyChange, onStatusChange }) {
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
            <Typography className={classes.title} color="textSecondary" variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary" variant="body1" gutterBottom>
              Task Description: {description}
            </Typography>
            <Typography variant="body2" component="p">
              Difficulty: {difficulty}
            </Typography>
          </CardContent>
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
         />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}