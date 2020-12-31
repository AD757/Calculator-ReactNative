import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const buttons = ['C', 'DEL', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '=']

  function calculator(){
    const splitNumb = currentNumber.split(' ')
    const firstNumb = parseFloat(splitNumb[0])
    const lastNumb = parseFloat(splitNumb[2])
    const operator = splitNumb[1]


  switch(operator){
    case '+':
      setCurrentNumber((firstNumb + lastNumb).toString())
      return
    case '-':
      setCurrentNumber((firstNumb - lastNumb).toString())
      return
    case '/':
      setCurrentNumber((firstNumb / lastNumb).toString())
      return
    case '*':
      setCurrentNumber((firstNumb * lastNumb).toString())
      return
  }
}

  function handleInput(buttonPressed) {
    if(buttonPressed  === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
      setCurrentNumber(currentNumber + buttonPressed)
      return
    }
    else if (buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
            buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0 || buttonPressed === '.' ) {
    }
    switch(buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'C':
        setLastNumber('')
        setCurrentNumber('')
        return
      case '=':
        setLastNumber(currentNumber + '=')
        calculator()
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#121212' : '#FFF',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      color: darkMode ? '#FFF' : '#000',
      maxHeight: 45,
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#FFF' : '#000',
      fontSize: 28,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      backgroundColor: darkMode ? '#FFF' : '#E5E5E5',
      alignSelf: 'flex-start',
      bottom: '15%',
      margin: 15,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      backgroundColor: darkMode ? '#121212' : '#FFF',
      width: "100%",
      height: "65%",
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e1e1e1',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100,
      minHeight: 100,
      flex: 2,
      marginBottom: 10,
      borderRadius: 50,
    },
    textButton: {
      color: darkMode ? '#FFF' : '#000',
      fontSize: 28,
    }
  })

  return(
    <View>
      <View style={styles.results}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <TouchableOpacity style={styles.themeButton}>
          <Feather name={darkMode ? 'sun' : 'moon'} size={30} color={darkMode ? 'black' : 'black' } onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}/>
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' || button === '/' || button === '*' || button === '-' || button === '+' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#007AFF'} ]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28} ]}>{button}</Text>
          </TouchableOpacity>
          :
          button === 0 ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#282828' : '#DADBE0' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          button === '.' || button === 'DEL' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: button === ',' ? darkMode ? '#282828' : '#DADBE0' : darkMode === true ? '#282828' : '#DADBE0', minWidth: '37%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          button === 'C' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#282828' : '#FFF' : darkMode === true ? '#FF024A' : '#FF024A', minWidth: '36%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#282828' : '#DADBE0' : darkMode === true ? '#414853' : '#ededed' } ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}