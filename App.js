import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export default function App() {

    const [ lastNumber, setLastNumber ] = useState();
    const [ currentNumber, setCurrentNumber ] = useState('');
    const [ darkMode, setDarkMode ] = useState(true);
    const operators = [ "C", "DEL", "%", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "+/-", 0, ".", "=" ];


       const styles = StyleSheet.create({
      main: {
        flex: 1,
        display: 'flex',
      },

      resultContainer: {
        backgroundColor: darkMode ? 'white' : 'black',
        flex: 2,
        maxWidth: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },

      themeTouchable : {
        position: 'absolute', 
        justifyContent: "flex-end",
        alignSelf: "flex-start",
        marginLeft: 15,
        bottom: '65%',
      },
      
      theme: {
        color: darkMode ? "#000" : "#FFF",
        width: 50,
        height: 50,
        borderRadius: 40,
        textAlign: "center",
        textAlignVertical: "center"
      },

      textContainer: {
        minHeight: 105,
        justifyContent: "flex-end"
      },
    
      textHistory: {
        color: darkMode ? "#000" : "#FFF",
        fontSize: 26,
        paddingRight: 15,
        alignSelf: "flex-end",
      },
    
      textResult: {
        color: darkMode ? "#000" : "#FFF",
        fontSize: 36,
        paddingRight: 15,
        alignSelf: "flex-end",
     
      },
    
      operatorContainer: {
        backgroundColor: darkMode ? "#FFF" : "#000",
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'center',
        lignItems: 'flex-end',
      },
      
      operators: {
        flex: 1,
        minHeight: Dimensions.get('window').height/10,
        minWidth: Dimensions.get('window').width/5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        margin: 2,
      }, 
      
      operatorsText: {
        color: darkMode ?  "#000" : "#FFF",
        fontSize: 24,
      }
    });
    

    function handleButtonPress(buttonPressed){
      if(buttonPressed == "+" || buttonPressed == "-" || buttonPressed == "*" || buttonPressed == "/"){
        
        if(currentNumber.toString().indexOf("+") == -1 && currentNumber.toString().indexOf("-") == -1 && currentNumber.toString().indexOf("*") == -1 && currentNumber.toString().indexOf("/") == -1){
          setCurrentNumber(currentNumber + " " + buttonPressed + " ");
          return;
        }else{
          const newNumberCurrent = currentNumber.toString().substring(0, currentNumber.length - 3);
          setCurrentNumber('');
          setCurrentNumber(newNumberCurrent + " " + buttonPressed + " ");
          return;
        }
      }

      switch(buttonPressed){
        case 'C':
          setLastNumber('');
          setCurrentNumber('');
        return;
        case 'DEL':
          setCurrentNumber(currentNumber.slice(0, -1));
        return;
        case '=':
          setLastNumber(currentNumber + "=");
          calculate()
        return;
        case '+/-':
          var change = currentNumber * -1;
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
        return;
        case '%':
          var change = currentNumber / 100;
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
        return;
      }

     setCurrentNumber(currentNumber + buttonPressed);
    }

    function calculate(){

     const splitNumbers = currentNumber.toString().split(" ");
     const firstNumber = parseFloat(splitNumbers[0]);
     const secondNumber = parseFloat(splitNumbers[2]);
     const operation = splitNumbers[1];

      if(!isNaN(secondNumber)){
        switch(operation){
          case '+':
            var result = firstNumber + secondNumber;
            setCurrentNumber(result);
          return;
          case '-':
            var result = firstNumber - secondNumber;
            setCurrentNumber(result);
          return;
          case '*':
            var result = firstNumber * secondNumber;
            setCurrentNumber(result);
          return;
          case '/':
            var result = firstNumber / secondNumber;
            setCurrentNumber(result);
          return;
          default: 
            setLastNumber('');
            setCurrentNumber('');
          return;
        }
      }else{
        Alert.alert("Invalid format");
      }
    }

  return (
    <View style={styles.main}>
     <StatusBar barStyle={darkMode ? 'dark-content' : 'light-content'} />
      <View 
        style={styles.resultContainer}>
        <TouchableOpacity style={styles.themeTouchable}>
          <Feather onPress={
            () => {
              darkMode === true ? 
                setDarkMode (false) 
              : 
                setDarkMode(true)
            }}
            style={styles.theme} 
            name={darkMode === true ? "moon" : "sun"} 
            size={30} 
          />
          
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.textHistory}>
            {lastNumber}
          </Text>
          <Text style={styles.textResult}>
            {currentNumber}
          </Text>

        </View>
      </View>
    
      <View style={styles.operatorContainer}>
        
          {
            operators.map((char) => (
               (char) === 'C' ?
                <TouchableOpacity
                  key={char} 
                  style={[styles.operators, {backgroundColor: darkMode ? '#FF024A' : '#FF024A'}]}
                  onPress={() => handleButtonPress(char)}
                >
                  <Text style={styles.operatorsText}>{char}</Text>
                </TouchableOpacity>
              :
                <TouchableOpacity 
                  key={char} 
                  style={[styles.operators, {
                    backgroundColor: typeof(char) === 'number'  || (char) === 'DEL'  || (char) === '%' || (char) === '+/-' || (char) === '.'  ? 
                      darkMode ? '#DADBE0' : '#282828'
                      :
                      darkMode ? '#007AFF' : '#007AFF'
                  
                  }]}
                  onPress={() => handleButtonPress(char)}
                >
                  <Text style={styles.operatorsText}>{char}</Text>
                </TouchableOpacity>

            ))
          }

      </View>
    </View>
    );
}
