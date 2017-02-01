import React from 'react';
import ReactDOM from 'react-dom';// eslint-disable-line

import { Grid, Row, Col } from 'react-bootstrap';

class SensorLarge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green',
      
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      color: 'red'
    });
  }

  handleData(){

  }

  render() {
    let id_sensor, prefix_long, data_type, id_controller, channel, sensor_description = this.props;
    return (
      <div className="sensor-large">
          <Row>
            <Col xs={4} className="sensor-value">0</Col>
            <div className="units col-xs-3">{data_type}</div>
            <div className="col-xs-5">
              <div className="row row-alarms">
                <div className="col-xs-12">
                  <span className="alarm1-value">14,00</span>
                  <span className="alarm1-direction">↑</span></div>
              </div>
              <div className="row row-alarms">
                <div className="col-xs-12">
                  <span className="alarm2-value">28,00</span>
                  <span className="alarm2-direction">↓</span></div>
              </div>
            </div>
          </Row>
          <Row>
            <div className="sensor-description  col-xs-12">{prefix_long}</div>
          </Row>
      </div>

    );
  }
}

export default SensorLarge;