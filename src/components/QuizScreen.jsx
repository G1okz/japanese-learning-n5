import { VStack, Heading, Text, Progress, Stack, Button } from '@chakra-ui/react'
import { ThemeToggle } from './ThemeToggle'
import { Footer } from './Footer'
import { QuestionCard } from './QuestionCard'

export const QuizScreen = ({
  currentQuestion,
  questionNumber,
  score,
  showExplanation,
  handleAnswer,
  handleNextQuestion,
  getButtonColorScheme,
  getButtonIcon
}) => {
  const progress = (questionNumber / 20) * 100

  return (
    <VStack spacing={{ base: 3, md: 4 }}>
      <ThemeToggle />
      <Heading 
        size={{ base: "md", md: "lg" }} 
        textAlign="center"
        px={{ base: 4, md: 0 }}
      >
        Estudia Japonés
      </Heading>
      
      <Stack 
        direction={{ base: 'column', md: 'row' }} 
        w="100%" 
        justify="space-between" 
        spacing={2}
        px={{ base: 4, md: 0 }}
      >
        <Text fontSize={{ base: "md", md: "lg" }}>Pregunta {questionNumber} de 20</Text>
        <Text fontSize={{ base: "md", md: "lg" }}>Puntuación: {score}</Text>
      </Stack>
      
      <Progress 
        value={progress} 
        w="100%" 
        colorScheme="blue"
        mx={{ base: 4, md: 0 }}
      />
      
      <QuestionCard
        question={currentQuestion}
        options={currentQuestion.options}
        showExplanation={showExplanation}
        onAnswer={handleAnswer}
        getButtonColorScheme={getButtonColorScheme}
        getButtonIcon={getButtonIcon}
      />

      {showExplanation && (
        <Button 
          colorScheme="blue" 
          size={{ base: "md", md: "lg" }} 
          w="100%" 
          maxW="300px"
          onClick={handleNextQuestion}
          mx={{ base: 4, md: 0 }}
        >
          {questionNumber < 20 ? 'Siguiente Pregunta' : 'Finalizar Prueba'}
        </Button>
      )}

      <Footer />
    </VStack>
  )
} 
