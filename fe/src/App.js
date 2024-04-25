
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import HomeAdmin from './pages/HomeAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  return (
    <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/adminLogin" element={<AdminLogin/>} />
                <Route path="/HomeAdmin" element={<HomeAdmin/>} />
               
           
                    
            </Routes>
        </Router>
  )
}

export default App;
