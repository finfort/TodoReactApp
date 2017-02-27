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
    formatValue(value) {
        if (value == 0)
            return 0;
        value = Math.abs(value);
        if (value <= 10) return value.toFixed(2);
        if (value > 10 && value <= 50) return value.toFixed(1);
        return value.toFixed(0);
    }

    drawAlertMenu() {
        let activeRouteName = this.props.location.pathname;
        // active only for mines routes
        if (activeRouteName == '/mine/' + this.props.router.params.mineId) {
            return (
                <Menu isOpen={this.state.isToggleOn} right onStateChange={this.isMenuOpen.bind(this)}  customBurgerIcon={ <img src="/public/img/bell.svg" /> } >
                    {/*replace with real data*/}
                    {/*<div className="table-responsive">*/}
                    <table id="alarm" className="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th>Тип</th>
                                <th>Значение</th>
                                <th>Предупреждения</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*<tr id="table-danger">
                                <td>CH4</td>
                                <td>2%</td>
                                <td>Авария</td>
                            </tr>
                            <tr id="table-warning">
                                <td>H2S</td>
                                <td>1 ppm</td>
                                <td>Предупрждение</td>
                            </tr>
                            <tr id="table-info">
                                <td>1,003</td>
                                <td>Integer</td>
                                <td>Ошибка</td>
                            </tr>*/}
                            {this.generatAlertRows()}
                        </tbody>
                    </table>
                    {/*</div>*/}
                    {/*                    
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
                    </div>*/}

                </Menu>
            );
        }
    }
    generatAlertRows() {
        // todo refactor code extract main logic

        if (this.props.lastData[0] != null) { // if there exist data
            let rows = [];

            this.props.lastData.map((controllerRow) => {
                let channel = 1;
                let ch_val = 0;
                let ch_sp1_val = 0;
                let ch_sp2_val = 0;
                let ch_sp1 = 0;
                let ch_sp2 = 0;
                let ch_f = 0;
                for (channel; channel < 8; channel++) {
                    ch_val = controllerRow["ch" + channel + "_val"];
                    // ch_sp1_val = controllerRow["ch" + channel + "_sp1_val"];
                    // ch_sp2_val = controllerRow["ch" + channel + "_sp2_val"];
                    ch_sp1 = controllerRow["ch" + channel + "_sp1"];
                    ch_sp2 = controllerRow["ch" + channel + "_sp2"];
                    ch_f = controllerRow["ch" + channel + "_f"];

                    // format value
                    ch_val = this.formatValue(ch_val);
                    ch_sp1_val = this.formatValue(ch_sp1_val);
                    ch_sp2_val = this.formatValue(ch_sp2_val);

                    this.props.sensorsData.map((sensor, index) => {
                        if (sensor.data_type == "дискретный") return;
                        if (sensor.id_controller == controllerRow['ContrName'] && sensor.channel == channel) {
                            let healthy = controllerRow["healthy"];
                            let sensorState;
                            if (!healthy) {
                                sensorState = "nothealthysensor";
                            }
                            else if (ch_f) {
                                sensorState = "chfault";
                            }
                            else {
                                if (ch_sp1) {
                                    sensorState = "sp1";
                                }
                                if (ch_sp2) {
                                    sensorState = "sp2";
                                }
                            }
                            // debugger;
                            switch (sensorState) {
                                case "chfault":
                                    rows.push(
                                        <tr id="table-info" key={index}>
                                            <td>
                                                <a href={"#K" + sensor.id_controller + "-" + sensor.channel}>
                                                    {sensor.prefix_short}
                                                </a>
                                            </td>
                                            <td>{ch_val} {sensor.data_type}</td>
                                            <td>Ошибка</td>
                                        </tr>);
                                    break;
                                case "sp1":
                                    rows.push(
                                        <tr id="table-warning" key={index}>
                                            <td>
                                                <a href={"#K" + sensor.id_controller + "-" + sensor.channel}>
                                                    {sensor.prefix_short}
                                                </a>
                                            </td>
                                            <td>{ch_val} {sensor.data_type}</td>
                                            <td>Предупреждение</td>
                                        </tr>);
                                    break;
                                case "sp2":
                                    rows.push(
                                        <tr id="table-danger" key={index}>
                                            <td>
                                                <a href={"#K" + sensor.id_controller + "-" + sensor.channel}>
                                                    {sensor.prefix_short}
                                                </a>
                                            </td>
                                            <td>{ch_val} {sensor.data_type}</td>
                                            <td>Авария</td>
                                        </tr>
                                    );
                                    break;
                            }

                            /*if (ch_sp2) {
                                rows.push(

                                    <tr id="table-danger" key={index}>
                                        <td>
                                            <a href={"#K" + sensor.id_controller + "-" + sensor.channel}>
                                                {sensor.prefix_short}
                                            </a>
                                        </td>
                                        <td>{ch_val} {sensor.data_type}</td>
                                        <td>Авария</td>
                                    </tr>
                                );
                            }
                            if (ch_sp1) {
                                rows.push(
                                    <tr id="table-warning" key={index}>
                                        <td>
                                            <a href={"#K" + sensor.id_controller + "-" + sensor.channel}>
                                                {sensor.prefix_short}
                                            </a>
                                        </td>
                                        <td>{ch_val} {sensor.data_type}</td>
                                        <td>Предупреждение</td>
                                    </tr>);
                            }
                            if (ch_f) {
                                rows.push(
                                    <tr id="table-info" key={index}>
                                        <td>
                                            <a href={"#K" + sensor.id_controller + "-" + sensor.channel}>
                                                {sensor.prefix_short}
                                            </a>
                                        </td>
                                        <td>{ch_val} {sensor.data_type}</td>
                                        <td>Ошибка</td>
                                    </tr>);
                            }*/
                        }
                    });

                }

            });
            return rows;
        }
    }

    render() {
        return (
            <div >
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
            </div >
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