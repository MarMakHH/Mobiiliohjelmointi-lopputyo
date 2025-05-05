import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Button, List, Text, TextInput } from "react-native-paper";

export default function AddWords() {

    const [title, setTitle] = useState('');
    const [firstLanguage, setFirstLanguage] = useState('');
    const [secondLanguage, setSecondLanguage] = useState('');
    const [firstWord, setFirstWord] = useState('');
    const [secondWord, setSecondWord] = useState('');
    const [words, setWords] = useState([]);
    const [hasTitle, setHasTitle] = useState(false);

    const db = useSQLiteContext();

    const saveItem = async () => {
        try {
            await db.runAsync('INSERT INTO words (title, firstLanguage, secondLanguage, firstWord, secondWord) VALUES (?, ?, ?, ?, ?)', title, firstLanguage, secondLanguage, firstWord, secondWord);
            updateList();
        } catch (error) {
            console.error('Could not add item', error);
        }
        setFirstWord('');
        setSecondWord('');
    };

    const updateList = async () => {
        try {
            const list = await db.getAllAsync('SELECT * FROM words WHERE title = ?', title);
            setWords(list);
        } catch (error) {
            console.error('Could not get items', error);
        }
    }

    const deleteItem = async (id) => {
        try {
            await db.runAsync('DELETE FROM words WHERE id = ?', id)
            updateList();
        } catch (error) {
            console.error('Could not get items', error);
        }
    }

    const handleNext = () => {
        updateList();
        setHasTitle(true)
    }

    useEffect(() => { updateList() }, []);

    return (
        <SafeAreaView >
            {!hasTitle ?
                <>
                    <Text variant="titleLarge">Set title and languages</Text>
                    <TextInput
                        label="Title"
                        onChangeText={title => setTitle(title)}
                        value={title}
                    />
                    <TextInput
                        label="First language"
                        onChangeText={firstLanguage => setFirstLanguage(firstLanguage)}
                        value={firstLanguage}
                    />
                    <TextInput
                        label="Second language"
                        onChangeText={secondLanguage => setSecondLanguage(secondLanguage)}
                        value={secondLanguage}
                    />
                    <Button mode="contained" onPress={() => handleNext()}>Next</Button>
                </>
                :
                <>
                    <Button mode="contained" onPress={() => setHasTitle(false)}>Cancel</Button>
                    <Text>Add words to {title}</Text>
                    <TextInput
                        label={firstLanguage}
                        onChangeText={firstWord => setFirstWord(firstWord)}
                        value={firstWord}
                    />
                    <TextInput
                        label={secondLanguage}
                        onChangeText={secondWord => setSecondWord(secondWord)}
                        value={secondWord}
                    />
                    <Button mode="contained" onPress={() => saveItem()}>Add</Button>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <List.Item
                                    title={item.firstWord}
                                    description={item.secondWord}
                                    left={props => <Button onPress={() => deleteItem(item.id)}>Delete</Button>}
                                />
                            </View>
                        }
                        data={words}
                    />
                </>
            }
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