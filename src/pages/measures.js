
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

// local dependencies
import { GraphQl } from '../services';
// import { pageUpdate, pageUpdateError, pageUpdateSuccess } from '../actions';

// configuration
var cellOverideStyle = {
    whiteSpace: 'normal',
    textOverflow: 'unset',
    padding: '24px 12px',
};
var tooltipOverideStyle = {
    top: '-30%',
    left: '0px'
};

var sortIcon = {
    'sort': 'glyphicon glyphicon-sort',
    'sort_asc': 'glyphicon glyphicon-sort-by-attributes',   
    'sort_desc': 'glyphicon glyphicon-sort-by-attributes-alt',
    
    'alphabet': 'glyphicon glyphicon-sort',
    'alphabet_asc': 'glyphicon glyphicon-sort-by-alphabet',
    'alphabet_desc': 'glyphicon glyphicon-sort-by-alphabet-alt',
    
    'order': 'glyphicon glyphicon-sort',
    'order_asc': 'glyphicon glyphicon-sort-by-order',
    'order_desc': 'glyphicon glyphicon-sort-by-order-alt',
};

function Preloader ( props ) {
    return props.show ?(<strong>
        <i className="fa fa-spinner fa-spin fa-fw"></i>
        <span className="sr-only">Loading...</span>
    </strong>) : ('');
}

function Sort ( props ) {
    var type = sortIcon[props.type] ? props.type : 'sort';
    var className;
    switch ( props.status ) {
        case true: className = sortIcon[type+'_asc'];
        break;case false: className = sortIcon[type+'_desc'];
        break;default: className = sortIcon[type];
    }
    
    return (
        <strong className="">
            { props.children }
            <span className={className} aria-hidden="true"></span>
        </strong>
    );
}


class Measures extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            expectAnswer: true,
            errorMessage: null,
            openActionMenu: false,
            tableData: [],
            studies: [],
            currentStudy: {id: 0},
            
            selected: [],
            allRowsSelected: false,
            
            
            
            sort: 'non'
        };
        
        this.toggle = ( event, toggled ) => {
            this.setState({ [event.target.name]: toggled });
        }
    }
  
    Filter () {
        var { studies, currentStudy } = this.state;
        return (
            <Paper zDepth={2} className="clearfix">
                <h2 className="col-xs-12 top-indent-2 offset-bottom-4" style={{fontSize: '24px', fontWeight: 'normal'}}> Filters </h2>
                <div className="col-xs-12 offset-bottom-4">
                    <SelectField
                        fullWidth={true}
                        value={currentStudy.id}
                        floatingLabelText="Studies"
                        onChange={(event, index, value)=> this.setState({currentStudy: _.find(studies, {id: value})||{id: 0}}) }
                            >
                        <MenuItem value={0} style={{ whiteSpace: 'normal', textOverflow: 'unset'}} primaryText="All" />
                        {studies.map( (study, key) => ( <MenuItem key={key} value={study.id} primaryText={study.officialTitle} /> ))}
                    </SelectField>
                </div>
                <div className="col-xs-12 offset-bottom-4" onClick={( event ) => this.updateTableData(this.props.auth.user.customer_id, currentStudy.id ) }>
                    <FlatButton label="APPLY" primary={true} fullWidth={true}/>
                </div>
            </Paper>
        )
    }
  
    Table () {
        var btn = (
          <RaisedButton
              labelColor="#03A9F4"
              label="Actions"
              labelPosition="before"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#03A9F4" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>}
                  />
        );
        return (
            <Paper zDepth={2} style={{overflow: 'visible', tableStyle: {overflow: 'visible'}}}>                
                <Table
                    style={{overflow: 'visible', tableLayout: 'auto'}} /* Fucking material essols */
                    height="auto"
                    selectable={true}
                    fixedHeader={false}
                    multiSelectable={true}
                    deselectOnClickaway={false}
                    onRowSelection={val => this.onRowSelection(val) }
                        >
                    <TableHeader displaySelectAll={true} adjustForCheckbox={true}>
                        <TableRow style={{borderBottom : 'none'}} selectable={false}>
                            <TableHeaderColumn colSpan="5" style={{padding: '24px 12px'}}>
                                <h2 style={{color: '#333', fontSize: '24px', marginLeft: '-70px', fontWeight: 'normal'}}> All mesasures </h2>
                            </TableHeaderColumn>
                            <TableHeaderColumn colSpan="2" style={{textAlign: 'right'}}>
                                <IconMenu iconButtonElement={ btn } open={this.state.openActionMenu} onRequestChange={value => {
                                    this.setState({openActionMenu: value});
                                }}>
                                    <MenuItem
                                        value="1"
                                        disabled={!this.state.selected[0]}
                                        primaryText={"Edit one "+(this.state.selected[0] ? this.state.selected[0].id : '"No selection"')}
                                        containerElement={<Link to={'app/measures'/*MESURE_EDIT.LINK({id: this.state.selected[0].id})*/} />} />
                                    <MenuItem value="2" primaryText="Delete" onClick={()=> console.log('Delete', this.state.selected) } />
                                </IconMenu>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow selectable={false} onCellClick={(event) => {
                            console.log(event.target)
                            this.setState({sort: !this.state.sort});
                        }}>
                            <TableHeaderColumn colSpan="3"> Study </TableHeaderColumn>
                            <TableHeaderColumn> Measure </TableHeaderColumn>
                            <TableHeaderColumn> Event </TableHeaderColumn>
                            <TableHeaderColumn> CRF </TableHeaderColumn>
                            <TableHeaderColumn> Item </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={true} deselectOnClickaway={false}>
                        {this.state.tableData.map( (row, index) => (
                            <TableRow key={index} selected={ this.state.selected.indexOf(row) > -1 }>
                                <TableRowColumn colSpan="3" style={cellOverideStyle}> {row.officialTitle} </TableRowColumn>
                                <TableRowColumn style={cellOverideStyle}> {row.name} </TableRowColumn>
                                <TableRowColumn style={cellOverideStyle}> {row.event} </TableRowColumn>
                                <TableRowColumn style={cellOverideStyle}> {row.crf} </TableRowColumn>
                                <TableRowColumn style={cellOverideStyle}> {row.item} </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
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
    
    onRowSelection ( selection ) {
        switch ( selection ) {
            case 'all': this.setState({selected: this.state.tableData.slice(0)});
            break;case 'none': this.setState({selected: []});
            break;default:
                for ( var key = 0, res = []; key < selection.length; key ++ ) {
                    res.push(this.state.tableData[selection[key]]);
                }
                this.setState({selected: res});
        }
    }
    
    updateTableData ( customerId, studyId ) {
        this.setState({
            expectAnswer: true,
            errorMessage: null,
        });
        GraphQl.getMeasuresPage(customerId, studyId)
            .then(success => {
                this.setState({
                    expectAnswer: false,
                    tableData: success,
                });
            })
            .catch(error => {
                this.setState({
                    tableData: [],
                    expectAnswer: false,
                    errorMessage: JSON.stringify(error.data),
                });
            });
    }
    
    componentWillMount () {
        var {auth} = this.props;
        setTimeout(()=> {
            GraphQl
                .getStudies( auth.user.customer_id )
                .then(success => {
                    this.setState({studies: success});
                    this.updateTableData(auth.user.customer_id, 0);
                })
                .catch(error => {
                    this.setState({
                        expectAnswer: false,
                        errorMessage: JSON.stringify(error.data),
                    });
                });
        }, 10);
    }
    
    render() {
        
        var page = this.state.page;
        
        console.log('MEASURES reducer => ()'
            ,'\n state:', this.state
            ,'\n props:', this.props
            ,'\n page:', page
        );
        
        return (
            <div className="custom-content-container">
                <div className="row top-indent-8 offset-bottom-4">
                    <h1 className="col-xs-12 col-sm-8 offset-0 offset-bottom-2" style={{fontSize: '45px', fontWeight: 300}}>
                        Monitoring Measures <Preloader show={this.state.expectAnswer} />
                    </h1>
                    <div className="col-xs-12 col-sm-4 top-indent-3 offset-bottom-4">
                        <RaisedButton
                            label="ADD MEASURE"
                            style={{float: 'right'}}
                            labelColor="#ffffff"
                            backgroundColor="#4CAF50"
                            containerElement={<Link to={'app/measures'/*MESURE_EDIT.LINK({id: mesure.id})*/} />}
                                />
                    </div>
                </div>
                { this.Error() }
                <div className="row">
                    <div className="col-xs-12 col-lg-3 offset-bottom-4">
                        <div className="clearfix"> { this.Filter() } </div>
                    </div>
                    <div className="col-xs-12 col-lg-9 offset-bottom-4">
                        <div className="clearfix"> { this.Table() } </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Measures mapSteteToProps', state);
    return ({page: state.page, auth: state.auth})
}, null )(Measures);
