import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function CreateScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Card>
        <Card.Content>
          <Text variant="titleLarge">Add Words</Text>
          <Text>Add and delete words from your word collection.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Add Words')}>Start</Button>
        </Card.Actions>
      </Card>
            <Button
                title="Add Words"
                onPress={() => navigation.navigate('Add Words')}
            />
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