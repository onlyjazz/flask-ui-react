
// outsource dependencies
import React, { Component } from 'react';


// local dependencies


// configuration

var classes = {
    empty: '',
    info: 'has-info',
    error: 'has-error',
    warning: 'has-warning',
    success: 'has-success',
};

/**
 * @description helper to determine class name based on meta content of input
 * @param { Object } meta - information about input state 
 * @returns { String } className
 * @function defineStatusClassName
 * @private
 */
function defineStatusClassName ( meta ) {
    // console.log('defineStatusClassName => ( meta ) '
    //     ,'\n active:', meta.active
    //     ,'\n touched:', meta.touched
    //     ,'\n visited:', meta.visited
    //     ,'\n dirty:', meta.dirty
    //     ,'\n error:', meta.error
    //     ,'\n warning:', meta.warning
    //     ,'\n initial:', meta.initial
    //     ,'\n invalid:', meta.invalid
    //     ,'\n valid:', meta.valid
    //     ,'\n meta:', meta
    // );
    // 
    if ( !meta.visited || meta.active ) return classes.empty;
    //
    if ( meta.invalid ) return classes.error;
    //
    if ( meta.valid ) return classes.success;
    
    // undeifined case
    return classes.empty;
}

/**
 * @description input component "addone" with helpers to display validation results
 * @example
     <Field
         required
         type="mail"
         name="email"
         placeholder="Email"
         component={ InputAddon }
         className="form-control"
         label={ <span> @ </span> }
             />
 * @constructor InputAddon
 * @public
 */
class InputAddon extends Component {
    
    helpBlock ( text ) {
        return !text ? null : (
            <div className={'input-group '+this.statusClassName }>
                <label htmlFor={ this.props.id } className="help-block"> { text } </label>
            </div>
        );
    }
    
    render () {
        
        var { input, meta, label, ... attrs } = this.props
        // define id to make label to work
        !attrs.id&&(attrs.id = input.name );
        // define status of field and set status className
        this.statusClassName = defineStatusClassName(meta);
        
        // console.log('InputAddon render => () '+input.name
        //     ,'\n props:', this.props
        //     ,'\n value:', input.value
        //     ,'\n attrs:', attrs
        //     ,'\n label:', label
        //     ,'\n input:', input
        //     ,'\n meta:', meta
        //     ,'\n this:', this
        // );
        
        return (
            <div className="form-group">
                <div className={ 'input-group '+ this.statusClassName }>
                    <label htmlFor={ attrs.id } className="input-group-addon"> { label } </label> 
                    <input { ... input } { ... attrs }/>
                </div>
                { this.helpBlock( meta.error||meta.warning||meta.initial ) }
            </div>
        )
    }
}

export default InputAddon;
