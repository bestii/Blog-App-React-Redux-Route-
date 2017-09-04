import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
class PostNew extends Component {
    // {...field.input} is used to wireup the event handllers to the input its a short hand for onChange=field.input.onChange so on..
    renderField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {field.meta.error}
            </div>
        );
    }
    onSubmit(values) {
        console.log(values)
    }
    // The field attribute doesn't know how to render UI for the element it only checks the under the hood functionalities
    // It calls a function that contains a JSX blob to render the UI(this function is automically called so we dont hav eto call it explicitly)
    render() {
        // Reduxform returns a handler function after wiring up this function performs the redux side of validation and other stuff
        const { handleSubmit } = this.props;
        return (
            // onSubmit we are calling the handler function from ReduxForm which as a callback calls our onSubmit function if,
            // everything is satisfied and the form is ready to submit.
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    // values --> { title:'value', categories:'value', content:'value'}
    var errors = {};
    //validate the input from the values
    if (!values.title) {
        errors.title = "Please enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Please enter a categories!";
    }
    if (!values.content) {
        errors.content = "Please enter a content!";
    }
    //if erros object is empty, fine to submit
    //if errors object has any values redux assumes form is inavlid and not fine to submit
    return errors;
};

export default reduxForm({
    validate,
    // Unique name for our form
    form: 'PostNewForm'
})(PostNew);