import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './i18n/';

import Header from './components/common/Header/header';
import ErrorPage from './components/common/ErrorPage/error-page';
import Login from './components/Login/login';
import Register from './components/Register/register';
import HomePage from './components/HomePage/home-page';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Header />

          <main>
            <Routes>
              <Route path='/' element={<Login />} errorElement={<ErrorPage />} />
              <Route path='/signup' element={<Register />} errorElement={<ErrorPage />} />
              <Route path='/home' element={<HomePage />} errorElement={<ErrorPage />} />
            </Routes>
          </main>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
