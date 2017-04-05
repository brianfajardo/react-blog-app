import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import PostsReducer from './reducer_posts'

const rootReducer = combineReducers({
  posts: PostsReducer,
  // redux-form, always set key as 'form' --> elevating form to application state level
  form: formReducer
});

export default rootReducer;
