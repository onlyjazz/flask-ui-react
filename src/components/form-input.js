
// outsource dependencies
import React from 'react';
import TextField from 'material-ui/TextField';
// local dependencies

// configuration

export default function ({ input, label, meta: { touched, error }, ...custom }) {
    return (
        <TextField
            {...input}
            {...custom}
            fullWidth={true}
            hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
        />
    )
}