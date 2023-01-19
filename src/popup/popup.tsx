import './popup.css'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'app/theme'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FarabiAvatar from 'components/FarabiAvatar'
import Icon from 'components/Icon'
import FeedbackCard from 'components/FeedbackCard'
import ChatWidget from 'components/ChatWidget'
import * as STORAGE from 'app/storage'

const App: React.FC<{}> = () => {
    const [monitor, setMonitor] = useState<boolean>(false)
    const [choices, setChoices] = useState<any>(null)
    const feedBackContainer = useRef(null)

    const getChoicesFromStorage = async () => {
        const choicesFromStorage = await STORAGE.getLocalStorage('choices')
        if (choicesFromStorage) {
            console.log(choicesFromStorage)
            setChoices(choicesFromStorage)
        }
    }

    useEffect(() => {
        getChoicesFromStorage()
    }, [])

    return (
        <Box className="container">
            <Box className="header">
                <Box className="header-content">
                    <FarabiAvatar />
                    <Box className="menu-bar">
                        <Box className="menu-item">
                            <Icon
                                icon={monitor ? 'stop' : 'play'}
                                color={monitor ? 'error' : 'success'}
                                onClick={() => setMonitor(!monitor)}
                                fontSize="medium"
                            />
                        </Box>
                        <Box className="menu-item">
                            <Icon
                                icon="clear"
                                color="warning"
                                fontSize="medium"
                            />
                        </Box>
                        <Box className="menu-item">
                            <Icon
                                icon="settings"
                                color="primary"
                                fontSize="medium"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>

            <ChatWidget
                setChoices={setChoices}
                feedBackContainer={feedBackContainer}
            />

            {choices && choices.length !== 0 ? (
                <Box className="feed-container" ref={feedBackContainer}>
                    {choices.reverse().map(feed => (
                        <FeedbackCard
                            key={feed.id}
                            {...feed}
                            setChoices={setChoices}
                            feedBackContainer={feedBackContainer}
                        />
                    ))}
                </Box>
            ) : (
                <Box className="no-feed-container">
                    <Typography
                        color={monitor ? '#66bb6a' : 'error'}
                        variant="body2"
                    >
                        {monitor
                            ? 'Farabi is reading your feed.'
                            : `Farabi isn't reading your feed.`}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

const rootElement = document.createElement('div')
document.body.append(rootElement)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
)
