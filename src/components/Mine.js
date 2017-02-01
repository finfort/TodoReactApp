import React, { Component } from 'react';
import ReactDOM from 'react-dom';// eslint-disable-line

import { browserHistory } from 'react-router';

import { Glyphicon } from 'react-bootstrap';

import SensorLarge from './SensorLarge';
import * as Data from './helpers/Data';
import * as Helper from './helpers/mines';

class Mine extends Component {
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

    // <SensorLarge id_sensor={sensor.id_sensor}
    //                 prefix_long={sensor.prefix_long}
    //                 data_type={sensor.data_type}
    //                 id_controller={sensor.id_controller}
    //                 channel={sensor.channel}
    //                 sensor_description={sensor.sensor_description}
    // />


    generateScreen() {

    }

    render() {
        let sensors = this.generateScreen();
        return (
            <div>
                <button onClick={browserHistory.goBack} bsSize="xsmall">
                    <Glyphicon glyph="circle-arrow-left" />
                    Назад
                </button>
                <h2>{this.state.mine.mineName}</h2>
                {
                    Data.sensorsDescription.map((sensor, index) => {
                        if(sensor.data_type == "дискретный") return;
                        return (
                            <SensorLarge key={sensor.id_sensor} 
                                id_sensor={sensor.id_sensor}
                                prefix_long={sensor.prefix_long}
                                data_type={sensor.data_type}
                                id_controller={sensor.id_controller}
                                channel={sensor.channel}
                                sensor_description={sensor.sensor_description}
                                />
                        );
                    }
                    )
                }
                
            </div>
        );
    }
}

export default Mine;



