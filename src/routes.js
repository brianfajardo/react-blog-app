import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import PostIndex from './components/posts_index'
import PostCreate from './components/posts_create'
import PostShow from './components/posts_show'

export default (
    <Route path='/' component={App}>
        <IndexRoute component={PostIndex} />
        <Route path='posts/new' component={PostCreate} />
        {/* :id is a dynamic route param --> this.props.params.id */}
        <Route path='posts/:id' component={PostShow} />
    </Route>
)
