import User from "./components/User/User";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/users/:userId' element={<User />} />
        <Route exact path='/login' element={localStorage.getItem("currentUser") != null ? <Home /> : <Login />} />
        <Route exact path='/register' element={localStorage.getItem("currentUser") != null ? <Home /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
