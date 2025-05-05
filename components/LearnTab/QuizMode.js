import { Button, Menu, PaperProvider, RadioButton, Text } from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export default function QuizMode() {

    const [titles, setTitles] = useState([]);
    const [hasTitle, setHasTitle] = useState(false);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('multiple');
    const [quiz, setQuiz] = useState([]);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState('');
    const [quizIndex, setQuizIndex] = useState(0);

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
            quizMaker(list)
        } catch (error) {
            console.error('Could not get items', error);
        }
        setScore(0);
        setQuizIndex(0)
        setHasTitle(true);
    }

    const quizMaker = (list) => {
        console.log("bye")
        if (type === 'multiple') {
            list.map(word => {
                console.log(list)
                const answers = ["", "", "", ""];
                answers[Math.floor(Math.random() * 4)] = word.secondWord;
                for (let i = 0; i < answers.length; i++) {
                    if (answers[i].length === 0) {
                        answers[i] = list[Math.floor(Math.random() * list.length)].secondWord;
                    }
                }
                const question = word.firstWord;
                const correctAnswer = word.secondWord;
                const quizItem = { question, answers, correctAnswer };
                console.log(quizItem)
                quiz.push(quizItem);
            })
        }
    }

    const checkAnswer = () => {
        if (answer == quiz[0].correctAnswer) {
            setScore(current => current + 1);
        }
        if (quizIndex == quiz.length - 1) {
            setHasTitle(false)
            setQuiz([])
        } else if (quizIndex <= quiz.length - 1) {
            setQuizIndex(current => current + 1)
        }
    }
    const handleCancel = () => {
        setHasTitle(false);
        setQuiz([]);
        setQuizIndex(0);
    }

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    useEffect(() => { getTitles() }, []);

    return (
        <SafeAreaView style={styles.container}>
            {hasTitle ?
                <>
                    <Button mode="contained" onPress={() => handleCancel()}>Cancel</Button>
                    <Text variant="headlineLarge">{quiz[quizIndex].question}</Text>
                    <RadioButton.Group onValueChange={value => setAnswer(value)} value={answer}>
                        <RadioButton.Item label={quiz[quizIndex].answers[0]} value={quiz[quizIndex].answers[0]} />
                        <RadioButton.Item label={quiz[quizIndex].answers[1]} value={quiz[quizIndex].answers[1]} />
                        <RadioButton.Item label={quiz[quizIndex].answers[2]} value={quiz[quizIndex].answers[2]} />
                        <RadioButton.Item label={quiz[quizIndex].answers[3]} value={quiz[quizIndex].answers[3]} />
                    </RadioButton.Group>
                    <Button mode="contained" onPress={() => checkAnswer()}>Check Answer</Button>
                </>
                :
                <PaperProvider>
                    <RadioButton.Group onValueChange={type => setType(type)} value={type}>
                        <RadioButton.Item label="Multiple choise" value="multiple" />
                        <RadioButton.Item label="Writing" value="writing" />
                    </RadioButton.Group>

                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Button mode="contained" onPress={openMenu}>Select word collection</Button>}>
                        {titles.map(title => {
                            return <Menu.Item key={title.title} title={title.title} onPress={() => getWords(title.title)} />
                        })}
                    </Menu>
                    <Text>Your score: {score}</Text>
                </PaperProvider>
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