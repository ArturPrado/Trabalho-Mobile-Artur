import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  // Modo padrão: 'light' (modo claro)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isDarkMode = theme === 'dark';

  const [dailyRates, setDailyRates] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRates, setFilteredRates] = useState<any>({});

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest?base=BRL')
      .then((response) => response.json())
      .then((data) => {
        setDailyRates(data.rates);
      })
      .catch((error) =>
        console.error('Erro ao buscar variação diária da moeda:', error)
      );
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

  // Função para alternar entre os modos claro e escuro
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Definição de cores de fundo e texto com base no modo
  const backgroundColor = '#FFFFFF'; // Fundo branco para todo o site
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const inputBackground = isDarkMode ? '#2E2E2E' : '#F0F0F0';
  const inputBorderColor = isDarkMode ? '#555555' : '#AAAAAA';

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
      }
      backgroundColor={backgroundColor}> {/* Definindo o fundo como branco */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: textColor }}>
          Como funciona a variação de moeda?
        </ThemedText>
      </ThemedView>

      {/* Botão para alternar o tema */}
      <Pressable
        style={[
          styles.toggleButton,
          { backgroundColor: inputBackground, borderColor: inputBorderColor },
        ]}
        onPress={toggleTheme}>
        <Text style={{ color: textColor, fontWeight: 'bold' }}>
          Mudar para modo {isDarkMode ? 'claro' : 'escuro'}
        </Text>
      </Pressable>

      <Text style={[styles.paragraph, { color: textColor }]}>
        A variação de moeda acontece devido a diversos fatores econômicos e políticos. Entre eles:
        {'\n'}• Inflação e taxa de juros{'\n'}• Estabilidade política{'\n'}• Oferta e demanda por moedas estrangeiras{'\n'}• Balança comercial e reservas internacionais{'\n'}
        Acompanhe abaixo a variação diária das principais moedas em relação ao Real (BRL):
      </Text>

      {dailyRates ? (
        <View style={[styles.table, { backgroundColor: inputBackground }]}>
          <Text style={[styles.tableRow, { color: textColor }]}>
            USD: {dailyRates.USD?.toFixed(2)}
          </Text>
          <Text style={[styles.tableRow, { color: textColor }]}>
            EUR: {dailyRates.EUR?.toFixed(2)}
          </Text>
          <Text style={[styles.tableRow, { color: textColor }]}>
            GBP: {dailyRates.GBP?.toFixed(2)}
          </Text>
          <Text style={[styles.tableRow, { color: textColor }]}>
            JPY: {dailyRates.JPY?.toFixed(2)}
          </Text>
        </View>
      ) : (
        <Text style={{ color: textColor, marginTop: 10 }}>
          Carregando dados...
        </Text>
      )}

      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: inputBackground,
              color: textColor,
              borderColor: inputBorderColor,
            },
          ]}
          placeholder="Buscar moeda..."
          placeholderTextColor={isDarkMode ? '#CCCCCC' : '#555555'}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </ThemedView>

      {Object.keys(filteredRates).length > 0 ? (
        <ScrollView
          style={[
            styles.searchResults,
            { backgroundColor: inputBackground },
          ]}>
          {Object.entries(filteredRates).map(([currency, rate], index) => (
            <Text
              key={index}
              style={[styles.searchResultText, { color: textColor }]}>
              {currency}: {parseFloat(rate).toFixed(2)}
            </Text>
          ))}
        </ScrollView>
      ) : searchQuery.length > 0 ? (
        <Text style={[styles.noResults, { color: textColor }]}>
          Nenhuma moeda encontrada.
        </Text>
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
  toggleButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10,
  },
  table: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  tableRow: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  searchContainer: {
    marginTop: 20,
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  searchResults: {
    marginTop: 10,
    maxHeight: 200,
    borderRadius: 5,
    padding: 10,
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
  },
});
