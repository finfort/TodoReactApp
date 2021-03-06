import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Header from '../header';

import * as actions from "../../actions";


class Signup extends Component {

    handleFormSubmit(formProps) {
        // call signup action creator        
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">{this.props.errorMessage}</div>
            );
        }
    }

    componentWillMount() {
        //clean error before
        this.props.authError('');
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <Header />
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label htmlFor="email" className="control-label">Email:</label>
                        <Field id="email" name="email" component={renderEmailField} />

                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="password" className="control-label">Password:</label>
                        <Field id="password" name="password" component={renderPasswordField} />

                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="passwordConfirm" className="control-label">Confirm password:</label>
                        <Field id="passwordConfirm" name="passwordConfirm" component={renderPasswordField} />
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign up</button>
                </form>
            </div>
        );
    }

}
const renderEmailField = (field) => (
    <div className="input-row">
        <input {...field.input} id={field.id} type="text" className="form-control" />
        {field.meta.touched && field.meta.error &&
            <span className="error">{field.meta.error}</span>}
    </div>
);
const renderPasswordField = (field) => (
    <div className="input-row">
        <input {...field.input} id={field.id} type="password" className="form-control" />
        {field.meta.touched && field.meta.error &&
            <span className="error">{field.meta.error}</span>}
    </div>
);

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password)
        errors.password = 'Required';

    if (!values.passwordConfirm)
        errors.passwordConfirm = 'Required';

    if (values.password !== values.passwordConfirm) {
        errors.password = "Passwords must match";
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.authentication.error };
}

Signup = reduxForm({ form: 'signup', validate })(Signup);
Signup = connect(mapStateToProps, actions)(Signup);

export default Signup;