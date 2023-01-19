import './contentScript.css'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'app/theme'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import * as STORAGE from 'app/storage'
import * as MSGS from 'app/messages'

const App: React.FC<{}> = () => {
    const isActive = false

    useEffect(() => {
        console.log('hello from content script')
    }, [])

    return (
        <>
            {isActive && (
                <Card className="overlayCard">
                    <Typography>Hello</Typography>
                </Card>
            )}
        </>
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
