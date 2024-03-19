import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart";
import ToasterAlert from "../components/ToasterAlert";
import { Image } from "react-bootstrap";
import { useRemoveCart } from "../hooks/useRemoveCart";
import { addNotification } from "../features/notif";
import { useEffect } from "react";

export default function Cart() {
  const cart = useSelector((state) => state.cartReducer.cart);

  useEffect(()=> {
    console.log(cart);
  }, [])
  const dispatch = useDispatch();
  const { rmvBuff, rmvCart } = useRemoveCart();
  const user = useSelector(state => state.userReducer.user);
  const getTotal = () => {
    let t = 0;
    cart.forEach((c) => {
      t += Number(c.product_id.price);
    });
    return t;
  };

  const emptyCart = async () => {
    await fetch(`http://localhost:4000/api/cart`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${user.token}`,
      }
    }).then((res)=>res.json()).then(res=>{
      localStorage.removeItem('cart');
      dispatch(clearCart());
      dispatch(addNotification({ msg: 'Cart Cleared!', status: "success" , show: true, time: Date.now()}));

    })
  }
  return (
    <div>
      <ToasterAlert />

      {cart.length ? (
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" width="5%">
                  #
                </th>
                <th scope="col">Product</th>
                <th scope="col" className="text-center">
                  Title
                </th>
                <th scope="col" className="text-end">
                  Price
                </th>
                <th scope="col" className="text-end"></th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {cart.map((c, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ width: "30em" }}>
                    <figure className="figure">
                      <Image
                        src={c.product_id.image}
                        className="figure-img img-fluid rounded"
                        style={{ width: "17em" }}
                      />
                      <figcaption className="figure-caption">
                        {c.product_id.description}
                      </figcaption>
                    </figure>
                  </td>
                  <td
                    className="text-center align-middle"
                    style={{ fontSize: "14pt" }}
                  >
                    {c.product_id.title}
                  </td>
                  <td className="text-end align-middle fw-bold text-danger">
                    Npr.{c.product_id.price}
                  </td>
                  <td className="text-end align-middle">
                    <span
                      class="material-symbols-outlined text-danger"
                      role="button"
                      title="Delete"
                      onClick={() => rmvCart(c.product_id._id)}
                    >
                      close
                    </span>
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row"></th>
                <td className="align-middle fw-bold" colSpan={"2"}>
                  Total
                </td>
                <td className="text-end align-middle fw-bold text-danger">
                  Npr.{getTotal()}
                </td>
                <td className="text-end">
                  <span>
                    <button
                      className="btn btn-primary"
                      style={{ width: "7em", marginBottom: "5px" }}
                    >
                      Checkout
                    </button>
                    <br />
                    <button className="btn btn-danger" style={{ width: "7em" }} onClick={emptyCart}>
                      Clear
                    </button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <span className="d-block h3 text-lg-center fw-bold text-secondary">
          Currently you have no items in you cart!{" "}
        </span>
      )}
    </div>
  );
}
