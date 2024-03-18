import { useDispatch } from "react-redux";
import { logout } from "../features/user";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate('/login?session=expired');
  };

  return { userLogout };
};
