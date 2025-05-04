import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";

export default function CardMode() {

    const [titles, setTitles] = useState([]);
    const [words, setWords] = useState([]);
    const [hasTitle, setHasTitle] = useState(false);

    const db = useSQLiteContext();

    const getTitles = async () => {
        try {
            const list = await db.getAllAsync('SELECT DISTINCT title from words');
            setTitles(list);
        } catch (error) {
            console.error('Could not get items', error);
        }
    }

    const getWords = async (title) => {
        try {
            const list = await db.getAllAsync('SELECT * from words WHERE title = ?', title);
            setWords(list);
        } catch (error) {
            console.error('Could not get items', error);
        }
    }

    useEffect(() => { getTitles() }, []);


    const handleTitleSelect = (e) => {
        
    }

    return (
        <SafeAreaView style={styles.container} >
            {hasTitle ? 
            <>
            <Text>Hello</Text>
            <Button title="Cancel" onPress={() => setHasTitle(false)}/>
            </>
            :
            titles.map(title => {
                return <Button key={title.title} title={title.title} onPress={() => setHasTitle(true)} />
            })
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