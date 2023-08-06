import React, { useState } from 'react';
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
import { useAuth } from '../../context/AuthProvider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditModal from './editModal';
import TaskService from '../../services/TaskService';

const useStyles = makeStyles({
  root: {
    maxwidth: '25vh',
  },
  content: {
    padding: '16px',
  },  
});

export default function Cards({ task }) {
  const classes = useStyles();
  const { signIn, user } = useAuth();

  const { title, description, difficulty, status, userId, id  } = task;

  const [showModal, setShowModal]= useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Add state for the edit modal

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
        {/* Conditionally render the EditIcon */}
        {user && user.userId === userId && (
          <CardActions>
            <Button size="small" color="primary" onClick={handleEditClick}>
              <EditIcon />
            </Button>
            <Button size="small" color="secondary" onClick={handleDeleteTask}>
              <DeleteIcon />
            </Button>
          </CardActions>
        )}            
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
         />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Publish
          </Button>
        </DialogActions>
      </Dialog>
      {showEditModal && (
        <EditModal task={task} onClose={handleEditModalClose} onEdit={handleEditTask} />
      )}
    </Card>
  );
}