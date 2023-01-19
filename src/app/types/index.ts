export type OpenAICompletionsPrompt = {
    model: string
    prompt: string
    temperature?: number
    max_tokens?: number
    top_p?: number
    frequency_penalty?: number
    presence_penalty?: number
    stop: Array<string>
}

export type Davinic003Choice = {
    prompt?: string
    text: string
    index: number
    logprobs: any
    finish_reason: string
}

export type LocalStorageKeys = keyof LocalStorage

export interface LocalStorage {
    choices?: Davinic003Choice[]
    options?: LocalStorageOptions
}

export interface LocalStorageOptions {
    hasAutoOverlay: boolean
    homeCity: string
}
