import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';

const OPENAI_API_KEY = Constants.manifest?.extra?.openaiApiKey || '';

export default function FinancialEducationAI() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async (query: string) => {
    if (!OPENAI_API_KEY) {
      setResponse('Chave da API não configurada. Por favor, configure a chave da API do OpenAI.');
      return;
    }
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Você é um assistente que ajuda com educação financeira.' },
            { role: 'user', content: query },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      console.log('OpenAI API response:', data);
      if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
        setResponse(data.choices[0].message.content.trim());
      } else if (data.error && data.error.message) {
        setResponse(`Erro da API: ${data.error.message}`);
      } else {
        setResponse('Desculpe, não consegui obter uma resposta.');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API da I.A.:', error);
      setResponse('Erro ao conectar com a API da I.A.');
    }
    setLoading(false);
  };

  const handleAsk = () => {
    if (question.trim() === '') return;
    askAI(question);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        source={require('../../assets/images/crash-Photoroom.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>Converse com a I.A. sobre Educação Financeira</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua pergunta aqui"
        value={question}
        onChangeText={setQuestion}
        multiline
      />
      <Button title={loading ? 'Carregando...' : 'Perguntar'} onPress={handleAsk} disabled={loading} />
      <ScrollView style={styles.responseContainer}>
        <Text style={styles.responseText}>{response}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#e6f0ff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 25,
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a237e',
  },
  input: {
    borderColor: '#7a8cff',
    borderWidth: 2,
    borderRadius: 15,
    padding: 18,
    minHeight: 90,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  responseContainer: {
    marginTop: 25,
    backgroundColor: '#cfd9ff',
    borderRadius: 15,
    padding: 20,
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  responseText: {
    fontSize: 19,
    lineHeight: 28,
    color: '#0d1a66',
  },
});
