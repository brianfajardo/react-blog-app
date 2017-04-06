import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPost } from '../actions/index'

class PostShow extends Component {
    componentWillMount() {
        // params.id is off of the URL and we pass it to fetchPost to retrieve from the server
        this.props.fetchPost(this.props.params.id)
    }

    render() {
        // A way to add a spinner (like AJAX) to indicate data is still being fetched
        if (!this.props.post) {
            return <div>Fetching post...</div>
        }

        // Note, below declarations could not before above if statement, would result in error of undefined if !this.props.post
        const { title, categories, content } = this.props.post

        return (
            <div>
                <h3>{title}</h3>
                <h6>Categories: {categories}</h6>
                <p>{content}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost })(PostShow)