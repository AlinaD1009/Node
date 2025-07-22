import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DreamDetail from './components/DreamDetail';
import UserDream from './components/UserDream';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dreams/:id" element={<DreamDetail />} />
        <Route path="/users/:uid/dreams" element={<UserDream />} />
      </Routes>
    </Router>
  );
}

export default App;
