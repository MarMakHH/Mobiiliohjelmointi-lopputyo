import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import { Card, Text, Button } from "react-native-paper";

export default function LearnScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} >
      <Card>
        <Card.Content>
          <Text variant="titleLarge">Flashcard</Text>
          <Text>Pick a word selection from your collection and practice memorization.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Flashcards')}>Start</Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">Quiz</Text>
          <Text>A multiple choice quiz, where you try to pick the correct translation.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Quiz')}>Start</Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});