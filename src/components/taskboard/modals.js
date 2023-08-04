import { React, useState } from 'react';
import {
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core'
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

export default function Modal({ title, description, difficulty, status, 
    onTitleChange, onDescriptionChange, onDifficultyChange, onStatusChange }) {
    const classes = useStyles();

    return (
        <div>
            <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Task Title"
                    type="Title"
                    fullWidth
                    multiline
                    value={title}
                    onChange={onTitleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Task Description"
                    type="Description"
                    fullWidth
                    multiline
                    minRows="3"
                    value={description}
                    onChange={onDescriptionChange}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={difficulty}
                        onChange={onDifficultyChange}
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
                      onChange={onStatusChange}
                    >
                      <MenuItem value={"TO_DO"}>To Do</MenuItem>
                      <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                      <MenuItem value={"REVIEW"}>Review</MenuItem>
                      <MenuItem value={"DONE"}>Done</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
        </div>
    );
}