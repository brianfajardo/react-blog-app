import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import PostIndex from './components/posts_index'
import PostCreate from './components/posts_create'

export default (
    <Route path='/' component={App}>
        <IndexRoute component={PostIndex} />
        <Route path='posts/new' component={PostCreate} />
    </Route>
)
