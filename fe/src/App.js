import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import HomeAdmin from './pages/HomeAdmin';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  return (
    <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/adminLogin" element={<AdminLogin/>} />
                <Route path="/HomeAdmin" element={<HomeAdmin/>} />
                <Route path="/AboutUs" element={<AboutUs/>} />
                <Route path="/Concact" element={<Contact/>} />
               
           
                    
            </Routes>
        </Router>
  )
}

export default App;
