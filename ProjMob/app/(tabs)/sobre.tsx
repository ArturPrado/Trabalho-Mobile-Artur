import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/Hello';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">SOBRE</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Meu nome é Artur Fernandes do Prado</ThemedText>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="defaultSemiBold">Eu sou aluno do Colégio Estadual Civico Militar Guido Arzua</ThemedText>
          {' '}
          </ThemedText>{' '}
        <ThemedView style={styles.titleContainer}></ThemedView>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          Tenho 18 anos, estou no terceiro ano do ensino médio do curso técnico
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          Sou muito bem compromissado com a minha namorada e ela é muito especial para mim.{' '}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
