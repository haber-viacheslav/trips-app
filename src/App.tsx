import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { Header } from './components/UI/Header/Header';
import { Main } from './components/UI/Main/Main';
import { Section } from './components/UI/Section/Section';
import { Container } from './components/UI/Container/Container';
import { HiddenTitle } from './components/UI/HiddenTitle/HіddenTitle';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main>
        <Section>
          <Container>
            <HiddenTitle text="Trips" />
          </Container>
        </Section>
      </Main>
      <SpeedInsights />
    </ThemeProvider>
  );
}
