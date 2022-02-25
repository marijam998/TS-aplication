import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navigation from './components/Navigation';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import Message from './components/Message';

const App: React.FunctionComponent = ({ }) => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="*" element={<Message />} />
      </Routes>
    </>
  )

}

export default App;

