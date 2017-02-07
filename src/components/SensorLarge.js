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

  handleData() {

  }

  formatValue(value) {
    if (value == 0)
      return 0;
    value = Math.abs(value)
    if (value <= 10) return value.toFixed(2);
    if (value > 10 && value <= 50) return value.toFixed(1);
    return value.toFixed(0);
  }

  render() {
    let {id_sensor, prefix_long, data_type, id_controller, channel, sensor_description} = this.props;
    /*
    get last data from props 
    generate dynamic fields on channel property to get data for current channel from lastData
    example of lastData
    ContrName: 12Contr_description: "NULL"HD: "febb2d02f4caeffb8ec6387e17e58adf5e0adf5f"RightTime: 0TimestampStr: "2016-11-28 08:26:24.3500000"address: 3afsource: 0at: 0ch1_f: 0ch1_fltex: 0ch1_h: 10ch1_l: 954843ch1_rawVal: 3ch1_sp1: 0ch1_sp1_a: 0ch1_sp1_rawVal: 300ch1_sp1_val: 300ch1_sp2: 0ch1_sp2_a: 0ch1_sp2_rawVal: 300ch1_sp2_val: 300ch1_val: 3ch2_f: 0ch2_fltex: 0ch2_h: 10ch2_l: 957213ch2_rawVal: 0ch2_sp1: 0ch2_sp1_a: 0ch2_sp1_rawVal: 300ch2_sp1_val: 300ch2_sp2: 0ch2_sp2_a: 0ch2_sp2_rawVal: 300ch2_sp2_val: 300ch2_val: 0ch3_f: 0ch3_fltex: 9ch3_h: 0ch3_l: 0ch3_rawVal: 32771ch3_sp1: 0ch3_sp1_a: 0ch3_sp1_rawVal: 65ch3_sp1_val: 65ch3_sp2: 0ch3_sp2_a: 0ch3_sp2_rawVal: 72ch3_sp2_val: 72ch3_val: 0ch4_f: 0ch4_fltex: 9ch4_h: 0ch4_l: 0ch4_rawVal: 32771ch4_sp1: 0ch4_sp1_a: 0ch4_sp1_rawVal: 65ch4_sp1_val: 65ch4_sp2: 0ch4_sp2_a: 0ch4_sp2_rawVal: 72ch4_sp2_val: 72ch4_val: 0ch5_f: 0ch5_fltex: 0ch5_h: 0ch5_l: 0ch5_rawVal: 125ch5_sp1: 0ch5_sp1_a: 1ch5_sp1_rawVal: 30ch5_sp1_val: "0,3"ch5_sp2: 0ch5_sp2_a: 0ch5_sp2_rawVal: 140ch5_sp2_val: "1,4"ch5_val: "1,25"ch6_f: 0ch6_fltex: 9ch6_h: 0ch6_l: 0ch6_rawVal: 32771ch6_sp1: 0ch6_sp1_a: 0ch6_sp1_rawVal: 100ch6_sp1_val: 1ch6_sp2: 0ch6_sp2_a: 0ch6_sp2_rawVal: 130ch6_sp2_val: "1,3"ch6_val: 0ch7_f: 0ch7_fltex: 0ch7_h: 0ch7_l: 0ch7_rawVal: 1ch7_sp1: 0ch7_sp1_a: 0ch7_sp1_rawVal: 100ch7_sp1_val: 100ch7_sp2: 0ch7_sp2_a: 1ch7_sp2_rawVal: 130ch7_sp2_val: 130ch7_val: 1ch8_f: 0ch8_fltex: 0ch8_h: 0ch8_l: 0ch8_rawVal: 906ch8_sp1: 0ch8_sp1_a: 0ch8_sp1_rawVal: 1000ch8_sp1_val: 100ch8_sp2: 0ch8_sp2_a: 0ch8_sp2_rawVal: 1000ch8_sp2_val: 100ch8_val: "90,6"coalface: 0description: "АГЗ"dt: 0fan_status: 0healthy: 1name_port: "COM3"r1: 1r2: 1r3: 1r4: 1short_description: "АГЗ"st: 0startfail: 0stopboth: 0timeexp: 0timeleft: 0timeset: 0
    */
    /*
    // Computed property names (ES2015)
    var i = 0;
    var a = {
      ["foo" + ++i]: i,
      ["foo" + ++i]: i,
      ["foo" + ++i]: i
    };

    console.log(a.foo1); // 1
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
    if (this.props.lastData[0] != null) { // if there exist data
      this.props.lastData.map((controllerRow) => {
        if (controllerRow['ContrName'] == id_controller) {
          // pull out data for sensor from sensor controller
          // apply filtering data
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