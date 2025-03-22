import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Container: {
      baseStyle: (props) => ({
        bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
        borderRadius: 'lg',
        boxShadow: props.colorMode === 'dark' ? 'lg' : 'md',
      }),
    },
    Box: {
      baseStyle: (props) => ({
        bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
      }),
    },
    Heading: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      }),
    },
    Text: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'gray.200' : 'gray.600',
      }),
    },
    Badge: {
      baseStyle: (props) => ({
        bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.100',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      }),
    },
  },
})

export default theme 
