import React, { Component } from 'react'

import { reduxForm } from 'redux-form'

class PostCreate extends Component {
    render() {
        const { fields: { title, categories, content }, handleSubmit } = this.props

        return (
            // handleSubmit is an injected prop from redux-form
            // this function tells redux-form the user is trying to submit this form and that it should check for validation
            <form onSubmit={handleSubmit}>
                <h3>Create a Post!</h3>

                <div className='form-group'>
                    <label>Title</label>
                    {/*Destructuring the object 'title' from props and passing it into this input */}
                    {/*Instead of formProps={title} --> this.form.formProps.PROPERTY/METHOD*/}
                    <input type='text' className='form-control' {...title} />
                </div>

                <div className='form-group'>
                    <label>Categories</label>
                    <input type='text' className='form-control' {...categories} />
                </div>

                <div className='form-group'>
                    <label>Content</label>
                    <textarea className='form-control'{...content} />
                </div>

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        )
    }
}

// Similar to connect function from react-redux library
// Giving redux-form instructions
// redux-form also injects props into our component -> console.log(this.props) in component
export default reduxForm({
    form: 'PostCreate',
    fields: ['title', 'categories', 'content']
})(PostCreate)

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