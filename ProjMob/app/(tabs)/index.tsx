import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TextInput, Button } from 'react-native';

const HomeScreen = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        setRate(data.rates.BRL); // Obtendo a taxa de câmbio do dólar para real
      })
      .catch(error => console.error('Erro ao buscar taxa de câmbio:', error));
  }, []);

  const convertCurrency = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && rate) {
      setConvertedAmount((value * rate).toFixed(2));
    } else {
      setConvertedAmount(null);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/fundo-crash.png')}
        style={styles.headerBackground}
      >
        <Image 
          source={require('@/assets/images/crash.png')}
          style={styles.characterImage}
        />
      </ImageBackground>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Crash convertor de moeda 👋</Text>
        <Text style={styles.subtitle}>Selecione a moeda primária</Text>
        
        <Text style={styles.label}>Valor em USD:</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Digite o valor em USD"
        />
        <Button title="Converter para BRL" onPress={convertCurrency} />

        {convertedAmount !== null && (
          <Text style={styles.result}>Valor convertido: R$ {convertedAmount}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    width: '100%',
    height: 150, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default HomeScreen;
