import { Container } from '@chakra-ui/react'
import { useState } from 'react'
import { StartScreen } from './components/StartScreen'
import { QuizScreen } from './components/QuizScreen'
import { ResultScreen } from './components/ResultScreen'
import { useQuiz } from './hooks/useQuiz'

function App() {
  const [isStartScreen, setIsStartScreen] = useState(true)
  const quiz = useQuiz()

  const handleStart = () => {
    setIsStartScreen(false)
  }

  if (isStartScreen) {
    return (
      <Container maxW="container.md" py={{ base: 4, md: 5 }}>
        <StartScreen onStart={handleStart} />
      </Container>
    )
  }

  if (quiz.isFinished || !quiz.currentQuestion) {
    return (
      <Container maxW="container.md" py={{ base: 4, md: 5 }}>
        <ResultScreen score={quiz.score} onRestart={quiz.handleRestart} />
      </Container>
    )
  }

  return (
    <Container maxW="container.md" py={{ base: 4, md: 5 }}>
      <QuizScreen {...quiz} />
    </Container>
  )
}

export default App
