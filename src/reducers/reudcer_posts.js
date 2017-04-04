import { FETCH_POSTS } from '../actions/index'

// all - an array of blog posts from our index route
// post: null - individual posts
const INITIAL_STATE = { all: [], post: null }

// Initial state is an object
// If we don't get an action that the reducer cares about it'll just return state
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS:

        default:
            return state
    }
}