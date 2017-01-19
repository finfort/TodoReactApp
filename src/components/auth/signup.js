import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from "../../actions";


class Signup extends Component {

    handleFormSubmit() {
        // this.props.signinUser({ email, password });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }



    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label htmlFor="email" className="control-label">Email:</label>
                    <Field id="email" name="email" component="input" type="email" className="form-control" placeholder="Input email" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password" className="control-label">Password:</label>
                    <Field id="password" name="password" component="input" type="password" className="form-control" placeholder="Input password" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="passwordConfirm" className="control-label">Confirm password:</label>
                    <Field id="passwordConfirm" name="passwordConfirm" component="input" type="password" className="form-control" placeholder="Input password" />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
        );
    }

}

function validate(formProps) {
    const errors = {};

    console.log(formProps);

    return errors;
}

Signup = reduxForm({ form: 'signup', validate })(Signup);


export default Signup