import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
                <LinkContainer to='/signin'>
                    <NavItem eventKey={4} key={1}>Sign in</NavItem>
                </LinkContainer>,
                <LinkContainer to='/signup'>
                    <NavItem eventKey={5} key={2}>Sign up</NavItem>
                </LinkContainer>
                ];
        }
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to='/resources'>
                        <NavItem eventKey={1}>Resources</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/todo'>
                        <NavItem eventKey={2} href="#">Todo</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/users'>
                        <NavItem eventKey={3} href="#">Users</NavItem>
                    </LinkContainer>

                     {this.authLink()}

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