
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

// local dependencies
import { GraphQl, is } from '../services';


class MeasureEdit extends Component {
    
    constructor ( props ) {
        super( props );
        
        this.state = {
            measure: {
                
            },
            errorMessage: '',
            expectAnswer: false,
        };
    }
    
    
    Error () {
        return !this.state.errorMessage ? ('') : (
            <div className="row">
                <div className="col-xs-12">{/* col-xs-10 col-xs-offset-1 */}
                    <p className="alert alert-danger" onClick={ () => this.setState({errorMessage: ''}) }>
                        <strong> Error: </strong>
                        { this.state.errorMessage }
                    </p>
                </div>
            </div>
        );
    }
    
    getMeasure ( id ) {
        GraphQl
            .getMeasure( id )
            .then(success => {
                this.setState({
                    measure: success,
                    expectAnswer: false,
                });
            })
            .catch(error => {
                this.setState({
                    expectAnswer: false,
                    errorMessage: JSON.stringify(error.data),
                });
            });
    }
    
    componentWillMount () {
        console.log('MEASURE EDIT componentWillMount => ()'
            ,'\n state:', this.state
            ,'\n props:', this.props
            ,'\n match:', this.props.match
        );
        var measureId = this.props.match.params.id
        if ( is.number( measureId ) ) {
            this.getMeasure( measureId );
        }
    }
    
    render() {
        
        // console.log('MEASURE EDIT render => ()'
        //     ,'\n state:', this.state
        //     ,'\n props:', this.props
        //     ,'\n match:', this.props.match
        // );
        
        return (
            <div className="row">
                <div className="panel panel-default no-radius">
                    <div className="panel-heading">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        <strong> MeasureEdit </strong>
                    </div>
                </div>
                <div className="col-xs-12">
                    { this.Error() }
                    <div className="row">
                        <div className="col-xs-12">
                            Private content for editing Measure.
                            { JSON.stringify(this.props.match) }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            { JSON.stringify(this.state.measure) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('MeasureEdit mapSteteToProps', state);
    return ({})
}, null )(MeasureEdit);
