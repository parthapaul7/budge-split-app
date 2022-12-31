import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';
import Budget from "./pages/Budget"
import Login from "./pages/Login"


const App = () => {
  return (
	<AppProvider>
		<Router>
        <Routes>
          <Route path="/" element={localStorage.getItem("access")?<Budget/>:<Navigate to="/login"/>} />
		      <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
	</AppProvider>
  )
}

export default App