import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '../../components/ParallaxScrollView';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export const unstable_settings = {
  headerShown: false,
};

export default function AboutScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={null} // Remove parallax image
    >
      <ThemedView style={styles.container}>
        <Image
          source={require('../../assets/images/crash.png')}
          style={styles.headerImage}
        />
        <ThemedText type="title">Sobre mim</ThemedText>
        <ThemedText type="defaultSemiBold">Artur Fernandes do Prado</ThemedText>
        <ThemedText type="default">
          Olá! Meu nome é Artur Fernandes do Prado. Sou aluno do Colégio Estadual Cívico Militar Guido Arzua, atualmente no terceiro ano do ensino médio do curso técnico.
        </ThemedText>
        <ThemedText type="default">
          Tenho 18 anos e sou uma pessoa comprometida com minha namorada, que é muito especial para mim.
        </ThemedText>
        <ThemedText type="default">
          Sou apaixonado por aprender e estou sempre buscando crescer pessoal e academicamente.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});
