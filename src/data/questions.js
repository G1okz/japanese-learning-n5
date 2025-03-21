export const questions = [
  {
    id: 1,
    question: 'こんにちは',
    options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
    correctAnswer: 'Hola',
    explanation: 'こんにちは (konnichiwa) significa "Hola" en japonés'
  },
  {
    id: 2,
    question: 'さようなら',
    options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
    correctAnswer: 'Adiós',
    explanation: 'さようなら (sayounara) significa "Adiós" en japonés'
  },
  {
    id: 3,
    question: 'ありがとう',
    options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
    correctAnswer: 'Gracias',
    explanation: 'ありがとう (arigatou) significa "Gracias" en japonés'
  },
  {
    id: 4,
    question: 'お願いします',
    options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
    correctAnswer: 'Por favor',
    explanation: 'お願いします (onegaishimasu) significa "Por favor" en japonés'
  }
]

// Función para obtener una pregunta aleatoria
export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length)
  return questions[randomIndex]
}

// Función para obtener una pregunta específica por ID
export const getQuestionById = (id) => {
  return questions.find(q => q.id === id)
} 
