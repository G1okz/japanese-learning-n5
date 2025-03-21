const JISHO_API_URL = 'https://jisho.org/api/v1/search/words'
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

// Lista de palabras comunes del nivel N5 con sus traducciones directas
const n5Words = [
  { word: '私', reading: 'わたし', translation: 'Yo' },
  { word: 'あなた', reading: 'あなた', translation: 'Tú' },
  { word: '本', reading: 'ほん', translation: 'Libro' },
  { word: '学校', reading: 'がっこう', translation: 'Escuela' },
  { word: '先生', reading: 'せんせい', translation: 'Profesor' },
  { word: '学生', reading: 'がくせい', translation: 'Estudiante' },
  { word: '食べ物', reading: 'たべもの', translation: 'Comida' },
  { word: '飲み物', reading: 'のみもの', translation: 'Bebida' },
  { word: '水', reading: 'みず', translation: 'Agua' },
  { word: 'お茶', reading: 'おちゃ', translation: 'Té' },
  { word: 'コーヒー', reading: 'コーヒー', translation: 'Café' },
  { word: '家', reading: 'いえ', translation: 'Casa' },
  { word: '猫', reading: 'ねこ', translation: 'Gato' },
  { word: '犬', reading: 'いぬ', translation: 'Perro' },
  { word: '大きい', reading: 'おおきい', translation: 'Grande' },
  { word: '小さい', reading: 'ちいさい', translation: 'Pequeño' },
  { word: '新しい', reading: 'あたらしい', translation: 'Nuevo' },
  { word: '古い', reading: 'ふるい', translation: 'Viejo' },
  { word: '高い', reading: 'たかい', translation: 'Caro' },
  { word: '安い', reading: 'やすい', translation: 'Barato' },
  { word: '魚', reading: 'さかな', translation: 'Pescado' },
  { word: '肉', reading: 'にく', translation: 'Carne' },
  { word: '卵', reading: 'たまご', translation: 'Huevo' },
  { word: '米', reading: 'こめ', translation: 'Arroz' },
  { word: 'パン', reading: 'パン', translation: 'Pan' },
  { word: '牛乳', reading: 'ぎゅうにゅう', translation: 'Leche' },
  { word: '果物', reading: 'くだもの', translation: 'Fruta' },
  { word: '野菜', reading: 'やさい', translation: 'Verdura' },
  { word: '朝', reading: 'あさ', translation: 'Mañana' },
  { word: '昼', reading: 'ひる', translation: 'Mediodía' },
  { word: '夜', reading: 'よる', translation: 'Noche' },
  { word: '今日', reading: 'きょう', translation: 'Hoy' },
  { word: '明日', reading: 'あした', translation: 'Mañana' },
  { word: '昨日', reading: 'きのう', translation: 'Ayer' }
]

// Array para mantener un registro de las palabras usadas
let usedWords = []

export const resetUsedWords = () => {
  usedWords = []
}

export const getRandomWord = async (questionNumber) => {
  try {
    // Si no hay palabras disponibles, reiniciar el registro
    if (usedWords.length >= n5Words.length) {
      resetUsedWords()
    }

    // Obtener una palabra aleatoria que no haya sido usada
    let availableWords = n5Words.filter(word => !usedWords.includes(word))
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)]
    usedWords.push(randomWord)

    // Determinar si la pregunta debe ser en japonés o español
    const isJapaneseQuestion = questionNumber <= 10

    if (isJapaneseQuestion) {
      // Pregunta en japonés, opciones en español
      const options = [
        getRandomN5Word(),
        getRandomN5Word(),
        getRandomN5Word()
      ]
      options.push(randomWord.translation)

      return {
        id: randomWord.word,
        question: randomWord.word,
        reading: randomWord.reading,
        options: shuffleArray(options),
        correctAnswer: randomWord.translation,
        explanation: `${randomWord.word} (${randomWord.reading}) significa "${randomWord.translation}" en japonés`,
        type: 'Palabra',
        level: 'N5'
      }
    } else {
      // Pregunta en español, opciones en japonés
      const options = [
        getRandomJapaneseWord(),
        getRandomJapaneseWord(),
        getRandomJapaneseWord()
      ]
      options.push(randomWord.word)

      return {
        id: randomWord.word,
        question: randomWord.translation,
        reading: randomWord.reading,
        options: shuffleArray(options),
        correctAnswer: randomWord.word,
        explanation: `${randomWord.translation} se dice "${randomWord.word}" (${randomWord.reading}) en japonés`,
        type: 'Palabra',
        level: 'N5'
      }
    }
  } catch (error) {
    console.error('Error in getRandomWord:', error)
    return null
  }
}

const getRandomJapaneseWord = () => {
  const availableWords = n5Words.filter(word => !usedWords.includes(word))
  if (availableWords.length === 0) {
    resetUsedWords()
    return n5Words[Math.floor(Math.random() * n5Words.length)].word
  }
  return availableWords[Math.floor(Math.random() * availableWords.length)].word
}

const getRandomN5Word = () => {
  const n5Translations = [
    'Soy', 'Eres', 'Es', 'Son', 'Estoy', 'Estás', 'Está', 'Están',
    'Tengo', 'Tienes', 'Tiene', 'Tienen', 'Voy', 'Vas', 'Va', 'Van',
    'Compro', 'Compras', 'Compra', 'Compran', 'Vendo', 'Vendes', 'Vende', 'Venden',
    'Hago', 'Haces', 'Hace', 'Hacen', 'Uso', 'Usas', 'Usa', 'Usan',
    'Espero', 'Esperas', 'Espera', 'Esperan', 'Camino', 'Caminas', 'Camina', 'Caminan',
    'Corro', 'Corres', 'Corre', 'Corren', 'Nado', 'Nadas', 'Nada', 'Nadan',
    'Duermo', 'Duermes', 'Duerme', 'Duermen', 'Me despierto', 'Te despiertas', 'Se despierta', 'Se despiertan',
    'Me pongo', 'Te pones', 'Se pone', 'Se ponen', 'Me quito', 'Te quitas', 'Se quita', 'Se quitan',
    'Abro', 'Abres', 'Abre', 'Abren', 'Cierro', 'Cierras', 'Cierra', 'Cierran',
    'Entro', 'Entras', 'Entra', 'Entran', 'Salgo', 'Sales', 'Sale', 'Salen',
    'Gato', 'Perro', 'Pájaro', 'Pez', 'Flor', 'Árbol', 'Montaña', 'Río',
    'Mar', 'Cielo', 'Libro', 'Papel', 'Lápiz', 'Escritorio', 'Silla', 'Ventana',
    'Puerta', 'Casa', 'Escuela', 'Empresa', 'Hospital', 'Banco', 'Oficina de correos',
    'Supermercado', 'Tienda de conveniencia', 'Yo', 'Tú', 'Él', 'Ella', 'Amigo',
    'Profesor', 'Estudiante', 'Oficinista', 'Médico', 'Policía',
    'Bombero', 'Comida', 'Bebida', 'Arroz', 'Pan', 'Leche', 'Agua',
    'Té', 'Café', 'Fruta', 'Verdura', 'Carne', 'Pescado', 'Huevo',
    'Mañana', 'Tarde', 'Noche', 'Hoy', 'Mañana', 'Ayer',
    'Esta semana', 'La próxima semana', 'La semana pasada', 'Este mes', 'El próximo mes',
    'El mes pasado', 'Primavera', 'Verano', 'Otoño', 'Invierno', 'Grande', 'Pequeño',
    'Nuevo', 'Viejo', 'Caro', 'Barato', 'Caliente', 'Frío', 'Divertido', 'Triste',
    'Interesante', 'Difícil', 'Fácil', 'Ocupado', 'Tiempo libre', 'Arriba', 'Abajo',
    'Adelante', 'Atrás', 'Izquierda', 'Derecha', 'Dentro', 'Fuera', 'Cerca', 'Lejos',
    'Estación', 'Parada de autobús', 'Intersección', 'Semáforo', 'Parque', 'Biblioteca',
    'Cine'
  ]
  return n5Translations[Math.floor(Math.random() * n5Translations.length)]
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
} 
