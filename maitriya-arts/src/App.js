import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Uploads from "./pages/upload";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Order from "./pages/Order";
import Error404 from "./pages/error404";
import AdminPanel from "./pages/Admin";
import ToasterAlert from "./components/ToasterAlert";
import UpdateUser from "./pages/updateUser";

function App() {
  const user = useSelector((state)=>state.userReducer.user);
  return (
    <BrowserRouter>
    <Header />
      <div className="container pt-4">
      <ToasterAlert />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Uploads />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to='/login' />} />
          <Route path="/orders" element={user ? <Order /> : <Navigate to='/login' />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />
          <Route path="/admin" element={!user ? <Navigate to='/login' /> : user.userType !== 'admin' ? <Navigate to='/' /> : <AdminPanel />} />
          <Route path="/setting" element={!user ?  <Navigate to='/login' /> : <UpdateUser />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
