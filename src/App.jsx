// src/App.jsx
import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddOrUpdateStudent from './pages/AddOrUpadteStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add-student" element={<AddOrUpdateStudent />} />
          <Route path="edit-student/:id" element={<AddOrUpdateStudent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
