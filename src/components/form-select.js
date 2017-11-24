
// outsource dependencies
import React from 'react';
import SelectField from 'material-ui/SelectField';
// local dependencies
import { is } from '../services';
// configuration
// "preChange" - redux-form remove method if it name "onChange"
export default function ({ input, label, meta: { touched, error }, preChange, children, ...custom }) {
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
                var v;
                if ( is.function(preChange) ) {
                    v = preChange(event, index, value);
                }
                input.onChange(v||value);
            }}/>
    )
}