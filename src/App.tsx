import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import QuizContainer from './QuizContainer';

//npm deploy or npm run deploy

const theme = createTheme({
  palette: {
    primary: {
      main: '#8c81f3'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
          <QuizContainer/>
      </div>
    </ThemeProvider>
  );
}

export default App;
