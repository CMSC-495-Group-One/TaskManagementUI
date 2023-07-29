import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

function InputField({ name, control, defaultValue, rules, label, autoComplete, type, inputProps,
    error, helperText }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}

      render={({ field }) => (
        <TextField
          {...field}
          autoComplete={autoComplete}
          variant="outlined"
          required
          fullWidth
          label={label}
          error={error}
          helperText={helperText}
          type={type}
          InputProps={inputProps}
        />
      )}
    />
  );
}

export default InputField;
