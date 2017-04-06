import { FETCH_POSTS, FETCH_POST } from '../actions/index'

// all - an array of blog posts from our index route
// post: null - individual posts
const INITIAL_STATE = { all: [], post: null }

// Initial state is an object
// If we don't get an action that the reducer cares about it'll just return state
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POST:
            // Keep existing state, however, update the individual post
            return { ...state, post: action.payload.data }
        case FETCH_POSTS:
            // Take the current state and add the resolved action payload data (all blog posts)
            // Reducer needs to return a new object (not a Promise) whenever we return our updated state
            // Note: we use the spread operator in order to avoid mutating state!
            return { ...state, all: action.payload.data }
        default:
            return state
    }
}