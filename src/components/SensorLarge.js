import React from 'react';
import ReactDOM from 'react-dom';// eslint-disable-line
import classNames from 'classnames';
import {
  Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';

class SensorLarge extends React.Component {
  constructor(props) {
    super(props);
  }
 
  formatValue(value) {
    if (value == 0)
      return 0;
    value = Math.abs(value);
    if (value <= 10) return value.toFixed(2);
    if (value > 10 && value <= 50) return value.toFixed(1);
    return value.toFixed(0);
  }

  render() {
    let {id_sensor, prefix_long, data_type, id_controller, channel, sensor_description} = this.props;
    /*
    get last data from props 
    generate dynamic fields on channel property to get data for current channel from lastData
    
    */
    /*
    Столбец	Назначение
    ch1_val	Масштабированное значение на канале
    ch1_sp1_val	Масштабированное значение уставки 1
    ch1_sp2_val	Масштабированное значение уставки 2
    ch1_sp1	Бит сработки уставки 1
    ch1_sp2	Бит сработки уставки 2
    ch1_f	Состояние ошибки на канале
    ch1_fltex	Код ошибки
    ch1_sp1_a	Бит направления сработки уставки 1 (0 – на повышение, 1 – на понижение)
    ch1_sp2_a	Бит направления сработки уставки 2 (0 – на повышение, 1 – на понижение)
    */
    let healthy = 0; // not healthy by default
    // let ContrName = 1; //controller number
    let ch_val = 0;
    let ch_sp1_val = 0;
    let ch_sp2_val = 0;
    let ch_sp1 = 0;
    let ch_sp2 = 0;
    let ch_f = 0;
    let ch_fltex = 0;
    let ch_rawVal = 0;
    let ch_sp1_rawVal = 0;
    let ch_sp2_rawVal = 0;
    let ch_l = 0;
    let ch_h = 0;
    let ch_sp1_a = 0;
    let ch_sp2_a = 0;
    //where i should update this data? not here///
    // controller window
    // sensor graph
    // login check
    // nodejs service for data fetching
    //todo check last data on null and is it exist 
    //todo data validation formatting
    // sensor alarm + sound
    // if not send default data

    //check if object lastData contains ch_val and other fields
    //go for current controller row in lastData
   
    // if(this.props.lastData != null){
    //   console.log("there no last data");
    //   return;
    // }
      
    if (this.props.lastData[0] != null) { // if there exist data
      this.props.lastData.map((controllerRow) => {
        if (controllerRow['ContrName'] == id_controller) {
          // pull out data for sensor from sensor controller
          // apply filtering data
          // debugger;
          
          healthy = controllerRow["healthy"];
          ch_val = controllerRow["ch" + channel + "_val"];
          ch_sp1_val = controllerRow["ch" + channel + "_sp1_val"];
          ch_sp2_val = controllerRow["ch" + channel + "_sp2_val"];
          ch_sp1 = controllerRow["ch" + channel + "_sp1"];
          ch_sp2 = controllerRow["ch" + channel + "_sp2"];
          ch_f = controllerRow["ch" + channel + "_f"];
          ch_fltex = controllerRow["ch" + channel + "_fltex"];
          ch_rawVal = controllerRow["ch" + channel + "_rawVal"];
          ch_sp1_rawVal = controllerRow["ch" + channel + "_sp1_rawVal"];
          ch_sp2_rawVal = controllerRow["ch" + channel + "_sp2_rawVal"];
          ch_l = controllerRow["ch" + channel + "_l"];
          ch_h = controllerRow["ch" + channel + "_h"];
          ch_sp1_a = controllerRow["ch" + channel + "_sp1_a"];
          ch_sp2_a = controllerRow["ch" + channel + "_sp2_a"];

          // format value
          ch_val = this.formatValue(ch_val);
          ch_sp1_val = this.formatValue(ch_sp1_val);
          ch_sp2_val = this.formatValue(ch_sp2_val);
        }
      });
    }

    //check if no data on last data show connection error with database
    let sensorState;
    if (this.props.lastData[0] != null) { // if there exist data
      //switch on states
      // current state
      if (!healthy) {
        sensorState = "nothealthysensor";
      }
      else if (ch_rawVal == 32771) {
        sensorState = "chclosed"; // change text of sensor 
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
      // if no errors happend before and sensorstate empty, everything ok
      if (sensorState == null) {
        sensorState = "ok";
      }
    }
    else {
      sensorState = "nodata"; // no code for this for now...
    }
    // use classnames library to concateneate classes for managin look of current sensor state
    let stateClasses = classNames({
      nothealthysensor: sensorState == "nothealthysensor",
      chfault: sensorState == "chfault",
      sp2: sensorState == "sp2",
      sp1: sensorState == "sp1"
    });


    return (
      
      <Card className="centered-sensors" >
        <span className="anchor" id={"K"+id_controller+"-"+channel}></span>
        <div className="sensor-large" >
          <div className={stateClasses}>
            <Container>
              <Row> 
                <Col xs={4}>
                  <Row className="mx-auto">
                    <div className="sensor-value ">{ch_val}</div>
                  </Row>
                  <Row>
                    <div className="controller-channel">K{id_controller}-{channel}</div>
                  </Row>
                </Col>
                <Col xs={4} className="units">{data_type}</Col>
                <Col xs={4} >
                  <Row className="row-alarms">
                    <Col xs={12} className="text-right">
                      <span className="alarm1-value">{ch_sp1_val}</span>
                      <span className="alarm1-direction">{ch_sp1_a ? '↓' : '↑'}</span>
                    </Col>
                  </Row>
                  <Row className="row-alarms">
                    <Col xs={12} className="text-right">
                      <span className="alarm2-value">{ch_sp2_val}</span>
                      <span className="alarm2-direction">{ch_sp2_a ? '↓' : '↑'}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            <Row>
              <Col xs={12} className="sensor-type">{prefix_long}</Col>
            </Row>
          </div>
        </div>

        <CardText>{sensor_description}</CardText>

      </Card>

    );
  }
}

export default SensorLarge;