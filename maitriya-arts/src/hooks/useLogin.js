import { useState } from "react";
import { login } from "../features/user";
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
            setError(null);
            localStorage.setItem('user', JSON.stringify(res));
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
