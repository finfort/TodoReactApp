import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
    authButton() {
        if (this.props.authenticated) {
            return <button onClick={() => this.props.authenticate(false)} className="nav-item" >Sign Out</button>;
        } else {
            return <button onClick={() => this.props.authenticate(true)} className="nav-item">Sign In</button>;
        }
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                 <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                
                <a className="navbar-brand" href="/">Navbar</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className= "nav-link" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/resources" className= "nav-link" >Resources</Link>
                        </li>
                         <li className="nav-item">
                            <Link to="/todo" className= "nav-link" >Todo</Link>
                        </li>
                        <li className="nav-item">
                            {this.authButton()}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authenticated
    };
}
export default connect(mapStateToProps, actions)(Header);