import React from 'react';
import ReactDOM from 'react-dom';// eslint-disable-line

import {Rect} from 'react-konva';

class SensorSmall extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        color: 'green'
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState({
        color: Konva.Util.getRandomColor()// eslint-disable-line
      });
    }

    render() {
        return (
            <Rect
                x={10} y={10} width={200} height={200}
                fill={this.state.color}
                shadowBlur={10}
                onClick={this.handleClick}    
            />
        );
    }
}

export default SensorSmall;