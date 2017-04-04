import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
// Random unique key
const API_KEY = '?key=gentlebreeze0000'

export function fetchPosts() {
    // axios will resolve this Promise (middleware)
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

    return {
        type: FETCH_POSTS,
        payload: request
    }
}