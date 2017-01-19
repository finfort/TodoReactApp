import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
    authLink() {
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link to="/signout" className="nav-link" >Sign Out</Link>
                </li>
            );
        } else {
            return [
                <li className="nav-item" key={1}>
                    <Link to="/signin" className="nav-link">Sign In</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>];
        }
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link className="navbar-brand" to="/">Navbar</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/resources" className="nav-link" >Resources</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/todo" className="nav-link" >Todo</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link" >Users</Link>
                        </li>

                        
                        {this.authLink()}
                        
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.authentication.authenticated
    }
}
export default connect(mapStateToProps, actions)(Header);