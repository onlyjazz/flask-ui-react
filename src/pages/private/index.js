
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

// local dependencies

class App extends Component {
    render() {
        return (
            <div>
                
                Private App content here
                
                <ul>
                    <li><Link to="/app/studies"> /app/studies </Link></li>
                    <li><Link to="/app/sites"> /app/sites </Link></li>
                    <li><Link to="/app/users"> /app/users </Link></li>
                    <li><Link to="/app/measures"> /app/measures </Link></li>
                    <li><Link to="/app/monitoring"> /app/monitoring </Link></li>
                    <li><Link to="/"> login </Link></li>
                </ul>
                {/* <Route path="/app/studies"> /app/studies </Route> */}
                {/* <Route path="/app/sites"> /app/sites </Route>
                <Route path="/app/users"> /app/users </Route>
                <Route path="/app/measures"> /app/measures </Route>
                <Route path="/app/monitoring"> /app/monitoring </Route> */}
            </div>
        );
    }
}

export default connect(state => {
    console.log('App mapSteteToProps', state);
    return ({})
} )(App);
