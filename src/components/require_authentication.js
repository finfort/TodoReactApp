import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){ //hire order component const Composedcomponent = Authentication(ResourcesComponent)  <ComposedComponent />
    class Authentication extends Component{

        static contextTypes = { // class level property(static)
            router: React.PropTypes.object
        }; // for getting access in this.context
        //how to replace it this.context not stable api?

        // check if user authenticated if not push to /
        componentWillMount(){
            if(!this.props.authenticated)
                this.context.router.push('/');
        }

        componentWillUpdate(nextProps){
            if(!nextProps.authenticated)
                this.context.router.push('/');
        }

        render(){
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

