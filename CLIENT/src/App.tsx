import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
// import About from './pages/About';
// import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout ></Layout>} />
        <Route path='/search' element={<>search page</>} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
