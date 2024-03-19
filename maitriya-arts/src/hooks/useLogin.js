import { useState } from "react";
import { login } from "../features/user";
import { addCart } from "../features/cart";
import { useDispatch } from "react-redux";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const userLogin = async (data) => {
    setLoading(true);
    await fetch("http://localhost:4000/api/user/login",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.msg) {
            setError(res.message);
        } 
        else {
            dispatch(login(res));
            dispatch(addCart(res.cart));
            setError(null);
            localStorage.setItem('user', JSON.stringify(res));
            localStorage.setItem("cart", JSON.stringify(res.cart));
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(null);
      });
  };
  return { error, loading, userLogin };
};
