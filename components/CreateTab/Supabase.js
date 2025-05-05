import { createClient } from "@supabase/supabase-js";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, List, Text } from "react-native-paper";

const supabase = createClient("https://fovkazxnsxbsdfhjqcyi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvdmthenhuc3hic2RmaGpxY3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MTQ0NTAsImV4cCI6MjA2MTk5MDQ1MH0.tJOj-ZAYRC8FE6f8j6OT9750HBqLbajG-Sa7xXn3CEE");

export default function SupabaseScreen() {
    const [words, setWords] = useState([]);

    const db = useSQLiteContext();

    useEffect(() => {
        getWords();
    }, [])

    async function getWords() {
        const { data } = await supabase.from("words").select();
        setWords(data);
    }

    const saveItem = async (word) => {
        try {
            await db.runAsync('INSERT INTO words (title, firstLanguage, secondLanguage, firstWord, secondWord) VALUES (?, ?, ?, ?, ?)', word.title, word.firstlanguage, word.secondlanguage, word.firstword, word.secondword);
        } catch (error) {
            console.error('Could not add item', error);
        }
    };

    return (
        <SafeAreaView style={styles.container} >
            {words.map(word => {
                return (
                    <>
                        <List.Item
                            title={word.firstword}
                            description={word.secondword}
                            left={props => <Button onPress={() => saveItem(word)}>Save</Button>}
                        />
                    </>
                )
            })}
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