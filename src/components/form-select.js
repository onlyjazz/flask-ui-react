
// outsource dependencies
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
// local dependencies

// configuration

export default function ({ input, label, meta: { touched, error }, children, ...custom }) {
    return (
        <SelectField
            {...input}
            {...custom}
            fullWidth={true}
            children={children}
            floatingLabelText={label}
            errorText={touched && error}
            onChange={(event, index, value) => input.onChange(value)}
                />
    )
}