import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRates, setFilteredRates] = useState({});

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/BRL')
      .then(response => response.json())
      .then(data => {
        setRates(data.rates);
      })
      .catch(error => console.error('Erro ao buscar taxa de câmbio:', error));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '' && rates) {
      const filtered = Object.fromEntries(
        Object.entries(rates).filter(([key]) =>
          key.toUpperCase().includes(searchQuery.toUpperCase())
        )
      );
      setFilteredRates(filtered);
    } else {
      setFilteredRates({});
    }
  }, [searchQuery, rates]);

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
        <Text style={styles.title}>Crash convertor de moeda 👋</Text>
        <Text style={styles.subtitle}>Selecione a moeda primária</Text>

        <ScrollView style={styles.currencyList}>
          <View style={styles.currencyButtons}>
            {Object.keys(rates).map((currency) => (
              <TouchableOpacity
                key={currency}
                style={[styles.currencyButton, selectedCurrency === currency && styles.selectedCurrencyButton]}
                onPress={() => setSelectedCurrency(currency)}
              >
                <Text style={styles.currencyButtonText}>{currency}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

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

        <TextInput
          style={styles.input}
          placeholder="Buscar moeda..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />

        {Object.keys(filteredRates).length > 0 ? (
          <ScrollView style={styles.searchResults}>
            {Object.entries(filteredRates).map(([currency, rate], index) => (
              <Text key={index} style={[styles.searchResultText, { color: '#000000' }]}>
                {currency}: {parseFloat(rate).toFixed(2)}
              </Text>
            ))}
          </ScrollView>
        ) : searchQuery.length > 0 ? (
          <Text style={[styles.noResults]}>Nenhuma moeda encontrada.</Text>
        ) : null}
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
  searchResults: {
    marginTop: 10,
    maxHeight: 200,
  },
  searchResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noResults: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D67800',
  },
  currencyList: {
    maxHeight: 100,
    marginBottom: 10,
  },
  currencyButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  currencyButton: {
    padding: 8,
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  selectedCurrencyButton: {
    backgroundColor: '#FFA500',
  },
  currencyButtonText: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
