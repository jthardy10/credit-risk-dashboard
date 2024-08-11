import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Dashboard />
      </Container>
    </>
  );
}

export default App;
