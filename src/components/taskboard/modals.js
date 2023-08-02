import {React, useState} from 'react';
// import {useForm} from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import InputField from '../InputField';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Modal({ title, description, difficulty, onTitleChange,
     onDescriptionChange, onDifficultyChange }) {
  const classes = useStyles();
//   const {control} = useForm();
//   const [difficulty, setDifficulty] = useState('');

//   const handleChange = (event) => {
//     setDifficulty(event.target.value);
//   };

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
        //   name="title"
          label="Task Title"
          type="Title"
          fullWidth
          value={title}
          onChange={onTitleChange}
      />
        {/* <InputField
            name="title"
            control={control}
            defaultValue=""
            label="Task Title"
        /> */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
        //   name="description"
          label="Task Description"
          type="Description"
          fullWidth
          value={description}
          onChange={onDescriptionChange}
        />
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   name="difficulty"
          value={difficulty}
        //   onChange={handleChange}
          onChange={onDifficultyChange}
        >
          <MenuItem value={"Easy"}>Easy</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"Hard"}>Hard</MenuItem>
        </Select>
      </FormControl>
    </DialogContent>
  </div>
  );
}