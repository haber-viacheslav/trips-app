import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { Main } from './components/UI/Main/Main';
import { Section } from './components/UI/Section/Section';
import { Container } from './components/UI/Container/Container';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Section>
          <Container>Trips App</Container>
        </Section>
      </Main>
    </ThemeProvider>
  );
}
