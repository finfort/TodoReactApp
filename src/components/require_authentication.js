import React, { Component } from 'react';

export default function(ComposedComponent){ //hire order component Authentication(ResourcesComponent)
    class Authentication extends Component{

        render(){
            return <ComposedComponent {...this.props} />
        };
    }

    return Authentication;
}