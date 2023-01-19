import './FeedbackCard.css'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Icon from 'components/Icon'
import moment from 'moment'
import { palette } from 'app/theme'
import * as TYPES from 'app/types'
import * as API from 'app/api'
import * as STORAGE from 'app/storage'
import uuid4 from 'uuid4'
import * as UTILS from 'app/utils'
import * as CONSTANTS from 'app/constants'

export default function FeedbackCard(props) {
    console.log(props.date)
    console.log(moment(props.date))
    return (
        <Box className="feedback-root-container">
            <Box className="badges-container">
                {getBadge('scam')}
                {getBadge('ad')}
                {getBadge('news')}
                {getBadge('bully')}
                {getBadge('post')}
                {getBadge('conversation')}
                {getBadge(
                    'percent',
                    UTILS.extractAzzuracyPercentage(props.text)
                )}
            </Box>

            <Box className="prompt-container">
                <Typography
                    variant="body2"
                    color="secondary"
                    sx={{ fontWeight: 'bold' }}
                >
                    {props.prompt}
                </Typography>
            </Box>
            <Box className="feedback-container">
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{ fontWeight: 'medium' }}
                >
                    {props.text.split('****')[0]}
                </Typography>
            </Box>

            <Box className="actions">
                <Box className="actions-container">
                    {getActionButton('delete', props)}
                    {getActionButton('copy', props)}
                    {getActionButton('what', props)}
                    {getActionButton('share', props)}
                </Box>
                <Typography
                    variant="caption"
                    color="secondary"
                    sx={{ fontSize: 10 }}
                >
                    {moment(props.date).fromNow()}
                </Typography>
            </Box>
        </Box>
    )
}

const getBadge = (type = 'unknown', text?) => {
    switch (type) {
        case 'scam':
            return (
                <Box className="badge-item">
                    <Icon
                        icon="scam"
                        color="error"
                        fontSize="small"
                        disableRipple={true}
                        tip="Scam"
                    />
                </Box>
            )
        case 'warning':
            return (
                <Box className="badge-item">
                    <Icon
                        icon="warning"
                        color="warning"
                        fontSize="small"
                        disableRipple={true}
                        tip="Caution!"
                    />
                </Box>
            )
        case 'news':
            return (
                <Box className="badge-item">
                    <Icon
                        icon="news"
                        color="secondary"
                        fontSize="small"
                        disableRipple={true}
                        tip="News"
                    />
                </Box>
            )
        case 'post':
            return (
                <Box className="badge-item">
                    <Icon
                        icon="post"
                        color="secondary"
                        fontSize="small"
                        disableRipple={true}
                        tip="Post"
                    />
                </Box>
            )
        case 'conversation':
            return (
                <Box className="badge-item">
                    <Icon
                        icon="conversation"
                        color="secondary"
                        fontSize="small"
                        disableRipple={true}
                        tip="Conversation"
                    />
                </Box>
            )
        case 'ad':
            return (
                <Box className="badge-item">
                    <Icon
                        icon="ad"
                        color="warning"
                        fontSize="small"
                        disableRipple={true}
                        tip="Advert"
                    />
                </Box>
            )
        case 'ignore':
            return (
                <Box className="badge-item">
                    <Icon
                        icon="ignore"
                        color="error"
                        fontSize="small"
                        disableRipple={true}
                        tip="Cyberbully"
                    />
                </Box>
            )
        case 'bully':
            return (
                <Box className="badge-item">
                    <Icon
                        icon="bully"
                        color="error"
                        fontSize="small"
                        disableRipple={true}
                        tip="Cyberbully"
                    />
                </Box>
            )
        case 'percent':
            return (
                <Box className="badge-item">
                    <Icon
                        icon="percent"
                        color="secondary"
                        fontSize="small"
                        disableRipple={true}
                        text={text}
                        tip="Accuracy"
                    />
                </Box>
            )
        default:
            return (
                <Box className="badge-item">
                    <Icon
                        icon={type}
                        color="error"
                        fontSize="small"
                        disableRipple={true}
                        tip="Hmm.."
                    />
                </Box>
            )
    }
}

const getActionButton = (type = 'unknown', props) => {
    const [copied, setCopied] = useState(false)
    const [shared, setShared] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [elaborating, setElaborating] = useState(false)

    const handleDeleteFeedback = async () => {
        setDeleting(true)
        const feedBackID = props.id
        const choicesFromStorage = await STORAGE.getLocalStorage('choices')
        if (choicesFromStorage) {
            const updatedChoices = choicesFromStorage.filter(
                choice => choice.id !== feedBackID
            )

            const vals: TYPES.LocalStorage = {
                choices: updatedChoices,
            }
            props.setChoices(updatedChoices)
            STORAGE.setLocalStorage(vals)
        }
    }

    const handleCopyToClipBoard = () => {
        setCopied(true)
        navigator.clipboard.writeText(props.text)
        setTimeout(() => setCopied(false), 3000)
    }

    const handleCopyShareText = () => {
        setShared(true)
        const text = `Here's an interaction I had with OpenAI's model:\n\nMe: ${props.prompt}\n\nDavinci003: ${props.text}\n\n\nDownload Farabi browser extention from: https://bhr.sa`
        navigator.clipboard.writeText(text)
        setTimeout(() => setShared(false), 3000)
    }

    const handleAskDavinciToElaborate = async () => {
        setElaborating(true)
        const prompt: TYPES.OpenAICompletionsPrompt = {
            model: 'text-davinci-003',
            prompt: `${CONSTANTS.MODEL_SETTING}\n\nQ:I asked you earlier this question, ${props.prompt}, and you said ${props.text}, can you explain what you meant?\nA:`,
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
            prompt: props.prompt,
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

        await handleDeleteFeedback()
        setElaborating(false)

        props.feedBackContainer.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }

    switch (type) {
        case 'delete':
            return (
                <Box
                    className="action-item pushable"
                    sx={{
                        borderColor: palette.error.main,
                        backgroundColor: 'rgba(225, 0, 0, 0.2)',
                    }}
                    onClick={handleDeleteFeedback}
                >
                    <Icon
                        icon="delete"
                        color="error"
                        fontSize="medium"
                        tip="Delete"
                        loading={deleting}
                    />
                </Box>
            )
        case 'reply':
            return (
                <Box
                    className="action-item pushable"
                    sx={{
                        borderColor: palette.secondary.main,
                        backgroundColor: 'rgba(42, 45, 76, 0.2)',
                    }}
                >
                    <Icon
                        icon="reply"
                        color="secondary"
                        fontSize="medium"
                        tip="Elaborate"
                    />
                </Box>
            )
        case 'copy':
            return (
                <Box
                    className="action-item pushable"
                    sx={{
                        borderColor: palette.primary.main,
                        backgroundColor: 'rgba(30, 163, 166, 0.2)',
                    }}
                    onClick={handleCopyToClipBoard}
                >
                    <Icon
                        icon="copy"
                        color="primary"
                        fontSize="medium"
                        tip="Copy"
                        disabled={copied}
                        confirmed={copied}
                    />
                </Box>
            )
        case 'share':
            return (
                <Box
                    className="action-item pushable"
                    sx={{
                        borderColor: palette.secondary.main,
                        backgroundColor: 'rgba(42, 45, 76, 0.2)',
                    }}
                    onClick={handleCopyShareText}
                >
                    <Icon
                        icon="share"
                        color="secondary"
                        fontSize="medium"
                        tip="Share"
                        disabled={shared}
                        confirmed={shared}
                    />
                </Box>
            )
        case 'what':
            return (
                <Box
                    className="action-item pushable"
                    sx={{
                        borderColor: palette.warning.main,
                        backgroundColor: 'rgba(255, 167, 38, 0.2)',
                    }}
                    onClick={handleAskDavinciToElaborate}
                >
                    <Icon
                        icon="what"
                        color="warning"
                        fontSize="medium"
                        tip="Elaborate"
                        loading={elaborating}
                    />
                </Box>
            )
        default:
            return (
                <Box
                    className="action-item pushable"
                    sx={{
                        borderColor: palette.error.main,
                        backgroundColor: 'rgba(225, 0, 0, 0.1)',
                    }}
                >
                    <Icon icon={type} color="error" fontSize="medium" />
                </Box>
            )
    }
}
