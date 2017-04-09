import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import _ from 'lodash'

import { createPost } from '../actions/index'

// Refactor ['title', 'categories', 'content']
// Create a top-level constant that has the configuration of the fields within form
const FIELDS = {
    title: {
        type: 'input',
        label: 'Creative title'
    },
    categories: {
        type: 'input',
        label: 'Related category tags'
    },
    content: {
        type: 'textarea',
        label: 'Post content'
    }
}

class PostCreate extends Component {
    // Want access off a property on a parent component and declare it in this component
    // Avoid context in general, only should use with Router
    static contextTypes = {
        // Tells this component to expect an object to be available over context
        router: PropTypes.object
    }

    // Props are from the form (title, categories, content)
    onSubmit(props) {
        // createPost is an axios request (Promise), redux-promise resolves and therefore we can continue to chain methods onto it
        this.props.createPost(props)
            .then(() => {
                // Blog post created, navigate user to index
                // Note: only when blog post is successfully created do we go to this step
                // Navigate by calling this.context.router.push with the new path
                this.context.router.push('/')
            })
    }

    // renderField takes a field config object (type and label)
    // Returns a rendered field
    renderField(fieldConfig, field) {
        // fieldHelper provided by redux-form
        // One helper for each field that is declared in the reduxForm function below
        const fieldHelper = this.props.fields[field]

        return (
            // if conditions are true, renders error as red (BootStrap!)
            <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
                <label>{fieldConfig.label}</label>
                {/*Destructuring the object 'title' from props and passing it into this input*/}
                {/*Instead of formProps={title} --> this.form.formProps.PROPERTY/METHOD*/}
                <fieldConfig.type type='text' className='form-control' {...fieldHelper} />
                {/*touch is a property that is false until the user touches the field in some way.*/}
                {/*Gates whether the error is displayed/rendered onto the DOM*/}
                {/*If touched and invalid, render error*/}
                <div className='text-help'>{fieldHelper.touched ? fieldHelper.error : ''}</div>
            </div >
        )
    }

    render() {
        // Picking properties off this.props with ES6 destructuring
        const { handleSubmit } = this.props

        return (
            // handleSubmit is an injected prop from redux-form
            // this function tells redux-form the user is trying to submit this form and that it should check for validation
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a Post!</h3>

                {/*need to bind(this) because we are making reference to props inside of the renderField function*/}
                {_.map(FIELDS, this.renderField.bind(this))}

                <Link to='/' className='btn btn-danger'>
                    Cancel
                </Link>

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        )
    }
}

// values are the values of the inputs controlled by redux-form
// if the object has a key that matches 1 of our field names and has a value that is truthy associated with it, redux-form assumes it is invalid -> prevent submission
const validate = values => {
    const errors = {}

    // Replace seperate if statements with a more robust and condensed method
    _.each(FIELDS, (type, field) => {
        if (!values[field]) {
            errors[field] = `Enter ${field}`
        }
    })

    return errors
}

// Similar to connect function from react-redux library
// Giving redux-form instructions
// redux-form also injects props into our component

// ** redux-form has the same behavior as connect, except redux-form has 1 additional argument (the configuration object)
// connect: (mapStateToProps, mapDispatchToProps)
// reduxForm: (form config, mapStateToProps, mapDispatchToProps)
export default reduxForm({
    form: 'PostCreate',
    // fields needs to be an array of strings
    // Use lodash keys method which will return an array of all the different keys on the fields config object
    fields: _.keys(FIELDS),
    validate
}, null, { createPost })(PostCreate)

// Whenever we make changes to any of these fields/inputs, reduxForm sets the new value on the global application state
// redux-form elevates this component state to application level state
// Behind the scenes it'll look something like this...
// state === {
//     form: {
//         PostCreate: {
//             title: '...',
//             categories: '...',
//             content: '...'
//         }
//     }
// }