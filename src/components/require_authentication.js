import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){ //hire order component const Composedcomponent = Authentication(ResourcesComponent)  <ComposedComponent />
    class Authentication extends Component{

        render(){
            console.log('rendering', this.props.authenticated);
            return <ComposedComponent {...this.props} />
        };
    }

    const mapStateToProps = (state, ownProps) => {
        return {
            authenticated: state.authenticated
        }
    }

    return connect(mapStateToProps)(Authentication);
}

