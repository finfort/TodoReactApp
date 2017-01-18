import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class Signin extends Component {
    
    handleFormSubmit({email, password}){
        console.log(email, password);
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
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }

}

export default reduxForm({
    form: 'signin'
})(Signin);