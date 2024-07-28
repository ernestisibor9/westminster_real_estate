
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Routes, Route, Navigate  } from 'react-router-dom'
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
import Footer from './component/Footer/Footer'
import Services from './pages/Services/Services'
import Contact from './pages/Contact/Contact'
import PropertyDetails from './pages/PropertyDetails/PropertyDetails'
import EmailConfirm from './component/EmailConfirm/EmailConfirm'


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="about" element={<About/>} />
        <Route path="register" element={<PublicRoutes><Register/></PublicRoutes> } />
        <Route path="login" element={<PublicRoutes><Login/></PublicRoutes>} />
        <Route path="dashboard" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
        <Route path="add-property" element={<ProtectedRoutes><AddProperty/></ProtectedRoutes>} />
        <Route path="list-property" element={<ListProperties/>} />
        <Route path="manage-property" element={<ProtectedRoutes><ManageProperty/></ProtectedRoutes>} />
        <Route path="list-properties" element={<ProtectedRoutes><ListProperty/></ProtectedRoutes>} />
        <Route path="contact" element={<Contact/>} />
        <Route path="services" element={<Services/>} />
        <Route path="/email-confirmed" element={<EmailConfirm/>} />
        <Route path="property-details/:id" element={<PropertyDetails/>} />
        <Route path="view-single-property/:id" element={<ProtectedRoutes><ViewSingleProperty/></ProtectedRoutes>} />
        <Route path="edit-property/:id" element={<ProtectedRoutes><EditProperty/></ProtectedRoutes>} />
        
      </Routes>
      <Footer/>
      <ToastContainer theme='colored'/>
    </div>
  )
}



// Function to protect the route from unauthorized users
export function ProtectedRoutes({children}) {
  const user = localStorage.getItem('user');
  if(user !== "" && user){
    return children
  }
  else{
    return <Navigate to = '/login'/>
  }
}


// Public routes - when a user already login, he or she shouldn't have access to te login or regiser pages again

export function PublicRoutes({children}) {
  const user = localStorage.getItem('user');
  if(user !== "" && user){
    return <Navigate to = '/'/>
  }
  else{
    return children
  }
}

export default App
