import React, { Component } from 'react';
import Test from './pages/Test';
import { Normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden;
  }
`
class App extends Component {
  render() {
    return (
      <>
        <Normalize/>
        <GlobalStyle/>
        <Test/>
      </>
    );
  }
}

export default App;
