import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import HomeLayout from './components/layouts/HomeLayout/HomeLayout';
import AboutPage from './components/pages/AboutPage/AboutPage';
import LoginLayout from './components/layouts/LoginLayout/LoginLayout';
import LoginPage from './components/pages/LoginPage/LoginPage';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<HomePage/>}></Route>
          <Route path='about' element={<AboutPage/>}></Route>
        </Route>
        <Route path='/login-layout' element={<LoginLayout/>}>
          <Route index element={<LoginPage/>}></Route>
          <Route path='register' element={<RegisterPage/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
