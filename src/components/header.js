
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { white, deepPurple600 } from 'material-ui/styles/colors'

// local dependencies
import { signout, navMinify, navMaximize } from '../actions';
import logo from '../images/logo.png';

const Logo = ( props ) => (
    <Link className="logo" to="/app/users" { ...props }>
        <img className="top-indent-2" alt="Flask data" src={logo} style={{width: '34px', height: '35px'}} />
    </Link>
);

const Toogle = ( props ) => (
    props.toogle ? <IconButton {...props}> <ArrowRight color={white} /> </IconButton>
        : <IconButton {...props}> <ArrowLeft color={white} /> </IconButton>
);


class Header extends Component {
    
    userMenu () {
        return (
            <IconMenu
                iconButtonElement={ <IconButton> <MenuIcon color={white} /> </IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                <MenuItem disabled="true" primaryText={'Signed in as '+this.props.auth.user.name} />
                <Link className="" to={'/app/users'}>
                    <img className="top-indent-2" alt="Flask data" src={logo} style={{width: '34px', height: '35px'}} />
                </Link>
                <MenuItem primaryText="profile" />
                <MenuItem primaryText="Logout" onClick={this.props.signout} />
            </IconMenu>
        );
    }
    
    render() {
        
        var { nav, navMinify, navMaximize } = this.props;
        
        // console.log('Header reducer => ()'
        //     ,'\n props:', this.props
        //     ,'\n state:', this.state
        //     ,'\n nav:', nav
        // );

        return (
            <header id="header">
                <AppBar
                    title={ <Toogle toogle={Number(nav.minify)} onClick={()=> nav.minify?navMaximize():navMinify() }/> }
                    iconElementRight={ this.userMenu() }
                    style={{backgroundColor: deepPurple600, height: '64px'}}
                    iconElementLeft={ <Logo /> }
                        />
			</header>
        );
    }
}

export default connect(state => ({nav: state.nav, auth: state.auth}), { signout, navMinify, navMaximize })(Header);
