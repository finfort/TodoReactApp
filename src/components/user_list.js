import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import * as actions from '../actions';

class UserList extends Component {
    componentWillMount() {
        this.props.fetch_users();
    }

    renderUser(user) {
        console.log('user', user.name);
        <div className="card card-block">
            <h4 className="card-title">{user.name}</h4>
            <p className="card-text">user.text</p>
            <a className="btn btn-primary">website</a>
        </div>
    }

    render() {
        return (
            <div>
                <Header />
                {this.props.users.map(this.renderUser)}
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, actions)(UserList)