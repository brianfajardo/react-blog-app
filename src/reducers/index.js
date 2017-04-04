import { combineReducers } from 'redux'

import PostsReducer from './reudcer_posts'

const rootReducer = combineReducers({
  posts: PostsReducer
});

export default rootReducer;
