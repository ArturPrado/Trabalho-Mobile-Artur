Crash Convertor de Moeda

Descrição

Crash Convertor de Moeda é um aplicativo móvel desenvolvido em React Native que permite aos usuários converter valores monetários entre diferentes moedas usando a API Exchange Rate. A interface é baseada no personagem Crash Bandicoot para tornar a experiência mais divertida e interativa.

Tecnologias Utilizadas

React Native: Framework para desenvolvimento mobile.

JavaScript & TypeScript: Linguagens principais para desenvolvimento.

API Exchange Rate: Para obter taxas de conversão em tempo real.

Estrutura do Projeto

O projeto segue a estrutura padrão do React Native:

Trabalho-Mobile-Artur/
│── ProjMob/              # Diretório principal do aplicativo
│── README.md             # Documentação do projeto
│── package-lock.json     # Dependências do projeto

Funcionalidades

Selecionar a moeda base para conversão.

Inserir um valor a ser convertido.

Exibir o valor convertido para Reais (BRL).

Interface interativa com imagens do Crash Bandicoot.

Como Executar o Projeto

Clonar o Repositório:

git clone https://github.com/ArturPrado/Trabalho-Mobile-Artur.git

Navegar até o Diretório do Projeto:

cd Trabalho-Mobile-Artur

Instalar as Dependências:

npm install

Executar a Aplicação:

npm start

Exemplo de Código

Aqui está um trecho do código principal do aplicativo:

import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TextInput, Button, Picker } from 'react-native';

const HomeScreen = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/BRL')
      .then(response => response.json())
      .then(data => {
        setRates(data.rates);
      })
      .catch(error => console.error('Erro ao buscar taxa de câmbio:', error));
  }, []);

  const convertCurrency = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && rates[selectedCurrency]) {
      setConvertedAmount((value / rates[selectedCurrency]).toFixed(2));
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
        <Text style={styles.title}>Crash Convertor de Moeda 👋</Text>
        <Text style={styles.subtitle}>Selecione a moeda primária</Text>

        <Picker
          selectedValue={selectedCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        >
          {Object.keys(rates).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
        
        <Text style={styles.label}>Valor:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder={`Digite o valor em ${selectedCurrency}`}
        />
        <Button title="Converter para BRL" onPress={convertCurrency} />

        {convertedAmount !== null && (
          <Text style={styles.result}>Valor convertido: R$ {convertedAmount}</Text>
        )}
      </View>
    </View>
  );
};

Contribuidores

Artur Prado
