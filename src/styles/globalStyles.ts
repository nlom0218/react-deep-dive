import { createGlobalStyle } from 'styled-components';
import resetStyle from './reset';

const GlobalStyle = createGlobalStyle`
    ${resetStyle}

    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
