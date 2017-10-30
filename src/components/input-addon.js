
// outsource dependencies
import React, { Component } from 'react';


// local dependencies


// configuration

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
    
    helpBlock ( text, id ) {
        // console.log('InputAddon helpBlock => (text, id) '
        //     ,'\n this:', this
        //     ,'\n props:', this.props
        // );
        return !text ? null : (
            <div className={'input-group '+this.statusClassName }>
                <label htmlFor={ id } className="help-block offset-bottom-0"> { text } </label>
            </div>
        );
    }
    
    render () {
        
        var { input, meta, label, ...attrs } = this.props
        // define id to make label to work
        !attrs.id&&(attrs.id = input.name);
        
        // is need to show 
        this.showMessage = false;
        this.statusClassName = '';
        if ( meta.visited && meta.touched ) { // || meta.active
            // addition validation information
            this.showMessage = true;
            // add highligted className error
            if ( meta.valid ) {
                this.statusClassName = 'has-success';
            } else if ( meta.invalid ) {
                if ( meta.error ) {
                    this.statusClassName = 'has-error';
                } else if ( meta.warning ) {
                    this.statusClassName = 'has-warning';
                } else if ( meta.initial ) {
                    this.statusClassName = 'has-info';
                }
            }
        }
        
        // console.log('InputAddon render => () '+input.name
        //     // ,'\n this:', this
        //     ,'\n props:', this.props
        //     ,'\n value:', input.value
        //     ,'\n attrs:', attrs
        //     ,'\n label:', label
        //     ,'\n input:', input
        //     ,'\n meta:', meta
        //     ,'\n active:', meta.active
        //     ,'\n touched:', meta.touched
        //     ,'\n visited:', meta.visited
        //     ,'\n dirty:', meta.dirty
        //     ,'\n valid:', meta.valid
        //     ,'\n invalid:', meta.invalid
        //     ,'\n error:', meta.error
        //     ,'\n warning:', meta.warning
        //     ,'\n initial:', meta.initial
        // );
        
        return (
            <div className="form-group offset-bottom-1">
                <div className={ 'input-group '+ this.statusClassName }>
                    <label htmlFor={ attrs.id } className="input-group-addon"> { label } </label> 
                    <input { ... input } { ... attrs }/>
                </div>
                { this.showMessage&&this.helpBlock( meta.error||meta.warning||meta.initial, attrs.id ) }
            </div>
        )
    }
}

export default InputAddon;
