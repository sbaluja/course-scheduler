import { createGlobalStyle } from "styled-components";

type ThemeType = {
  background: string;
  primary: string;
  secondary: string;
};

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`

    * {
        margin: 0;
	    /* transition: all 100ms ease; */
    }

    body {
        background: ${({ theme }) => theme.background};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
    }
`;

export default GlobalStyle;
