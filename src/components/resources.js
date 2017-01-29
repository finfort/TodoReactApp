import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Resources extends Component {
    componentWillMount() {
        this.props.fetchMessage();
    }


    render() {
        return (<div>
            Super context
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            {this.props.message}
        </div>);
    }
}
function mapStateToProps(state) {
    return {
        message: state.home.message
    };
}

Resources = connect(mapStateToProps, actions)(Resources);//eslint-disable-line

export default Resources;