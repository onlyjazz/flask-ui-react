
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { white, deepPurple600 } from 'material-ui/styles/colors';

// local dependencies
import logo from '../images/logo.png';
import { USERS } from '../constants/routes';
import { signout, navMinify, navMaximize } from '../actions';

const Logo = ( props ) => (
    <Link className="logo" to={USERS.LINK()} style={{padding: '0 0 0 10px'}} { ...props }>
        <img className="top-indent-2" alt="Flask data" src={logo} style={{width: '35px', height: '36px'}} />
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
                <MenuItem disabled={true} style={{fontWeight: 'bolder', color: '#000'}} primaryText={'Signed in as '+this.props.auth.user.name} />
                <Divider />
                <MenuItem primaryText="Profile" containerElement={<Link to={USERS.LINK()} />} />
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
                    iconElementRight={ this.userMenu() }
                    title={ <Toogle toogle={Number(nav.minify)} onClick={()=> nav.minify?navMaximize():navMinify() }/> }
                    style={{backgroundColor: deepPurple600, height: '64px', boxShadow: '0 3px 3px 0 rgba(0,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20)'}}
                    iconElementLeft={ <Logo /> }
                        />
			</header>
        );
    }
}

export default connect(state => ({nav: state.nav, auth: state.auth}), { signout, navMinify, navMaximize })(Header);
