import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardActions,
    Button,
    Typography,
    DialogActions,
    Dialog,
    DialogContent,
    DialogContentText
} from '@material-ui/core'
import Modal from './modals';
import { useAuth } from '../../context/AuthProvider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditModal from './editModal';
import TaskService from '../../services/TaskService';

const useStyles = makeStyles({
  root: {
    maxwidth: '25vh',
    margin: '10px 0',
  },
  content: {
    padding: '16px',
  },  
});

export default function Cards({ task, currId}) {
  const classes = useStyles();
  const { signIn, user } = useAuth();

  const { title, description, difficulty, status, userId, id  } = task;

  const [showModal, setShowModal]= useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Add state for the edit modal
  const [showDelete, setShowDelete]= React.useState(false); // Add state for delete modal

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleEditClick = () => {
    setShowEditModal(true); // Open the edit modal when EditIcon is clicked
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleDeleteOpen = () => {
    setShowDelete(true);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleEditTask = async (updatedTask) => {
    // Call TaskService.updateTaskById to update task on the backend here
    try {
        const taskDto = {
          userId: updatedTask.userId,
          title: updatedTask.title,
          description: updatedTask.description,
          difficulty: updatedTask.difficulty,
          status: updatedTask.status,
        };
        // Call TaskService to update the task on the backend
        const updatedTaskData = await TaskService.updateTaskById(updatedTask.id, taskDto);
        console.log('Updated Task:', updatedTaskData);

        // Refresh page after user updates task
        window.location.reload();

      } catch (error) {
        console.error('Error updating task:', error);
      }
      handleClose();
    // console.log('Updated Task:', updatedTask);
  };

  const handleDeleteTask = async () => {
    // Call TaskService.deleteTaskById to update task on the backend here
    try {
        const deleteTask = await TaskService.deleteTaskById(id);
        console.log('Deleted task:', deleteTask);

        // Refresh page after user updates task
        window.location.reload();

    } catch (error) {
        console.error('Error deleting task:', error);
    }
    console.log('Deleting Task:', task.id);
  };

  return (
    <Card className={classes.root} variant="outlined">
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
         fieldDisabled={true}
         dialogTitle={"Read Task"}
         />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {showEditModal && (
        <EditModal task={task} onClose={handleEditModalClose} onEdit={handleEditTask} />
      )}
      {/* Conditionally render the EditIcon */}
      {user && user.userId === userId && (
          <CardActions>
            <Button size="small" color="primary" onClick={handleEditClick}>
              <EditIcon />
            </Button>
            <Button size="small" color="secondary" onClick={handleDeleteOpen}>
              <DeleteIcon />
            </Button>
            <Dialog open={showDelete} onClose={handleDeleteClose}>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this task?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteTask} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        )}  
    </Card>
  );
}