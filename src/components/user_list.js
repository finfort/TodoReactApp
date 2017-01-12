import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import * as actions from '../actions';

class UserList extends Component {
    componentWillMount() {
        this.props.fetch_users();
    }

    renderUser(user) {
        return(
        <div className="card card-block">
            <h4 className="card-title">{user.name}</h4>
            <p className="card-text">user.text</p>
            <button className="btn btn-primary">website</button>
        </div>
        );
    }

    render() {
        return (
            <div >
                <Header />
                    <div className="user-list">{this.props.users.map(this.renderUser)}</div>
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