import { ChakraProvider, Box, VStack, Heading, Text, Button, Container, Spinner, Badge, Progress, HStack, Icon, useToast, Stack, Link } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { getRandomWord, resetUsedWords } from './services/jishoApi'
import { FaCheck, FaTimes, FaLinkedin, FaGithub, FaPlay } from 'react-icons/fa'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isStartScreen, setIsStartScreen] = useState(true)
  const toast = useToast()

  const loadNewQuestion = async () => {
    try {
      const question = await getRandomWord(questionNumber)
      if (question) {
        setCurrentQuestion(question)
        setShowExplanation(false)
        setSelectedAnswer(null)
      } else {
        toast({
          title: 'Error',
          description: 'No se pudo cargar la pregunta. Por favor, intenta de nuevo.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error loading question:', error)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al cargar la pregunta.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    loadNewQuestion()
  }, [questionNumber])

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1)
      toast({
        title: '¡Correcto!',
        description: currentQuestion.explanation,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Incorrecto',
        description: currentQuestion.explanation,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleNextQuestion = () => {
    if (questionNumber < 20) {
      setQuestionNumber(questionNumber + 1)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setScore(0)
    setQuestionNumber(1)
    setShowExplanation(false)
    setSelectedAnswer(null)
    setIsFinished(false)
    resetUsedWords()
    loadNewQuestion()
  }

  const handleStart = () => {
    setIsStartScreen(false)
    loadNewQuestion()
  }

  const getButtonColorScheme = (option) => {
    if (!showExplanation) return 'blue'
    if (option === currentQuestion.correctAnswer) return 'green'
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) return 'red'
    return 'gray'
  }

  const getButtonIcon = (option) => {
    if (!showExplanation) return null
    if (option === currentQuestion.correctAnswer) return <Icon as={FaCheck} />
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) return <Icon as={FaTimes} />
    return null
  }

  if (isStartScreen) {
    return (
      <ChakraProvider>
        <Container maxW="container.md" py={5}>
          <VStack spacing={8} align="center" justify="center" minH="80vh">
            <Heading size="2xl" textAlign="center" color="blue.500">
              Estudiando Japonés N5
            </Heading>
            
            <Text fontSize="xl" textAlign="center" color="gray.600">
              Pon a prueba tus conocimientos de vocabulario japonés con este quiz interactivo
            </Text>

            <Box p={6} borderWidth="1px" borderRadius="lg" w="100%" maxW="600px">
              <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold">Características:</Text>
                <Text>• 20 preguntas de vocabulario</Text>
                <Text>• Sistema de puntuación en tiempo real</Text>
                <Text>• Retroalimentación inmediata</Text>
                <Text>• Explicaciones detalladas</Text>
                <Text>• Interfaz adaptativa para móviles</Text>
              </VStack>
            </Box>

            <Button
              leftIcon={<FaPlay />}
              colorScheme="blue"
              size="lg"
              w="200px"
              onClick={handleStart}
            >
              Comenzar Quiz
            </Button>

            <Box as="footer" mt={8} textAlign="center">
              <Text mb={2}>Desarrollado por @Miguel Reyna</Text>
              <HStack spacing={4} justify="center">
                <Link href="https://www.linkedin.com/in/miguel-reyna-ca%C3%B1adillas/" isExternal>
                  <Icon as={FaLinkedin} w={6} h={6} color="blue.500" />
                </Link>
                <Link href="https://github.com/g1okz" isExternal>
                  <Icon as={FaGithub} w={6} h={6} color="gray.700" />
                </Link>
              </HStack>
            </Box>
          </VStack>
        </Container>
      </ChakraProvider>
    )
  }

  if (isFinished || !currentQuestion) {
    return (
      <ChakraProvider>
        <Container maxW="container.md" py={5}>
          <VStack spacing={4}>
            <Text fontSize="xl" textAlign="center">¡Prueba completada! Tu puntuación: {score}/20</Text>
            <Button colorScheme="blue" size="lg" w="100%" maxW="300px" onClick={handleRestart}>
              Reiniciar Prueba
            </Button>
          </VStack>
        </Container>
      </ChakraProvider>
    )
  }

  const progress = (questionNumber / 20) * 100

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={5}>
        <VStack spacing={4}>
          <Heading size="lg" textAlign="center">Estudia Japonés</Heading>
          
          <Stack direction={{ base: 'column', md: 'row' }} w="100%" justify="space-between" spacing={2}>
            <Text fontSize="lg">Pregunta {questionNumber} de 20</Text>
            <Text fontSize="lg">Puntuación: {score}</Text>
          </Stack>
          
          <Progress value={progress} w="100%" colorScheme="blue" />
          
          <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" boxShadow="md">
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between" wrap="wrap" gap={2}>
                <Badge colorScheme="purple" fontSize="sm">
                  {currentQuestion.type}
                </Badge>
                <Badge colorScheme="orange" fontSize="sm">
                  {currentQuestion.level}
                </Badge>
              </HStack>
              
              <Text fontSize={{ base: "2xl", md: "4xl" }} textAlign="center" fontWeight="bold">
                {currentQuestion.question}
              </Text>
              
              <VStack spacing={3} mt={2}>
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    colorScheme={getButtonColorScheme(option)}
                    w="100%"
                    h={{ base: "50px", md: "60px" }}
                    fontSize={{ base: "md", md: "lg" }}
                    onClick={() => !showExplanation && handleAnswer(option)}
                    isDisabled={showExplanation}
                    leftIcon={getButtonIcon(option)}
                    transition="all 0.2s"
                    _hover={!showExplanation ? { transform: 'scale(1.02)' } : {}}
                    whiteSpace="normal"
                    textAlign="center"
                    px={4}
                  >
                    {option}
                  </Button>
                ))}
              </VStack>

              {showExplanation && (
                <Box mt={4} p={3} bg="gray.50" borderRadius="md" borderWidth="1px">
                  <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>Explicación:</Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>{currentQuestion.explanation}</Text>
                </Box>
              )}
            </VStack>
          </Box>

          {showExplanation && (
            <Button 
              colorScheme="blue" 
              size="lg" 
              w="100%" 
              maxW="300px"
              onClick={handleNextQuestion}
            >
              {questionNumber < 20 ? 'Siguiente Pregunta' : 'Finalizar Prueba'}
            </Button>
          )}

          <Box as="footer" mt={8} textAlign="center">
            <Text mb={2}>Desarrollado por @Miguel Reyna</Text>
            <HStack spacing={4} justify="center">
              <Link href="https://www.linkedin.com/in/miguel-reyna-ca%C3%B1adillas/" isExternal>
                <Icon as={FaLinkedin} w={6} h={6} color="blue.500" />
              </Link>
              <Link href="https://github.com/g1okz" isExternal>
                <Icon as={FaGithub} w={6} h={6} color="gray.700" />
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </ChakraProvider>
  )
}

export default App
