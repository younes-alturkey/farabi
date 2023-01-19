import * as CONSTANTS from 'app/constants'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    organization: CONSTANTS.OPENAI_ORG_ID,
    apiKey: CONSTANTS.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default openai
