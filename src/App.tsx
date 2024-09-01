import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {Logout} from './pages/Logout'
import {Navbar} from './components/navbar'
import {CreatePost} from './pages/create_post/create_post' 
import {Post} from './pages/Post'

function App() {
  return (
    <div className="App">
      

      <Router>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/create_post" element={<CreatePost/>} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="*" element={(<p>page's missing</p>)} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
