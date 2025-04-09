import { StyleSheet, TextInput, ScrollView, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [dailyRates, setDailyRates] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRates, setFilteredRates] = useState<any>({});

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest?base=BRL')
      .then(response => response.json())
      .then(data => {
        setDailyRates(data.rates);
      })
      .catch(error => console.error('Erro ao buscar variação diária da moeda:', error));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '' && dailyRates) {
      const filtered = Object.fromEntries(
        Object.entries(dailyRates).filter(([key]) =>
          key.toUpperCase().includes(searchQuery.toUpperCase())
        )
      );
      setFilteredRates(filtered);
    } else {
      setFilteredRates({});
    }
  }, [searchQuery, dailyRates]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D67800', dark: '#8B4500' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#FFCC33"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Como funciona a variação de moeda?</ThemedText>
      </ThemedView>
      <ThemedText>
        A variação de moeda acontece devido a diversos fatores econômicos e políticos. Entre eles:
        {'\n'}• Inflação e taxa de juros{''}• Estabilidade política{''}• Oferta e demanda por moedas estrangeiras{''}• Balança comercial e reservas internacionais{''}
        Acompanhe abaixo a variação diária das principais moedas em relação ao Real (BRL):
      </ThemedText>

      {dailyRates ? (
        <View style={styles.table}>
          <Text style={styles.tableRow}>USD: {dailyRates.USD?.toFixed(2)}</Text>
          <Text style={styles.tableRow}>EUR: {dailyRates.EUR?.toFixed(2)}</Text>
          <Text style={styles.tableRow}>GBP: {dailyRates.GBP?.toFixed(2)}</Text>
          <Text style={styles.tableRow}>JPY: {dailyRates.JPY?.toFixed(2)}</Text>
        </View>
      ) : (
        <Text>Carregando dados...</Text>
      )}

      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar moeda..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </ThemedView>

      {Object.keys(filteredRates).length > 0 ? (
        <ScrollView style={styles.searchResults}>
          {Object.entries(filteredRates).map(([currency, rate], index) => (
            <Text key={index} style={styles.searchResultText}>
              {currency}: {parseFloat(rate).toFixed(2)}
            </Text>
          ))}
        </ScrollView>
      ) : searchQuery.length > 0 ? (
        <Text style={styles.noResults}>Nenhuma moeda encontrada.</Text>
      ) : null}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#FFCC33',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  table: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#B7410E',
    borderRadius: 5,
  },
  tableRow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  searchContainer: {
    marginTop: 20,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: '#D67800',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFCC33',
    color: '#8B4500',
    fontWeight: 'bold',
  },
  searchResults: {
    marginTop: 10,
    maxHeight: 200,
  },
  searchResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  noResults: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFCC33',
    fontWeight: 'bold',
  }
});
