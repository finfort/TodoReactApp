import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItemRouter } from './helpers/NavItemRouter';

class Header extends Component {
    authLink() {
        if (this.props.authenticated) {
            return (
                <NavItem eventKey={6}  onClick={() => this.props.signoutUser()} >
                   Sign Out
                </NavItem>
            );
        } else {
            return [
                <LinkContainer to='signin'>
                    <NavItem eventKey={4} key={1}>Sign in</NavItem>
                </LinkContainer>,
                <LinkContainer to='signup'>
                    <NavItem eventKey={5} key={2}>Sign up</NavItem>
                </LinkContainer>
                ];
        }
    }


// <ul className="nav nav-tabs"> 
//   <NavItem to='/home' index={true} >Home</NavItem>
//   <NavItem to='/about'>About</NavItem>
// </ul>


    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/" onlyActiveOnIndex activeClassName="active" >Home</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                {
                    <NavItemRouter to='/todo'>Todo</NavItemRouter>
                // <NavItemRouter to='/users'>Users</NavItemRouter>
            }
                {
                    // <LinkContainer to='/resources'  activeClassName="active"> 
                    //     <NavItem eventKey={1} >Resources</NavItem>
                    // </LinkContainer>
                    // <LinkContainer to='/todo'  activeClassName="active">
                    //     <NavItem eventKey={2} >Todo</NavItem>
                    // </LinkContainer>
                    // <LinkContainer to='/users' activeClassName="active">
                    //     <NavItem eventKey={3} >Users</NavItem>
                    // </LinkContainer>
}
                     {
                         //this.authLink()
                        }

                </Nav>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authentication.authenticated
    };
};
export default connect(mapStateToProps, actions)(Header);