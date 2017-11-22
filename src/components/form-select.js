
// outsource dependencies
import React from 'react';
import SelectField from 'material-ui/SelectField';
// local dependencies
import { is } from '../services';
// configuration

export default function ({ input, label, meta: { touched, error }, onChange, children, ...custom }) {
    return (
        <SelectField
            {...input}
            {...custom}
            fullWidth={true}
            children={children}
            floatingLabelText={label}
            errorText={touched && error}
            onClick={ e => input.onBlur(e) }
            onChange={(event, index, value) => {
                if ( is.function(onChange) ) {
                    value = onChange(event, index, value);
                }
                input.onChange(value);
            }}/>
    )
}