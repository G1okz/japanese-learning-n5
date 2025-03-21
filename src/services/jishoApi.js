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
  { word: '昨日', reading: 'きのう', translation: 'Ayer' },
  { word: '家族', reading: 'かぞく', translation: 'Familia' },
  { word: '父', reading: 'ちち', translation: 'Padre' },
  { word: '母', reading: 'はは', translation: 'Madre' },
  { word: '兄', reading: 'あに', translation: 'Hermano mayor' },
  { word: '姉', reading: 'あね', translation: 'Hermana mayor' },
  { word: '弟', reading: 'おとうと', translation: 'Hermano menor' },
  { word: '妹', reading: 'いもうと', translation: 'Hermana menor' },
  { word: '病院', reading: 'びょういん', translation: 'Hospital' },
  { word: '銀行', reading: 'ぎんこう', translation: 'Banco' },
  { word: '郵便局', reading: 'ゆうびんきょく', translation: 'Oficina de correos' },
  { word: 'コンビニ', reading: 'コンビニ', translation: 'Tienda de conveniencia' },
  { word: 'スーパー', reading: 'スーパー', translation: 'Supermercado' },
  { word: '公園', reading: 'こうえん', translation: 'Parque' },
  { word: '図書館', reading: 'としょかん', translation: 'Biblioteca' },
  { word: '映画館', reading: 'えいがかん', translation: 'Cine' },
  { word: '電車', reading: 'でんしゃ', translation: 'Tren' },
  { word: 'バス', reading: 'バス', translation: 'Autobús' },
  { word: '自転車', reading: 'じてんしゃ', translation: 'Bicicleta' },
  { word: '駅', reading: 'えき', translation: 'Estación' },
  { word: '空港', reading: 'くうこう', translation: 'Aeropuerto' },
  { word: '服', reading: 'ふく', translation: 'Ropa' },
  { word: 'シャツ', reading: 'シャツ', translation: 'Camisa' },
  { word: 'ズボン', reading: 'ズボン', translation: 'Pantalones' },
  { word: '靴', reading: 'くつ', translation: 'Zapatos' },
  { word: '帽子', reading: 'ぼうし', translation: 'Sombrero' },
  { word: '食べる', reading: 'たべる', translation: 'Comer' },
  { word: '飲む', reading: 'のむ', translation: 'Beber' },
  { word: '見る', reading: 'みる', translation: 'Ver' },
  { word: '聞く', reading: 'きく', translation: 'Escuchar' },
  { word: '読む', reading: 'よむ', translation: 'Leer' },
  { word: '書く', reading: 'かく', translation: 'Escribir' },
  { word: '行く', reading: 'いく', translation: 'Ir' },
  { word: '来る', reading: 'くる', translation: 'Venir' },
  { word: '買う', reading: 'かう', translation: 'Comprar' },
  { word: '売る', reading: 'うる', translation: 'Vender' },
  { word: '暑い', reading: 'あつい', translation: 'Caliente (clima)' },
  { word: '寒い', reading: 'さむい', translation: 'Frío' },
  { word: '楽しい', reading: 'たのしい', translation: 'Divertido' },
  { word: '悲しい', reading: 'かなしい', translation: 'Triste' },
  { word: '面白い', reading: 'おもしろい', translation: 'Interesante' },
  { word: '難しい', reading: 'むずかしい', translation: 'Difícil' },
  { word: '易しい', reading: 'やさしい', translation: 'Fácil' },
  { word: '忙しい', reading: 'いそがしい', translation: 'Ocupado' },
  { word: '一', reading: 'いち', translation: 'Uno' },
  { word: '二', reading: 'に', translation: 'Dos' },
  { word: '三', reading: 'さん', translation: 'Tres' },
  { word: '四', reading: 'よん', translation: 'Cuatro' },
  { word: '五', reading: 'ご', translation: 'Cinco' },
  { word: '春', reading: 'はる', translation: 'Primavera' },
  { word: '夏', reading: 'なつ', translation: 'Verano' },
  { word: '秋', reading: 'あき', translation: 'Otoño' },
  { word: '冬', reading: 'ふゆ', translation: 'Invierno' },

  // Nuevas palabras
  // Profesiones
  { word: '医者', reading: 'いしゃ', translation: 'Médico' },
  { word: '看護師', reading: 'かんごし', translation: 'Enfermero/a' },
  { word: '警察官', reading: 'けいさつかん', translation: 'Policía' },
  { word: '消防士', reading: 'しょうぼうし', translation: 'Bombero' },
  { word: '会社員', reading: 'かいしゃいん', translation: 'Oficinista' },
  { word: '店員', reading: 'てんいん', translation: 'Dependiente' },
  { word: '料理人', reading: 'りょうりにん', translation: 'Cocinero' },
  { word: '運転手', reading: 'うんてんしゅ', translation: 'Conductor' },

  // Comida y bebida adicional
  { word: '寿司', reading: 'すし', translation: 'Sushi' },
  { word: 'ラーメン', reading: 'ラーメン', translation: 'Ramen' },
  { word: 'うどん', reading: 'うどん', translation: 'Udon' },
  { word: 'そば', reading: 'そば', translation: 'Soba' },
  { word: '味噌汁', reading: 'みそしる', translation: 'Sopa de miso' },
  { word: '納豆', reading: 'なっとう', translation: 'Natto' },
  { word: '豆腐', reading: 'とうふ', translation: 'Tofu' },
  { word: '餃子', reading: 'ぎょうざ', translation: 'Gyoza' },
  { word: '天ぷら', reading: 'てんぷら', translation: 'Tempura' },
  { word: 'お好み焼き', reading: 'おこのみやき', translation: 'Okonomiyaki' },

  // Ropa adicional
  { word: 'Tシャツ', reading: 'Tシャツ', translation: 'Camiseta' },
  { word: 'セーター', reading: 'セーター', translation: 'Suéter' },
  { word: 'コート', reading: 'コート', translation: 'Abrigo' },
  { word: 'スカート', reading: 'スカート', translation: 'Falda' },
  { word: 'ワンピース', reading: 'ワンピース', translation: 'Vestido' },
  { word: 'ネクタイ', reading: 'ネクタイ', translation: 'Corbata' },
  { word: '手袋', reading: 'てぶくろ', translation: 'Guantes' },
  { word: 'マフラー', reading: 'マフラー', translation: 'Bufanda' },

  // Verbos adicionales
  { word: '歩く', reading: 'あるく', translation: 'Caminar' },
  { word: '走る', reading: 'はしる', translation: 'Correr' },
  { word: '泳ぐ', reading: 'およぐ', translation: 'Nadar' },
  { word: '寝る', reading: 'ねる', translation: 'Dormir' },
  { word: '起きる', reading: 'おきる', translation: 'Despertarse' },
  { word: '着る', reading: 'きる', translation: 'Ponerse (ropa)' },
  { word: '脱ぐ', reading: 'ぬぐ', translation: 'Quitarse (ropa)' },
  { word: '開ける', reading: 'あける', translation: 'Abrir' },
  { word: '閉める', reading: 'しめる', translation: 'Cerrar' },
  { word: '入る', reading: 'はいる', translation: 'Entrar' },
  { word: '出る', reading: 'でる', translation: 'Salir' },
  { word: '待つ', reading: 'まつ', translation: 'Esperar' },
  { word: '座る', reading: 'すわる', translation: 'Sentarse' },
  { word: '立つ', reading: 'たつ', translation: 'Levantarse' },
  { word: '話す', reading: 'はなす', translation: 'Hablar' },

  // Adjetivos adicionales
  { word: '明るい', reading: 'あかるい', translation: 'Brillante' },
  { word: '暗い', reading: 'くらい', translation: 'Oscuro' },
  { word: '長い', reading: 'ながい', translation: 'Largo' },
  { word: '短い', reading: 'みじかい', translation: 'Corto' },
  { word: '広い', reading: 'ひろい', translation: 'Ancho' },
  { word: '狭い', reading: 'せまい', translation: 'Estrecho' },
  { word: '重い', reading: 'おもい', translation: 'Pesado' },
  { word: '軽い', reading: 'かるい', translation: 'Ligero' },
  { word: '甘い', reading: 'あまい', translation: 'Dulce' },
  { word: '辛い', reading: 'からい', translation: 'Picante' },
  { word: '塩辛い', reading: 'しおからい', translation: 'Salado' },
  { word: '酸っぱい', reading: 'すっぱい', translation: 'Ácido' },

  // Números adicionales
  { word: '六', reading: 'ろく', translation: 'Seis' },
  { word: '七', reading: 'なな', translation: 'Siete' },
  { word: '八', reading: 'はち', translation: 'Ocho' },
  { word: '九', reading: 'きゅう', translation: 'Nueve' },
  { word: '十', reading: 'じゅう', translation: 'Diez' },

  // Días de la semana
  { word: '月曜日', reading: 'げつようび', translation: 'Lunes' },
  { word: '火曜日', reading: 'かようび', translation: 'Martes' },
  { word: '水曜日', reading: 'すいようび', translation: 'Miércoles' },
  { word: '木曜日', reading: 'もくようび', translation: 'Jueves' },
  { word: '金曜日', reading: 'きんようび', translation: 'Viernes' },
  { word: '土曜日', reading: 'どようび', translation: 'Sábado' },
  { word: '日曜日', reading: 'にちようび', translation: 'Domingo' },

  // Meses
  { word: '一月', reading: 'いちがつ', translation: 'Enero' },
  { word: '二月', reading: 'にがつ', translation: 'Febrero' },
  { word: '三月', reading: 'さんがつ', translation: 'Marzo' },
  { word: '四月', reading: 'しがつ', translation: 'Abril' },
  { word: '五月', reading: 'ごがつ', translation: 'Mayo' },
  { word: '六月', reading: 'ろくがつ', translation: 'Junio' },
  { word: '七月', reading: 'しちがつ', translation: 'Julio' },
  { word: '八月', reading: 'はちがつ', translation: 'Agosto' },
  { word: '九月', reading: 'くがつ', translation: 'Septiembre' },
  { word: '十月', reading: 'じゅうがつ', translation: 'Octubre' },
  { word: '十一月', reading: 'じゅういちがつ', translation: 'Noviembre' },
  { word: '十二月', reading: 'じゅうにがつ', translation: 'Diciembre' },

  // Naturaleza
  { word: '山', reading: 'やま', translation: 'Montaña' },
  { word: '川', reading: 'かわ', translation: 'Río' },
  { word: '海', reading: 'うみ', translation: 'Mar' },
  { word: '空', reading: 'そら', translation: 'Cielo' },
  { word: '星', reading: 'ほし', translation: 'Estrella' },
  { word: '月', reading: 'つき', translation: 'Luna' },
  { word: '太陽', reading: 'たいよう', translation: 'Sol' },
  { word: '雲', reading: 'くも', translation: 'Nube' },
  { word: '雨', reading: 'あめ', translation: 'Lluvia' },
  { word: '雪', reading: 'ゆき', translation: 'Nieve' },
  { word: '風', reading: 'かぜ', translation: 'Viento' },
  { word: '花', reading: 'はな', translation: 'Flor' },
  { word: '木', reading: 'き', translation: 'Árbol' },
  { word: '草', reading: 'くさ', translation: 'Hierba' },
  { word: '森', reading: 'もり', translation: 'Bosque' },

  // Animales adicionales
  { word: '鳥', reading: 'とり', translation: 'Pájaro' },
  { word: '魚', reading: 'さかな', translation: 'Pez' },
  { word: '虫', reading: 'むし', translation: 'Insecto' },
  { word: '蝶', reading: 'ちょう', translation: 'Mariposa' },
  { word: '蜂', reading: 'はち', translation: 'Abeja' },
  { word: '蟻', reading: 'あり', translation: 'Hormiga' },
  { word: '蜘蛛', reading: 'くも', translation: 'Araña' },
  { word: '蛇', reading: 'へび', translation: 'Serpiente' },
  { word: '蛙', reading: 'かえる', translation: 'Rana' },
  { word: '亀', reading: 'かめ', translation: 'Tortuga' }
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
    'Corro', 'Corres', 'Corre', 'Corren', 'Me despierto', 'Te despiertas', 'Se despierta', 'Se despiertan',
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
