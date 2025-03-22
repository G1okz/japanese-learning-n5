import { VStack, Heading, Text, Button, Box } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { ThemeToggle } from './ThemeToggle'
import { Footer } from './Footer'

export const StartScreen = ({ onStart }) => {
  return (
    <VStack spacing={{ base: 6, md: 8 }} align="center" justify="center" minH="80vh">
      <ThemeToggle />
      <Heading 
        size={{ base: "xl", md: "2xl" }} 
        textAlign="center" 
        color="blue.500"
        px={{ base: 4, md: 0 }}
      >
        Estudiando Japonés N5
      </Heading>
      
      <Text 
        fontSize={{ base: "lg", md: "xl" }} 
        textAlign="center" 
        color="gray.600"
        px={{ base: 4, md: 0 }}
      >
        Pon a prueba tus conocimientos de vocabulario japonés con este quiz interactivo
      </Text>

      <Box 
        p={{ base: 4, md: 6 }} 
        borderWidth="1px" 
        borderRadius="lg" 
        w="100%" 
        maxW="600px"
        mx={{ base: 4, md: 0 }}
      >
        <VStack spacing={4} align="stretch">
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">Características:</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>• 20 preguntas de vocabulario</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>• Sistema de puntuación en tiempo real</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>• Retroalimentación inmediata</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>• Explicaciones detalladas</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>• Interfaz adaptativa para móviles</Text>
        </VStack>
      </Box>

      <Button
        leftIcon={<FaPlay />}
        colorScheme="blue"
        size={{ base: "md", md: "lg" }}
        w={{ base: "180px", md: "200px" }}
        onClick={onStart}
      >
        Comenzar Quiz
      </Button>

      <Footer />
    </VStack>
  )
} 
