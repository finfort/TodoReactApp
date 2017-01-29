import React, { Component } from 'react';
import ReactDOM from 'react-dom';// eslint-disable-line

import { browserHistory } from 'react-router';

import {Layer, Stage} from 'react-konva';

import SensorSmall from './SensorSmall';
import * as Helper from './helper';

class Mine extends Component {
    componentWillMount() {
        this.setState({
            // route components are rendered with useful information, like URL params
            mine: Helper.findMinebyId(this.props.params.mineId)
        });
    }

    // Stage - is a div wrapper
    // Layer - is a <canvas> element on the page
    // so you can use several canvases. It may help you to improve performance a lot.

    render() {
        return (
            <div>
                <button onClick={browserHistory.goBack} className="button icon-left">Go Back</button>
                <h2>{this.state.mine.mineName}</h2>

                <Stage width={700} height={700}>
                    <Layer>
                        <SensorSmall />
                    </Layer>
                </Stage>

            </div>
        );
    }
}

export default Mine;