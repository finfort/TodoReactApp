import React, { Component } from 'react';
import { connect } from 'react-redux';

/** 
 * The HOC component to require jwt 
 * @type {function(ComposedComponent) } 
 */
export default function (ComposedComponent) { //hire order component const Composedcomponent = Authentication(ResourcesComponent)  <ComposedComponent />
    Authentication.contextTypes = { // class level property(static) //static contextTypes = { // class level property(static)
        router: React.PropTypes.object
    };
    //how to replace it this.context not stable api?
    // for getting access in this.context
    class Authentication extends Component {




        // check if user authenticated if not push to /
        componentWillMount() {
            if (!this.props.authenticated)
                this.context.router.push('/');
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated)
                this.context.router.push('/');
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = (state) => {
        return {
            authenticated: state.authentication.authenticated
        };
    };

    return connect(mapStateToProps)(Authentication);
}

