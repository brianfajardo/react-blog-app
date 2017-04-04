import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchPosts } from '../actions/index'

class PostIndex extends Component {
    // Lifecycle method
    // React calls this automatically whenever component will be rendered to the DOM for the FIRST time
    // In anticipation of the component mounting, React will "react" by fetching data
    componentWillMount() {
        this.props.fetchPosts()
    }
    render() {
        return (
            <div>
                <div className='text-xs-right'>
                    {/*Link creates an anchor tag with href pointing to /posts/new*/}
                    <Link to='/posts/new' className='btn btn-primary'>
                        Create Post
                    </Link>
                </div>
                List of blog posts
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ fetchPosts }, dispatch)
// }

// Quick little shortcut with ES6 syntax to replace writing mapDispatchToProps function
export default connect(null, { fetchPosts })(PostIndex)