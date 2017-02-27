import React, { Component } from 'react';
import ReactDOM from 'react-dom';// eslint-disable-line

// import { browserHistory } from 'react-router';
import Header from './header';


import SensorLarge from './SensorLarge';
// import * as Data from './helpers/Data';
import * as Helper from './helpers/mines';


import axios from 'axios';
import { CardDeck, Alert } from 'reactstrap';

const API_URL = 'http://r1:3090'; // api url
// bring out this to config file, and handle error if no connection 

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mine: '',
            sensors: [],
            lastData: {},
            timeoutId: '',
            mainTimer: '',
            errorMessage: ''
        };

    }

    // when users goes from MinesList get info from route which mine selected, or grub info from props
    componentWillMount() {
        console.log("component will mount");
        this.setState({
            // route components are rendered with useful information, like URL params
            mine: Helper.findMinebyId(this.props.params.mineId),
        });
        this.fetchSensorsData();

        this.fetchLastData();
    }
    fetchLastData() {
        // console.log("start fetching lastData");
        return axios.get(`${API_URL}/getLastData`) //es6 String Substitution
            .then(response => {
                //clean error message this calls re render 
                this.setState({
                    errorMessage: ''
                });
                this.setState({
                    lastData: response.data[0]
                });
                console.log("fetched LastData");
            })
            .catch((err) => {
                console.log("fetchLastData Err");
                console.dir(err.response);
                this.setState({
                    errorMessage: err.response.status + " " + err.response.data.errorMessage
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
        // console.log("fetchSensorsData");
        axios.get(`${API_URL}/getSensorsData`) //es6 String Substitution
            .then(response => {
                // console.log(" generateScreen getSensorsData", response);
                // one field for errors not so good
                this.setState({
                    errorMessage: ''
                });
                let sensorsData = response.data[0];
                this.setState({
                    sensors: sensorsData
                });
                console.log("fetchSensorsData state");
            })
            .catch((err) => {
                console.log("fetchSensorsData Err");
                console.dir(err.response);
                this.setState({
                    errorMessage: err.response.status + " " + err.response.data.errorMessage
                });
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
        console.log("unmount clear everything", this.state.timeoutId);
        clearTimeout(this.state.timeoutId);
        clearTimeout(this.state.mainTimer);

        // TODO abort requests to server
    }


    updateCurrData() {
        let seconds = 10;
        function fetchLastDataByTimer() {
            this.fetchSensorsData();
            this.fetchLastData();
            const timeoutId = setTimeout(fetchLastDataByTimer.bind(this), seconds * 1000);
            this.setState({ timeoutId: timeoutId });
            console.log("update curr data", timeoutId);
        }
        let mainTimer = setTimeout(fetchLastDataByTimer.bind(this), seconds * 1000); //main timer who lauches fetchLastDataByTimer
        console.log("update curr data mainTimer", mainTimer);
        this.setState({ mainTimer: mainTimer });


    }
    alertFunction() {
        if (this.state.errorMessage) {
            return (
                <div className="overlay-error ">
                    <div className="error-panel overlay-content">
                        <Alert color="danger">
                            <strong>Ошибка!</strong> {this.state.errorMessage.toString()}
                        </Alert>
                    </div>
                </div>);
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

        return (
            <div >
                <Header lastData={this.state.lastData} sensorsData={this.state.sensors} />


                {/*<button onClick={browserHistory.goBack} >
                    Назад
                </button>*/}

                <div >
                    {this.alertFunction()}

                    <h2>{this.state.mine.association} {this.state.mine.mineName}</h2>
                    <div className="sensors-container">
                        {
                            this.drawSensors()
                        }
                    </div>
                </div>



                {/*footer*/}
                {/*<footer className="footer fixed-bottom">
                </footer>*/}
            </div>
        );
    }
}


export default Mine;



