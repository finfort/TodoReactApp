import React, { Component } from 'react';
import { Link, location } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
    authLink() {
        if (this.props.authenticated) {
            return (
                <NavItem eventKey={6} onClick={() => this.props.signoutUser()} >
                    Sign Out
                </NavItem>
            );
        } else {
            return [
                <LinkContainer to='signin' key={1}>
                    <NavItem eventKey={4} >Sign in</NavItem>
                </LinkContainer>,
                <LinkContainer to='signup' key={2}>
                    <NavItem eventKey={5} >Sign up</NavItem>
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

                    {
                        // className={this.props.location.pathname.startsWith('/todo') && 'active'}
                    }
                    <LinkContainer to='/todo'>
                        <NavItem eventKey={2} >Todo</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/users' >
                        <NavItem eventKey={3} >Users</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/resources' activeClassName="active">
                        <NavItem eventKey={1} >Resources</NavItem>
                    </LinkContainer>

                    {
                        this.authLink()
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