
// outsource dependencies
import React from 'react';
import TextField from 'material-ui/TextField';
// local dependencies
import { is } from '../services';
// configuration

export default function ({ input, label, meta: { touched, error }, onChange, ...custom }) {
    return (
        <TextField
            {...input}
            {...custom}
            fullWidth={true}
            hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            onChange={(event, value) => {
                var v;
                if ( is.function(onChange) ) {
                    v = onChange(event, value);
                }
                input.onChange(v||value);
            }}
        />
    )
}