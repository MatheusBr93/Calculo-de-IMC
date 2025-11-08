import { View, TextInput, StyleSheet } from 'react-native'
 
export default function TextInputs({setAltura, setPeso, setMensagem}){

  function validateInput(value){
    let type = Object.keys(value)[0]

    if(!isNaN(value[type])){
      value.change(value[type])
      setMensagem('')
    }else{
      setMensagem(`Parâmetro inválido: ${type}`)
    }
  }

  return(
    <View>
      <TextInput
        placeholderTextColor={'#458af7'}
        autoCapitalize="none"
        placeholder="Informe sua altura (cm):"
        keyboardType="numeric"
        onChangeText={(altura) => validateInput({
          'altura': altura,
          'change': setAltura
        })}
      />
      <TextInput
        placeholderTextColor={'#458af7'}
        autoCapitalize="none"
        placeholder="Informe o seu peso (kg):"
        keyboardType="numeric"
        onChangeText={(peso) => validateInput({
          'peso': peso,
          'change': setPeso
        })}
      />
    </View>
  )
}