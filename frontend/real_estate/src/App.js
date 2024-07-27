
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
import ManageProperty from './pages/ManageProperty/ManageProperty'
import ViewSingleProperty from './pages/ViewSingleProperty/ViewSingleProperty'
import EditProperty from './pages/EditProperty/EditProperty'
import ListProperties from './pages/ListProperties/ListProperties'
import ListProperty from './pages/ListProperty/ListProperty'


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
        <Route path="list-property" element={<ListProperties/>} />
        <Route path="manage-property" element={<ManageProperty/>} />
        <Route path="list-properties" element={<ListProperty/>} />
        <Route path="view-single-property/:id" element={<ViewSingleProperty/>} />
        <Route path="edit-property/:id" element={<EditProperty/>} />
      </Routes>
      <ToastContainer theme='colored'/>
    </div>
  )
}

export default App
