import React, { Component } from 'react';
import ReactDOM from 'react-dom';// eslint-disable-line

import { browserHistory } from 'react-router';

import SensorLarge from './SensorLarge';
import * as Data from './helpers/Data';
import * as Helper from './helpers/mines';

import axios from 'axios';
import { CardDeck, Container, Alert } from 'reactstrap';

const ROOT_URL = 'http://localhost:3090'; // api url

class Mine extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mineName: '',
            sensors: [],
            lastData: {},
            timeoutId: '',
            errorMessage: ''
        };
    }

    // when users goes from MinesList get info from route which mine selected, or grub info from props
    componentWillMount() {
        console.log("component will mount");
        this.setState({
            // route components are rendered with useful information, like URL params
            mineName: Helper.findMinebyId(this.props.params.mineId),
        });
        this.fetchSensorsData();

        this.fetchLastData();
    }
    fetchLastData() {
        console.log("start fetching lastData");
        axios.get(`${ROOT_URL}/getLastData`) //es6 String Substitution
            .then(response => {
                // //clean error message this calls re render 
                // this.setState({
                //     errorMessage: ''
                // });
                this.setState({
                    lastData: response.data[0]
                });
                console.log("fetched LastData", response.data[0]);
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMessage: err
                });
            });
    }
    //try to use fabric.js over here
    // https://github.com/liuhong1happy/react-raphael
    // https://github.com/seal789ie/react-fabricjs
    // https://jsfiddle.net/STHayden/2pncoLb5/
    // https://react-bootstrap.github.io/components.html

    // getLastDataForSensor(controller, channel) {
    //     this.state.lastData;
    // }
    fetchSensorsData() {
        console.log("fetchSensorsData");
        axios.get(`${ROOT_URL}/getSensorsData`) //es6 String Substitution
            .then(response => {
                // console.log(" generateScreen getSensorsData", response);
                let sensorsData = response.data[0];
                this.setState({
                    sensors: sensorsData
                });
                // console.log("fetchSensorsData state", sensorsData);
            })
            .catch((err) => {
                console.log(err);
            });
        //static content generation
        /*return Data.sensorsDescription.map((sensor, index) => {
            //filter on дискретный
            if (sensor.data_type == "дискретный") return;

            return (
                <SensorLarge key={sensor.id_sensor}
                    id_sensor={sensor.id_sensor}
                    prefix_long={sensor.prefix_long}
                    data_type={sensor.data_type}
                    id_controller={sensor.id_controller}
                    channel={sensor.channel}
                    sensor_description={sensor.sensor_description}
                    lastData={this.state.lastData}
                />
            );
        });*/
    }


    // When component rendered updated their data
    // Mine should subscribe to recieve data from server
    componentDidMount() {
        //make request to server with axios
        // or get dummy data from Data.lastData
        console.log("DidMount");
        this.updateCurrData();
        //should this be state? set it and access to it from sensor large child component to update by itself

    }

    // On unmount component abourt request to server
    componentWillUnmount() {
        //this.serverRequest.abort();
        console.log("unmount clear everything");
        clearTimeout(this.state.timeoutId);

        // TODO abort requests to server
    }


    updateCurrData() {
        function fetchLastDataByTimer() {
            this.fetchLastData();
            const timeoutId = setTimeout(fetchLastDataByTimer.bind(this), 10 * 1000);
            // this.setState({ timeoutId: timeoutId });
        }
        setTimeout(fetchLastDataByTimer.bind(this), 10 * 1000); //don't care about this timer id...

    }
    alertFunction() {
        if (this.state.errorMessage) {
            return (<Alert color="danger">
                <strong>Ошибка!</strong> {this.state.errorMessage}
            </Alert>);
        }
    }
    drawSensors() {
        if (this.state.sensors == undefined || this.state.sensors.length == 0) return; //show that we have no  
        return (<CardDeck>
            {
                this.state.sensors.map((sensor) => {
                    //filter on дискретный
                    if (sensor.data_type == "дискретный") return;
                    return (<SensorLarge key={sensor.id_sensor}
                        id_sensor={sensor.id_sensor}
                        prefix_long={sensor.prefix_long}
                        data_type={sensor.data_type}
                        id_controller={sensor.id_controller}
                        channel={sensor.channel}
                        sensor_description={sensor.sensor_description}
                        lastData={this.state.lastData}
                    />);
                })
            }
        </CardDeck>);

    }


    render() {
        console.log("render");
        // debugger;
        return (
            <div id="wrapper" className="toggled">
                {/*{this.alertFunction()}*/}

                {/*<button onClick={browserHistory.goBack} >
                    Назад
                </button>*/}
                <h2>{this.state.mineName.mine}</h2>
                <div className="sensors-container">

                    {
                        this.drawSensors()
                    }

                </div>
               
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li className="sidebar-brand">
                                <a href="#">
                                    Start Bootstrap
                                </a>
                            </li>
                            <li>
                                <a href="#">Dashboard</a>
                            </li>
                            <li>
                                <a href="#">Shortcuts</a>
                            </li>
                            <li>
                                <a href="#">Overview</a>
                            </li>
                            <li>
                                <a href="#">Events</a>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                
                {/*footer*/}
                {/*<footer className="footer fixed-bottom">
                    <Container fluid>

                        <div className="warning-list">
                            <div className="warning-item">
                                <a href="#K1-1">Ch4 2%</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">Ch4 2%</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">Ch4 2%</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">Ch4 2%</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                            <div className="warning-item">
                                <a href="#K1-1">CO 20 ppm</a>
                            </div>
                        </div>
                    </Container>
                </footer>*/}
            </div>
        );
    }
}


export default Mine;



