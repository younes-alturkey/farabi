import './Icon.css'
import React from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import ErrorIcon from '@mui/icons-material/Error'
import HelpIcon from '@mui/icons-material/Help'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import DeleteIcon from '@mui/icons-material/Delete'
import ShareIcon from '@mui/icons-material/Share'
import ReplyIcon from '@mui/icons-material/Reply'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import WarningIcon from '@mui/icons-material/Warning'
import PercentIcon from '@mui/icons-material/Percent'
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import PhishingIcon from '@mui/icons-material/Phishing'
import CircularProgress from '@mui/material/CircularProgress'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import ChatIcon from '@mui/icons-material/Chat'

export default function Icon(props) {
    return (
        <ButtonBase
            sx={{ borderRadius: '999px', ...props.containerStyle }}
            className={props.containerClassName}
            centerRipple={props.centerRipple}
            disabled={props.disabled || props.loading}
            disableRipple={props.disableRipple}
            onClick={props.onClick}
        >
            <Tooltip title={props.tip} placement="bottom" arrow>
                <Box className="icon-container">
                    {props.text && (
                        <Typography variant="body1" color="secondary">
                            {props.text}
                        </Typography>
                    )}
                    {props.loading ? (
                        <CircularProgress size={24} color={props.color} />
                    ) : (
                        getIcon({
                            ...props,
                            icon: props.confirmed ? 'confirmed' : props.icon,
                        })
                    )}
                </Box>
            </Tooltip>
        </ButtonBase>
    )
}

const getIcon = props => {
    switch (props.icon) {
        case 'settings':
            return (
                <SettingsIcon color={props.color} fontSize={props.fontSize} />
            )
        case 'logout':
            return <LogoutIcon color={props.color} fontSize={props.fontSize} />
        case 'play':
            return (
                <PlayArrowIcon color={props.color} fontSize={props.fontSize} />
            )
        case 'stop':
            return <StopIcon color={props.color} fontSize={props.fontSize} />
        case 'delete':
            return <DeleteIcon color={props.color} fontSize={props.fontSize} />
        case 'copy':
            return (
                <ContentCopyIcon
                    color={props.color}
                    fontSize={props.fontSize}
                />
            )
        case 'share':
            return <ShareIcon color={props.color} fontSize={props.fontSize} />
        case 'scam':
            return (
                <PhishingIcon color={props.color} fontSize={props.fontSize} />
            )
        case 'ignore':
            return (
                <RemoveCircleIcon
                    color={props.color}
                    fontSize={props.fontSize}
                />
            )
        case 'bully':
            return <MoodBadIcon color={props.color} fontSize={props.fontSize} />
        case 'conversation':
            return (
                <QuestionAnswerIcon
                    color={props.color}
                    fontSize={props.fontSize}
                />
            )
        case 'ad':
            return (
                <FeaturedVideoIcon
                    color={props.color}
                    fontSize={props.fontSize}
                />
            )
        case 'news':
            return (
                <NewspaperIcon color={props.color} fontSize={props.fontSize} />
            )
        case 'post':
            return <ChatIcon color={props.color} fontSize={props.fontSize} />
        case 'reply':
            return <ReplyIcon color={props.color} fontSize={props.fontSize} />
        case 'clear':
            return (
                <ClearAllIcon color={props.color} fontSize={props.fontSize} />
            )
        case 'what':
            return (
                <QuestionMarkIcon
                    color={props.color}
                    fontSize={props.fontSize}
                />
            )
        case 'confirmed':
            return <DoneAllIcon color={props.color} fontSize={props.fontSize} />
        case 'danger':
            return <WarningIcon color={props.color} fontSize={props.fontSize} />
        case 'percent':
            return <PercentIcon color={props.color} fontSize={props.fontSize} />
        case 'help':
            return <HelpIcon color={props.color} fontSize={props.fontSize} />
        default:
            return <ErrorIcon color={props.color} fontSize={props.fontSize} />
    }
}
