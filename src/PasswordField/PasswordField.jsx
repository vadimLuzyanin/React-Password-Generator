import React from 'react'
import { makeStyles } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useState } from 'react'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '150px',
    },
    textField: {
        minWidth: '250px',
        width: '70vw',
    },
    button: {
        minWidth: '250px',
        width: '50vw',
        height: '50px',
    },
    alert: {
        backgroundColor: 'cyan',
    }
})

const PasswordField = ({ passwordValue, generatePassword }) => {
    const classes = useStyles();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showCopyAlert, setShowCopyAlert] = useState(false);

    const handleClickShowPassword = () => {
        setIsPasswordVisible((prev) => !prev)
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
    };

    const handleCopy = () => {
        setShowCopyAlert(true)
    };

    const handleCloseCopyAlert = () => {
        setShowCopyAlert(false)
    }

    return (
        <Box className={classes.root}>
            <FormControl variant='outlined'>
                <InputLabel htmlFor="password">Here your password will appear</InputLabel>
                <Snackbar message='Password was copied to the clipboard' open={showCopyAlert} autoHideDuration={3000} onClose={handleCloseCopyAlert} />
                <OutlinedInput
                    startAdornment={
                        <CopyToClipboard text={passwordValue} onCopy={handleCopy}>
                            <Tooltip title='Click here to copy the password to clipboard' placement='left' arrow>
                                <InputAdornment position="start">
                                    <IconButton
                                        onMouseDown={handleMouseDown}
                                    >
                                        <FileCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            </Tooltip>
                        </CopyToClipboard>
                    }
                    id="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={passwordValue}
                    color='primary'
                    className={classes.textField}
                    label='here your password will appear'
                    endAdornment={
                        <InputAdornment position="end">
                            <Tooltip title='Show or hide the password'>
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDown}
                                >
                                    {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button variant='contained' color='secondary' className={classes.button} onClick={generatePassword}>Generate</Button>
        </Box >
    )
}

export default PasswordField
