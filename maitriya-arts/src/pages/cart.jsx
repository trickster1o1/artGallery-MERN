import { useSelector } from "react-redux";
export default function Cart() {
  const cart = useSelector((state) => state.cartReducer.cart);
  return (
    <div>
        {cart.length ? <span>xa</span> : <span>Currently you have no items in you cart! </span>}
    </div>);
}
