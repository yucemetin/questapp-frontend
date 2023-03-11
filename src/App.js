import User from "./components/User/User";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/users/:userId' element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
