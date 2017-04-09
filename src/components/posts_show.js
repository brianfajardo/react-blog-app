import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchPost } from '../actions/index'
import { deletePost } from '../actions/index'

class PostShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount() {
        // params.id is off of the URL and we pass it to fetchPost to retrieve from the server
        this.props.fetchPost(this.props.params.id)
    }

    onDeleteClick() {
        // Delete post and return the user to index
        this.props.deletePost(this.props.params.id)
            .then(() => {
                this.context.router.push('/')
            })
    }

    render() {
        // A way to add a spinner (like AJAX) to indicate data is still being fetched
        if (!this.props.post) {
            return <div>Loading sucks...</div>
        }

        const { title, categories, content } = this.props.post

        return (
            <div>
                <Link to='/'>Return to home</Link>
                <button onClick={this.onDeleteClick.bind(this)}
                    className='btn btn-danger pull-xs-right'>
                    Delete
                </button>
                <h1>{title}</h1>
                <h4>Categories: {categories}</h4>
                <p>{content}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({ post: state.posts.post })


export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow)