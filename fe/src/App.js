
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  return (
    <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/adminLogin" element={<AdminLogin/>} />
               
           
                    
            </Routes>
        </Router>
  )
}

export default App;
