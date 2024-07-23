
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard/Dashboard'
import AddProperty from './pages/AddProperty/AddProperty'


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="about" element={<About/>} />
        <Route path="register" element={<Register/>} />
        <Route path="login" element={<Login/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="add-property" element={<AddProperty/>} />
      </Routes>
      <ToastContainer theme='colored'/>
    </div>
  )
}

export default App
