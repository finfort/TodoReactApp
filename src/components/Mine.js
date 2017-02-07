import React, { Component } from 'react';
import ReactDOM from 'react-dom';// eslint-disable-line

import { browserHistory } from 'react-router';

import SensorLarge from './SensorLarge';
import * as Data from './helpers/Data';
import * as Helper from './helpers/mines';

// import { CardDeck } from 'reactstrap';
import { CardDeck, Container } from 'reactstrap';

class Mine extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            lastData: {}
        };
    }

    // when users goes from MinesList get info from route which mine selected, or grub info from props
    componentWillMount() {
        this.setState({
            // route components are rendered with useful information, like URL params
            mine: Helper.findMinebyId(this.props.params.mineId)
        });
    }
    //try to use fabric.js over here
    // https://github.com/liuhong1happy/react-raphael
    // https://github.com/seal789ie/react-fabricjs
    // https://jsfiddle.net/STHayden/2pncoLb5/
    // https://react-bootstrap.github.io/components.html

    getLastDataForSensor(controller, channel) {
        this.state.lastData;
    }
    generateScreen() {


        return Data.sensorsDescription.map((sensor, index) => {
            //filter on дискретный
            if (sensor.data_type == "дискретный") return;

            //filter lastData from One controller and pass it to Sensor
            // // if (!lastDataOfOneController) {// run this just once
            //     for (let i = 0; i < this.state.lastData.length; i++) {
            //         if (this.state.lastData[i].ContrName)
            //             if (this.state.lastData[i].ContrName == sensor.id_controller)
            //                 lastDataOfOneController = this.state.lastData[i]

            //     }
            // // }

            // let lastData = getLastDataForSensor(sensor.id_controller, sensor.channel);

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
        });
    }
    // When component rendered updated their data
    // Mine should subscribe to recieve data from server
    componentDidMount() {
        //make request to server with axios
        // or get dummy data from Data.lastData
        //     this.serverRequest = 
        //   axios
        //     .get("http://codepen.io/jobs.json")
        //     .then(function(result) {    
        //       _this.setState({
        //         jobs: result.data.jobs
        //       });
        //     })
        this.setState({
            lastData: Data.lastData
        });
        //should this be state? set it and access to it from sensor large child component to update by itself

    }

    // On unmount component abourt request to server
    componentWillUnmount() {
        //this.serverRequest.abort();
    }

    updateCurrData() {

    }

    render() {
        let sensors = this.generateScreen();
        // debugger;
        return (
            <div>
                <button onClick={browserHistory.goBack} >
                    Назад
                </button>
                <h2>{this.state.mine.mineName}</h2>
                <div className="sensors-container">
                    <CardDeck>

                        {
                            sensors
                        }
                    </CardDeck>


                </div>
                {/*footer*/}
                <footer className="footer fixed-bottom">
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
                </footer>
            </div>
        );
    }
}

export default Mine;



