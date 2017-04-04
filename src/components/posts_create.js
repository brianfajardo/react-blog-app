import React, { Component } from 'react'

import { reduxForm } from 'redux-form'

class PostCreate extends Component {
    render() {
        return (
            <form>
                <h3>Create a Post!</h3>
                <div className='form-group'>
                    <label>Title</label>
                    <input type='text' className='form-control' />
                </div>
                <div className='form-group'>
                    <label>Categories</label>
                    <input type='text' className='form-control' />
                </div>
                <div className='form-group'>
                    <label>Content</label>
                    <textarea className='form-control' />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        )
    }
}

// Similar to connect function from react-redux library
// Giving reduxForm instructions
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