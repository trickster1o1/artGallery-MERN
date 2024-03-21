import { useState } from "react";
import { addCart } from "../features/cart";
import { addNotification } from "../features/notif";
import { useDispatch } from "react-redux";
export const useAddCart = () => {
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const setCart = async (product_id, token) => {
    await fetch("http://localhost:4000/api/cart", {
      method: "PATCH",
      body: JSON.stringify({
        product_id,
        qty: 1,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(error);
          dispatch(addNotification({ msg: res.error, status: "error" , show: true, time: Date.now()}));
        } else if (res.msg && res.msg === "success") {
          dispatch(addCart(res.cart.cart));
          dispatch(
            addNotification({ msg: "Added to cart!", status: "success", show: true, time: Date.now() })
          );
          localStorage.setItem("cart", JSON.stringify(res.cart.cart));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(addNotification({ msg: 'server issue', status: "error" , show: true, time: Date.now()}));
      });
  };

  return { error, setCart };
};
