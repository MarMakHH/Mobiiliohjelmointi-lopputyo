import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
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