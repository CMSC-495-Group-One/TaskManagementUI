import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function EditModal({ task, onClose, onEdit }) {
  const classes = useStyles();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [difficulty, setDifficulty] = useState(task.difficulty);
  const [status, setStatus] = useState(task.status);

  const handleEdit = () => {
    // Create a task object with the updated values
    const updatedTask = {
      ...task,
      title,
      description,
      difficulty,
      status,
    };
    onEdit(updatedTask);
    onClose();
  };

  return (
    <Dialog open onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          fullWidth
          multiline
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Task Description"
          fullWidth
          multiline
          minRows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            >
                <MenuItem value={"EASY"}>Easy</MenuItem>
                <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                <MenuItem value={"HARD"}>Hard</MenuItem>
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <MenuItem value={"TO_DO"}>To Do</MenuItem>
                <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                <MenuItem value={"REVIEW"}>Review</MenuItem>
                <MenuItem value={"DONE"}>Done</MenuItem>
            </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEdit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
