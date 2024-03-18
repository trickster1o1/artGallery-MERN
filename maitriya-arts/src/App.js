import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Uploads from "./pages/upload";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Order from "./pages/Order";

function App() {
  const user = useSelector((state)=>state.userReducer.user);
  return (
    <BrowserRouter>
    <Header />
      <div className="container pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Uploads />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to='/login' />} />
          <Route path="/orders" element={user ? <Order /> : <Navigate to='/login' />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
