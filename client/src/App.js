import { ChakraProvider } from '@chakra-ui/react';
import {Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar.js";
import HomePage from './components/HomePage.js';
import AboutPage from './components/AboutPage.js';
import CoursesPage from './components/CoursesPage.js';


function App() {
  return (
    <ChakraProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/courses' element={<CoursesPage />} />
        </Routes>
    </ChakraProvider>
  );
}

export default App;
