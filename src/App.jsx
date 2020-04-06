import React, { useState, useEffect, Fragment } from 'react'
import PasswordField from './PasswordField/PasswordField';
import SettingsForm from './SettingsForm/SettingsForm';
import Title from './Title/Title';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const App = () => {
  const defaultValuesObject = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    numbers: '1234567890'.split(''),
  }

  const [formState, setFormState] = useState({ lowercase: true, uppercase: true, numbers: true, passwordLength: 9, isPasswordVisible: true, additionalSymbols: new Set() });
  const [inputValue, setInputValue] = useState('');
  const [setOfSymbols, setSetOfSymbols] = useState(new Set())
  const [generatedPassword, setGeneratedPassword] = useState('');

  const addNewValues = (values, set) => {
    values.forEach((item) => {
      set.add(item)
    })
  }

  const getRandomIndex = (length) => {
    return Math.floor(Math.random() * length);
  }

  const generateSetOfSymbols = () => {
    let set = new Set();
    for (let key in formState) {
      if (formState[key] === true && ['lowercase', 'uppercase', 'numbers'].includes(key)) {
        addNewValues(defaultValuesObject[key], set)
      };
      if (key === 'additionalSymbols') {
        addNewValues(formState.additionalSymbols, set)
      };
    };
    setSetOfSymbols(set);
  }

  const generatePassword = () => {
    let tempPassword = [];
    const arrayOfSymbols = Array.from(setOfSymbols);
    for (let i = 0; i < formState.passwordLength; i++) {
      const randomSymbol = arrayOfSymbols[getRandomIndex(arrayOfSymbols.length)];
      tempPassword.push(randomSymbol);
    }
    setGeneratedPassword(tempPassword.join(''))
  }

  const setAdditionalSymbols = (e) => {
    e.preventDefault()
    setFormState((prev) => {
      let set = new Set()
      addNewValues(inputValue.split('').filter((item) => item !== ' '), set)
      return {
        ...prev,
        additionalSymbols: set
      }
    })
  }

  useEffect(() => {
    generateSetOfSymbols();
    if (setOfSymbols.size > 0) generatePassword();
  }, [formState])

  useEffect(() => {
    generateSetOfSymbols();
    if (setOfSymbols.size > 0) generatePassword();
  }, [setOfSymbols.size])

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='xl' style={{ overflow: 'hidden' }}>
        <Title />
        <PasswordField
          passwordValue={generatedPassword}
          generatePassword={generatePassword}
          formState={formState}
          setFormState={setFormState} />
        <SettingsForm
          formState={formState}
          setFormState={setFormState}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setAdditionalSymbols={setAdditionalSymbols}
          setOfSymbols={setOfSymbols}
          setSetOfSymbols={setSetOfSymbols} />
      </Container>
    </Fragment>
  )
}

export default App
