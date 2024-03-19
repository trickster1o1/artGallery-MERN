import { useDispatch } from "react-redux";
import { logout } from "../features/user";
import { clearCart } from "../features/cart";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogout = (session) => {
    localStorage.removeItem("user");
    dispatch(logout());
    localStorage.removeItem('cart');
    dispatch(clearCart());
    navigate(session ? '/login?session=expired' : '/login');
  };

  return { userLogout };
};
