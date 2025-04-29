import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';

const FAKE_RESPONSES: { [key: string]: string } = {
  'o que é educação financeira': `Educação financeira é o processo de adquirir conhecimentos e habilidades para gerenciar de forma eficaz os recursos financeiros pessoais. Isso inclui aprender a fazer orçamentos, controlar gastos, poupar, investir e planejar para o futuro. Uma boa educação financeira ajuda a tomar decisões conscientes que promovem a estabilidade econômica e a realização de objetivos financeiros a longo prazo.`,

  'como economizar dinheiro': `Economizar dinheiro envolve a criação de um plano financeiro que permita gastar menos do que se ganha. Para isso, é importante elaborar um orçamento mensal detalhado, identificar despesas desnecessárias e buscar alternativas mais econômicas. Além disso, estabelecer metas claras de poupança, como um fundo de emergência ou investimentos, ajuda a manter a disciplina financeira e a garantir segurança em situações imprevistas.`,

  'o que é investimento': `Investimento é a aplicação de recursos financeiros em ativos com o objetivo de obter retorno ao longo do tempo. Existem diversos tipos de investimentos, como ações, títulos públicos, fundos imobiliários e poupança. Cada tipo possui características específicas de risco e rentabilidade. Entender o perfil de investidor e os objetivos financeiros é fundamental para escolher os investimentos mais adequados e alcançar a independência financeira.`,

  'como sair das dívidas': `Sair das dívidas requer planejamento e disciplina. O primeiro passo é listar todas as dívidas, incluindo valores, taxas de juros e prazos. Priorize o pagamento das dívidas com juros mais altos para reduzir o custo total. Negociar condições melhores com credores também pode ajudar. Paralelamente, evite contrair novas dívidas e ajuste seu orçamento para aumentar a capacidade de pagamento. Com persistência, é possível recuperar a saúde financeira.`,

  'qual a importância do orçamento': `O orçamento é uma ferramenta essencial para o controle financeiro pessoal. Ele permite visualizar todas as fontes de renda e despesas, facilitando a identificação de gastos excessivos e a definição de prioridades. Com um orçamento bem elaborado, é possível planejar investimentos, poupar para objetivos futuros e evitar o endividamento. Além disso, o orçamento promove maior consciência sobre o uso do dinheiro, contribuindo para uma vida financeira equilibrada e segura.`,
};

const POPULAR_QUESTIONS = Object.keys(FAKE_RESPONSES);

function getFakeResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();
  for (const key in FAKE_RESPONSES) {
    if (lowerQuestion.includes(key)) {
      return FAKE_RESPONSES[key];
    }
  }
  return 'Desculpe, não tenho uma resposta para essa pergunta. Por favor, tente outra pergunta sobre educação financeira.';
}

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  isOption?: boolean;
};

export default function FinancialEducationFakeAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() =>
    POPULAR_QUESTIONS.map((q, i) => ({
      id: i + 1,
      text: q,
      sender: 'ai',
      isOption: true,
    }))
  );
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = (text: string, sender: 'user' | 'ai', isOption = false) => {
    setMessages((prev) => [...prev, { id: prev.length + 1, text, sender, isOption }]);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    sendMessage(input, 'user');
    const answer = getFakeResponse(input);
    sendMessage(answer, 'ai');
    setInput('');
  };

  const handleSelectOption = (text: string) => {
    // Instead of sending immediately, just set input text for user to edit/send
    setInput(text);
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

      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((msg) => (
          <TouchableOpacity
            key={msg.id}
            disabled={!msg.isOption}
            onPress={() => msg.isOption && handleSelectOption(msg.text)}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
              msg.isOption && styles.optionBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.sender === 'user' ? styles.userText : styles.aiText,
                msg.isOption && styles.optionText,
              ]}
            >
              {msg.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua pergunta aqui"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <Button title="Enviar" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#e6f0ff',
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1a237e',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  chatContent: {
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  optionBubble: {
    backgroundColor: '#d0d9ff',
  },
  userBubble: {
    backgroundColor: '#7a8cff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  aiBubble: {
    backgroundColor: '#cfd9ff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  optionText: {
    color: '#1a237e',
    fontWeight: '600',
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: '#0d1a66',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  input: {
    flex: 1,
    borderColor: '#7a8cff',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginRight: 10,
  },
});
