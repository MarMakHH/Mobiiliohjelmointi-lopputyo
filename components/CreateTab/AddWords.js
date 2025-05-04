import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function AddWords() {

    const [title, setTitle] = useState('');
    const [firstLanguage, setFirstLanguage] = useState('');
    const [secondLanguage, setSecondLanguage] = useState('');
    const [firstWord, setFirstWord] = useState('');
    const [secondWord, setSecondWord] = useState('');
    const [words, setWords] = useState([]);

    const db = useSQLiteContext();

    const saveItem = async () => {
        try {
            await db.runAsync('INSERT INTO words (title, firstLanguage, secondLanguage, firstWord, secondWord) VALUES (?, ?, ?, ?, ?)', title, firstLanguage, secondLanguage, firstWord, secondWord);
            updateList();
        } catch (error) {
            console.error('Could not add item', error);
        }
    };

    const updateList = async () => {
        try {
            const list = await db.getAllAsync('SELECT * from words');
            setWords(list);
        } catch (error) {
            console.error('Could not get items', error);
        }
    }

    useEffect(() => { updateList() }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Add Words</Text>
            <TextInput
                placeholder="Title"
                onChangeText={title => setTitle(title)}
                value={title}
            />
            <TextInput
                placeholder="firstLanguage"
                onChangeText={firstLanguage => setFirstLanguage(firstLanguage)}
                value={firstLanguage}
            />
            <TextInput
                placeholder="secondLanguage"
                onChangeText={secondLanguage => setSecondLanguage(secondLanguage)}
                value={secondLanguage}
            />
            <TextInput
                placeholder="firstWord"
                onChangeText={firstWord => setFirstWord(firstWord)}
                value={firstWord}
            />
            <TextInput
                placeholder="secondWord"
                onChangeText={secondWord => setSecondWord(secondWord)}
                value={secondWord}
            />
            <Button onPress={saveItem} title="Save" />
            <FlatList
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.firstLanguage} </Text>
                        <Text>{item.firstWord}</Text>
                        <Text>{item.secondLanguage}</Text>
                        <Text>{item.secondWord}</Text>
                        <Text style={{ color: '#ff0000' }} onPress={() => deleteItem(item.id)}>Done</Text>
                    </View>
                }
                data={words}
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