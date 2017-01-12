import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){ //hire order component const Composedcomponent = Authentication(ResourcesComponent)  <ComposedComponent />
    class Authentication extends Component{

        static contextTypes = { // class level property(static)
            router: React.PropTypes.object
        }; // for getting access in this.context

        componentWillMount(){
            if(!this.props.authenticated)
                this.context.router.push('/');
        }

        componentWillUpdate(nextProps){
            if(!nextProps.authenticated)
                this.context.router.push('/');
        }

        render(){
            //console.log('rendering', this.context );
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

