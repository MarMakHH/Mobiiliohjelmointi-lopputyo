import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


export default function CardMode() {

    const [titles, setTitles] = useState([]);
    const [words, setWords] = useState([]);
    const [hasTitle, setHasTitle] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);

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

        setHasTitle(true);
        setWordIndex(0);
    }

    const spin = useSharedValue(0);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
        return {
            transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
            ],
        };
    }, []);

    const backAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
        return {
            transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
            ],
        };
    }, []);

    const cycleWords = () => {
        if (words.length - 1 > wordIndex) {
            setWordIndex(wordIndex + 1);
        } else if (words.length - 1 == wordIndex) {
            setWordIndex(0);
        }
    }

    useEffect(() => { getTitles() }, []);

    return (
        <SafeAreaView style={styles.container} >
            {hasTitle ?
                <>
                    <Button mode="contained" onPress={() => setHasTitle(false)}>Cancel</Button>
                    <Animated.View style={[styles.front, frontAnimatedStyle]}>
                        <Text variant="displayMedium">{words[wordIndex].firstWord}</Text>
                    </Animated.View>
                    <Animated.View style={[styles.back, backAnimatedStyle]}>
                        <Text variant="displayMedium">{words[wordIndex].secondWord}</Text>
                    </Animated.View>
                    <Button mode="contained" onPress={() => (spin.value = spin.value ? 0 : 1)}>Flip</Button>
                    <Button mode="contained-tonal" onPress={() => cycleWords()}>Next</Button>
                </>
                :
                titles.map(title => {
                    return <Button mode="contained" key={title.title} onPress={() => getWords(title.title)}>{title.title}</Button>
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
    front: {
        height: 400,
        width: 250,
        backgroundColor: "#D8D9CF",
        borderRadius: 16,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    back: {
        height: 400,
        width: 250,
        backgroundColor: "#ddc9f5",
        borderRadius: 16,
        backfaceVisibility: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
});