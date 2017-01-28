import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as Helper from './helper';

class Mine extends Component {
    componentWillMount() {
        this.setState({
            // route components are rendered with useful information, like URL params
            mine: Helper.findMinebyId(this.props.params.mineId)
        });
    }


    render() {
        return (
            <div>
                <button onClick={browserHistory.goBack}>Go Back</button>
                <h2>{
                    this.state.mine.mineName
                }</h2>
            </div>
        );
    }
}

export default Mine;