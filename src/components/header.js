import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    authLink() {
        if (this.props.authenticated) {
            return (
                <NavItem eventKey={6} onClick={() => this.props.signoutUser()} >
                    Sign Out
                </NavItem>
            );
        } else {
            return [
                <NavItem key={1}>
                    <NavLink tag={Link} className="nav-link" to="/signin/" activeClassName="active">Sign in</NavLink>
                </NavItem>,
                <NavItem key={2}>
                    <NavLink tag={Link} className="nav-link" to="/signup/" activeClassName="active">Sign up</NavLink>

                </NavItem>
            ];
        }
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light toggleable>
                    <NavbarToggler right onClick={this.toggle} />
                    <NavbarBrand>
                        <NavLink tag={Link} to="/">
                            ЦЕНТР
                    </NavLink>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} className="nav-link" to="/todo" activeClassName="active">Todo</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="nav-link" to="/users" activeClassName="active">users</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="nav-link" to="/resources" activeClassName="active">resources</NavLink>
                            </NavItem>
                            {this.authLink()}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authentication.authenticated
    };
};
export default connect(mapStateToProps, actions)(Header);