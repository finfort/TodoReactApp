import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { slide as Menu } from 'react-burger-menu';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';



class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isOpen: false,
            isToggleOn: false
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
                    Выход
                </NavItem>
            );
        } else {
            return [
                <NavItem key={1}>
                    <NavLink tag={Link} className="nav-link" to="/signin/" activeClassName="active">Вход</NavLink>
                </NavItem>,
                <NavItem key={2}>
                    <NavLink tag={Link} className="nav-link" to="/signup/" activeClassName="active">Регистрация</NavLink>
                </NavItem>
            ];
        }
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        console.log("toggle burger menu");

    }
    isMenuOpen(state) {
        this.setState({
            isToggleOn: state.isOpen
        });
        return state.isOpen;
    }

    drawAlertMenu() {
        let activeRouteName = this.props.location.pathname;
        // active only for mines routes
        if (activeRouteName == '/mine/'+ this.props.router.params.mineId) {
            return (
                <Menu isOpen={this.state.isToggleOn} right onStateChange={this.isMenuOpen.bind(this)} >
                    {/*replace with real data*/}
                    <div className="warning-list">
                        <div className="warning-item">
                            <a href="#K1-1">Ch4 2%</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K17-2">Ch4 2%</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">Ch4 2%</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">Ch4 2%</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                        <div className="warning-item">
                            <a href="#K8-1">CO 20 ppm</a>
                        </div>
                    </div>

                </Menu>
            );
        }
    }
    render() {


        return (
            <div>
                <Navbar color="faded" light toggleable fixed="top">
                    <NavbarToggler right onClick={this.toggle} />
                    <NavbarBrand tag={Link} to="/">
                        ЦЕНТР УГОЛЬНОЙ ПРОМЫШЛЕННОСТИ
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {/*<NavItem>
                                <a href="#menu-toggle" className="btn btn-default" id="menu-toggle" onClick={this.handleToggleClick}>Toggle Menu</a>
                            </NavItem>*/}
                            {/*<NavItem>
                                <NavLink tag={Link} className="nav-link" to="/todo" activeClassName="active">Todo</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="nav-link" to="/users" activeClassName="active">users</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="nav-link" to="/resources" activeClassName="active">resources</NavLink>
                            </NavItem>*/}
                            {/*<NavItem>
                                <button onClick={this.handleClick}>
                                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                                </button>
                            </NavItem>*/}
                            {this.authLink()}
                        </Nav>
                    </Collapse>
                </Navbar>
                {this.drawAlertMenu()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authentication.authenticated
    };
};

Header = connect(mapStateToProps, actions)(Header);

export default withRouter(Header);