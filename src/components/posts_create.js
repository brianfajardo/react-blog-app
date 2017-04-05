import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'

import { createPost } from '../actions/index'

class PostCreate extends Component {
    render() {
        // Picking properties off this.props with ES6 destructuring
        const { fields: { title, categories, content }, handleSubmit } = this.props

        return (
            // handleSubmit is an injected prop from redux-form
            // this function tells redux-form the user is trying to submit this form and that it should check for validation
            <form onSubmit={handleSubmit(this.props.createPost)}>
                <h3>Create a Post!</h3>

                {/*if conditions are true, renders error as red (BootStrap!)*/}
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    {/*Destructuring the object 'title' from props and passing it into this input */}
                    {/*Instead of formProps={title} --> this.form.formProps.PROPERTY/METHOD*/}
                    <input type='text' className='form-control' {...title} />
                    {/*touch is a property that is false until the user touches the field in some way.*/}
                    {/*Gates whether the error is displayed/rendered onto the DOM*/}
                    {/*If touched and invalid, render error*/}
                    <div className='text-help'>{title.touched ? title.error : ''}</div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type='text' className='form-control' {...categories} />
                    <div className='text-help'>{categories.touched ? categories.error : ''}</div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea className='form-control'{...content} />
                    <div className='text-help'>{content.touched ? content.error : ''}</div>
                </div>

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
function validate(values) {
    const errors = {}

    if (!values.title) {
        errors.title = 'Give your post a title!'
    }
    if (!values.categories) {
        errors.categories = 'Enter categories your post falls under'
    }
    if (!values.content) {
        errors.content = 'Write something! :^)'
    }

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
    fields: ['title', 'categories', 'content'],
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