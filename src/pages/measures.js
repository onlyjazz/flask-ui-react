
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

// local dependencies

// configuration
var cellOverideStyle = {
    whiteSpace: 'normal',
    textOverflow: 'unset'
};
var tooltipOverideStyle = {
    top: '-30%',
    left: '0px'
};
const tableData = [
  {
    name: 'John Smith John Smith John Smith John Smith John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

var sortIcon = {
    'sort': 'glyphicon glyphicon-sort',
    'sort_asc': 'glyphicon glyphicon-sort-by-attributes',   
    'sort_desc': 'glyphicon glyphicon-sort-by-attributes-alt',
    
    'alphabet': 'glyphicon glyphicon-sort',
    'alphabet_asc': 'glyphicon glyphicon-sort-by-alphabet',
    'alphabet_desc': 'glyphicon glyphicon-sort-by-alphabet-alt',
    
    'alphabet': 'glyphicon glyphicon-sort',
    'alphabet_asc': 'glyphicon glyphicon-sort-by-alphabet',
    'alphabet_desc': 'glyphicon glyphicon-sort-by-alphabet-alt',
    
    'order': 'glyphicon glyphicon-sort',
    'order_asc': 'glyphicon glyphicon-sort-by-order',
    'order_desc': 'glyphicon glyphicon-sort-by-order-alt',
};


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
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: true,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: 'auto',
            sort: 'non'
        };
        
        this.toggle = ( event, toggled ) => {
            this.setState({ [event.target.name]: toggled });
        }
    }
      
    Options () {
        var { toggle } = this;
        
        return (
            <div style={{ width: 500, overflow: 'hidden', margin: '20px auto' }}>
                <h3> Table Properties </h3>
                <TextField floatingLabelText="Table Body Height" defaultValue={this.state.height} onChange={(event)=> this.setState({height: event.target.value}) } />
                <Toggle name="fixedHeader" label="Fixed Header" onToggle={toggle} defaultToggled={this.state.fixedHeader} />
                <Toggle name="fixedFooter" label="Fixed Footer" onToggle={this.toggle} defaultToggled={this.state.fixedFooter} />
                <Toggle name="selectable" label="Selectable" onToggle={this.toggle} defaultToggled={this.state.selectable} />
                <Toggle name="multiSelectable" label="Multi-Selectable" onToggle={this.toggle} defaultToggled={this.state.multiSelectable} />
                <Toggle name="enableSelectAll" label="Enable Select All" onToggle={this.toggle} defaultToggled={this.state.enableSelectAll} />
                <h3 style={{margin: '20px auto 10px'}}> TableBody Properties </h3>
                <Toggle name="deselectOnClickaway" label="Deselect On Clickaway" onToggle={(event, toggled)=>this.setState({ [event.target.name]: toggled })} defaultToggled={this.state.deselectOnClickaway} />
                <Toggle name="stripedRows" label="Stripe Rows" onToggle={this.toggle} defaultToggled={this.state.stripedRows} />
                <Toggle name="showRowHover" label="Show Row Hover" onToggle={this.toggle} defaultToggled={this.state.showRowHover} />
                <h3 style={{margin: '20px auto 10px'}}> Multiple Properties </h3>
                <Toggle name="showCheckboxes" label="Show Checkboxes" onToggle={this.toggle} defaultToggled={this.state.showCheckboxes} />
            </div>    
        );
    }
  
    Filter () {
        return (
            <Paper zDepth={2} className="clearfix">
                <h2 className="col-xs-12 top-indent-2 offset-bottom-4" style={{fontSize: '24px', fontWeight: 'normal'}}>
                    Filters
                </h2>
                <div className="col-xs-12 offset-bottom-4">
                    <SelectField
                        fullWidth={true}
                        floatingLabelText="Frequency"
                        value={this.state.value}
                        onChange={this.handleChange}
                            >
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
                    </SelectField>
                </div>
                <div className="col-xs-12 offset-bottom-4">
                    <FlatButton
                        label="APPLY"
                        primary={true}
                        disabled={false}
                        fullWidth={true}
                        containerElement={<Link to={'app/measures'/*MESURE_EDIT.LINK({id: mesure.id})*/} />}
                            />
                </div>
            </Paper>
        )
    }
  
    Table () {
        
        return (
            <Paper zDepth={2} style={{overflow: 'visible', tableStyle: {overflow: 'visible'}}}>                
                <Table
                    style={{overflow: 'visible'}} /* Fucking material essols */
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                        >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                            >
                        <TableRow onCellClick={(event) => {
                            // console.log(event.target)
                            this.setState({sort: !this.state.sort});
                        }}>
                            <TableHeaderColumn> <Sort status={this.state.sort}> Study </Sort> </TableHeaderColumn>
                            <TableHeaderColumn tooltip="Measure propertie" tooltipStyle={tooltipOverideStyle}> Measure </TableHeaderColumn>
                            <TableHeaderColumn tooltip="Event propertie" tooltipStyle={tooltipOverideStyle}> Event </TableHeaderColumn>
                            <TableHeaderColumn tooltip="CRF abbr" tooltipStyle={tooltipOverideStyle}> CRF </TableHeaderColumn>
                            <TableHeaderColumn tooltip="Item description" tooltipStyle={tooltipOverideStyle}> Item </TableHeaderColumn>
                            <TableHeaderColumn style={{width: '140px', textAlign: 'center'}}> --- </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                            >
                        {tableData.map( (row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={cellOverideStyle}> {index} </TableRowColumn>
                                <TableRowColumn style={cellOverideStyle}> {row.name} </TableRowColumn>
                                <TableRowColumn style={cellOverideStyle}> {row.status} </TableRowColumn>
                                <TableRowColumn style={cellOverideStyle}> {row.status} </TableRowColumn>
                                <TableRowColumn style={cellOverideStyle}> {row.status} </TableRowColumn>
                                <TableRowColumn style={{...cellOverideStyle, width: '140px'}}>
                                    <FlatButton
                                        primary={true}
                                        disabled={false}
                                        label={<span><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit </span>}
                                        containerElement={<Link to={'app/measures'/*MESURE_EDIT.LINK({id: mesure.id})*/} />}
                                            />
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
  
    render() {
        
        return (
            <div className="custom-content-container">
                <div className="row top-indent-8 offset-bottom-4">
                    <h1 className="col-xs-12 col-sm-8 offset-0 offset-bottom-2" style={{fontSize: '45px', fontWeight: 300}}>
                        Monitoring Measures
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
                <div className="row">
                    <div className="col-xs-12 col-md-3 offset-bottom-4">
                        <div className="clearfix"> { this.Filter() } </div>
                    </div>
                    <div className="col-xs-12 col-md-9 offset-bottom-4">
                        {/* <div className="row"> { this.Options() } </div> */}
                        <div className="clearfix"> { this.Table() } </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Measures mapSteteToProps', state);
    return ({})
}, null )(Measures);

// <div className="row">
//     <div className="panel panel-default no-radius">
//         <div className="panel-heading">
//             <i className="fa fa-line-chart" aria-hidden="true"></i>
//             <strong> Measures </strong>
//             <FlatButton
//                 primary={true}
//                 disabled={false}
//                 style={{marginTop: '-8px', float: 'right'}}
//                 label={<span><i className="fa fa-plus" aria-hidden="true"></i> New Measure </span>}
//                 containerElement={<Link to={'app/measures'/*MESURE_EDIT.LINK({id: mesure.id})*/} />}
//                     />
//         </div>
//     </div>
//     <div className="col-xs-12">
//         {/* <div className="row"> { this.Options() } </div> */}
//         <div className="clearfix"> { this.Table() } </div>
//     </div>
// </div>

