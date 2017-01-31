import React, { Component } from 'react';
import ReactDOM from 'react-dom';// eslint-disable-line

import { browserHistory } from 'react-router';

import { Glyphicon } from 'react-bootstrap';

import SensorSmall from './SensorSmall';
import * as Helper from './helper';

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

    render() {
        return (
            <div>
                <button onClick={browserHistory.goBack} bsSize="xsmall">
                <Glyphicon glyph="circle-arrow-left"/>
                 Назад
                </button>
                <h2>{this.state.mine.mineName}</h2>
                    <SensorSmall/>
                    <SensorSmall/>
                    <SensorSmall/>
                    
            </div>
        );
    }
}

export default Mine;