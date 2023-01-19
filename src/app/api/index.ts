import axios from 'app/axios'
import * as TYPES from 'app/types'

export const getOpenAICompletions = async (
    prompt: TYPES.OpenAICompletionsPrompt
) => {
    return axios
        .post('/completions', prompt)
        .then(response => response)
        .catch(error => error)
}
