import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .ytp-title-channel, .ytp-title-text, .ytp-title-link {
    display: none !important;
  }
`;

export default GlobalStyle;