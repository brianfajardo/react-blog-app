import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const FETCH_POST = 'FETCH_POST'

const ROOT_URL = 'https://reduxblog.herokuapp.com/api'
// Random unique key
const API_KEY = '?key=r3act_is_awesome'

export function fetchPosts() {
    // axios will resolve this Promise (middleware)
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function createPost(props) {
    // Pass properties with this post request
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props)

    return {
        type: CREATE_POST,
        payload: request
    }
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)

    return {
        type: FETCH_POST,
        payload: request
    }
}