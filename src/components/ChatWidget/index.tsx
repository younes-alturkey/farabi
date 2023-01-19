import './ChatWidget.css'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import ButtonBase from '@mui/material/ButtonBase'
import CircularProgress from '@mui/material/CircularProgress'
import bhrMark from 'static/mark-secondary.svg'
import uuid4 from 'uuid4'
import * as TYPES from 'app/types'
import * as API from 'app/api'
import * as STORAGE from 'app/storage'
import * as UTILS from 'app/utils'
import * as CONSTANTS from 'app/constants'

export default function ChatWidget(props) {
    const [query, setQuery] = useState('')
    const [asking, setAsking] = useState(false)

    const askDavinci003HowHeIs = async question => {
        const prompt: TYPES.OpenAICompletionsPrompt = {
            model: 'text-davinci-003',
            prompt: `${CONSTANTS.MODEL_SETTING}\n\nQ:${question}\nA:`,
            temperature: 0,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ['\n'],
        }
        const davinci003Response = await API.getOpenAICompletions(prompt)
        let choices = davinci003Response.data.choices
        choices = choices.map(choice => ({
            ...choice,
            id: uuid4(),
            date: Date.now(),
            prompt: question,
        }))

        let newChoices = choices
        const currChoices = await STORAGE.getLocalStorage('choices')
        if (currChoices) {
            newChoices = [...currChoices, ...choices]
        }

        const vals: TYPES.LocalStorage = {
            choices: newChoices,
        }
        props.setChoices(newChoices)
        STORAGE.setLocalStorage(vals)
        props.feedBackContainer.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }

    const onSubmit = async e => {
        e.preventDefault()
        if (query) {
            setAsking(true)
            await askDavinci003HowHeIs(query)
            setAsking(false)
            setQuery('')
        }
    }
    return (
        <form className="form" onSubmit={onSubmit}>
            <TextField
                name="question-box"
                className="form-input"
                label="Ask Farabi"
                variant="filled"
                multiline
                maxRows={8}
                value={query}
                onChange={e => setQuery(e.target.value)}
                inputProps={{
                    style: {
                        fontSize: 12,
                        paddingRight: '2.5rem',
                    },
                }}
            />

            <ButtonBase
                type="submit"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '0.2rem',
                    transform: 'translate(-0.2rem, -50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '999px',
                    borderWidth: '2px',
                    borderColor: asking ? '#1EA3A6' : '#2a2d4c',
                    borderStyle: 'solid',
                    backgroundColor: asking
                        ? '#2a2d4c'
                        : !UTILS.isValidQuery(query)
                        ? '#f44336'
                        : '#66bb6a',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                centerRipple={true}
                disabled={asking || !UTILS.isValidQuery(query)}
            >
                {asking ? (
                    <CircularProgress size={16} color="primary" />
                ) : (
                    <img src={bhrMark} alt="Bhr logo mark" width={16} />
                )}
            </ButtonBase>
        </form>
    )
}
