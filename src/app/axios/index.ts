import axios from 'axios'
import * as CONSTANTS from 'app/constants'

const instance = axios.create({
    baseURL: `${CONSTANTS.API_URL}/v1`,
})

instance.defaults.headers.common[
    'Authorization'
] = `Bearer ${CONSTANTS.OPENAI_API_KEY}`

export default instance
