import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    passwordLengthField: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: '25px',
        marginBottom: '25px',
    },
    slider: {
        minWidth: '250px',
        width: '50vw',
    },
    passwordLengthInput: {
        width: '50px'
    },
    setsOfSymbols: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: '25px',
    },
    extraSymbolsField: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '25px'
    },
    extraSymbolsInput: {
        width: '99%'
    },
    extraSymbolsButton: {
        width: '10%'
    },
})

const SettingsForm = ({ formState, setFormState, inputValue, setInputValue, setAdditionalSymbols, setOfSymbols }) => {
    const classes = useStyles()

    const handleChangeCheckbox = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.checked });
    };

    const [inputSet, setInputSet] = useState(new Set(setOfSymbols))

    const handleChangeInputExtraSymbols = (e) => {
        if (!inputSet.has(e.target.value[e.target.value.length - 1])) {
            setInputSet((prev) => prev.add(e.target.value[e.target.value.length - 1]));
            setInputValue(Array.from(inputSet).filter((item) => !setOfSymbols.has(item)).join(''));
        }
    }

    const { lowercase, uppercase, numbers } = formState;

    const error = [lowercase, uppercase, numbers].filter(item => item).length === 0;

    const [passwordLength, setPasswordLength] = useState(formState.passwordLength);

    const handleSliderChange = (event, newValue) => {
        setPasswordLength(newValue);
    };

    const handleInputChange = (event) => {
        setPasswordLength(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (passwordLength < 0) {
            setPasswordLength(0);
        } else if (passwordLength > 50) {
            setPasswordLength(50);
        }
    };

    useEffect(() => {
        setFormState((prev) => ({ ...prev, passwordLength: passwordLength }))
    }, [passwordLength, setFormState])

    return (
        <Box className={classes.root}>
            <Box className={classes.passwordLengthField} >
                <Typography variant='h5'>Password length</Typography>
                <Slider
                    className={classes.slider}
                    value={typeof passwordLength === 'number' ? passwordLength : 0}
                    onChange={handleSliderChange}
                    valueLabelDisplay='auto'
                    step={1}
                    marks
                    min={6}
                    max={50}
                />
                <Input
                    className={classes.passwordLengthInput}
                    value={passwordLength}
                    margin="dense"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                        step: 1,
                        min: 6,
                        max: 50,
                        type: 'number',
                    }}
                />
            </Box>
            <Box className={classes.setsOfSymbols}>
                <Typography variant='h5' align='center'>Choose set of symbols for your password</Typography>
                <FormControl error={error} component="fieldset" >
                    <FormGroup >
                        <FormControlLabel
                            control={<Checkbox checked={lowercase} onChange={handleChangeCheckbox} />}
                            label="Lowercase" name="lowercase"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={uppercase} onChange={handleChangeCheckbox} />}
                            label="Uppercase" name="uppercase"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={numbers} onChange={handleChangeCheckbox} />}
                            label="Numbers" name="numbers"
                        />
                    </FormGroup>
                    <FormHelperText>{error && 'Pick at least 1 item'}</FormHelperText>
                </FormControl>
            </Box>
            <form className={classes.extraSymbolsField} onSubmit={setAdditionalSymbols}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="extra-symbols">Type extra symbols here</InputLabel>
                    <OutlinedInput
                        className={classes.extraSymbolsInput}
                        id="extra-symbols"
                        label='Type extra symbols here'
                        value={inputValue}
                        onChange={handleChangeInputExtraSymbols}
                    />
                </FormControl>
                <Button className={classes.extraSymbolsButton} variant='contained' color='secondary' type='submit'>Add</Button>
            </form>
        </Box>
    )
}

export default SettingsForm
