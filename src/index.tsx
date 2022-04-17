import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react'
import myTheme from "./theme/theme";

const appElement =  document.getElementById('root')

ReactDOM.render(
    <ChakraProvider theme={myTheme}>
        <App />
    </ChakraProvider>, appElement
)
