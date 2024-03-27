import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAddCart } from "../hooks/useAddCart";
import { HmacSHA256 } from "crypto-js";
import Base64 from "crypto-js/enc-base64";
import { addNotification } from "../features/notif";
import { addCart } from "../features/cart";

export default function Home() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rowA, setRowA] = useState([]);
  const [rowB, setRowB] = useState([]);
  const [rowC, setRowC] = useState([]);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const navigator = useNavigate();
  const { setCart } = useAddCart();
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (urlParams.has("order")) {
      const getCart = async () => {
        await fetch(`${process.env.REACT_APP_API}/api/cart`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            dispatch(addCart(res.cart.length ? res.cart : []));
          })
          .catch((err) => console.log(err));
      };

      if (urlParams.get("order") === "success") {
        dispatch(
          addNotification({
            msg: "Order has been placed!",
            status: "success",
            show: true,
            time: Date.now(),
          })
        );
        getCart();
      } else {
        dispatch(
          addNotification({
            msg: urlParams.get("order"),
            status: "error",
            show: true,
            time: Date.now(),
          })
        );
      }
    }
  }, []);
  // const orderProduct = async (e, price, id) => {
  //   e.preventDefault();
  //   await fetch(`${process.env.REACT_APP_API}/api/order`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${user.token}`,
  //     },
  //     body: JSON.stringify({ id, price }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.error && res.error === "jwt expired") {
  //         userLogout("expired");
  //       } else if (res.msg && res.msg === "sucess") {
  //         console.log("ok");
  //       }
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const mouseOverAction = (r, status) => {
  //   if(status) {
  //     setFadeRating(r);
  //   } else {
  //     setFadeRating(rating);
  //   }

  //   console.log(rating)
  // }

  const ratingSetter = (r) => {
    if (r === rating) {
      setRating(0);
    } else {
      setRating(r);
    }
  };

  const addToCart = (id) => {
    setCart(id, user.token);
  };

  function OffCan({ title, img, description, id, price, reviews }) {
    return (
      <Offcanvas
        show={show === id ? true : false}
        onHide={() => setShow(false)}
        placement={"end"}
        style={{ width: "40%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="pb-4">
            <img src={img} alt="" className="i-fit" />
          </div>
          {description} <br />
          <span className="price-span">Rs.{price}</span>
          <div className="btn-cont">
            {/* <button className={user ? "btn btn-danger" : "btn btn-secondary"} onClick={!user ? ()=>navigator('/login') : null}>Buy</button> */}
            <form
              // onSubmit={(e)=>orderProduct(e,price, id)}
              action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
              method="POST"
              className="d-inline"
              style={{ marginRight: "5px" }}
            >
              <input
                type="hidden"
                id="amount"
                name="amount"
                value={price}
                required
              />
              <input
                type="hidden"
                id="tax_amount"
                name="tax_amount"
                value="0"
                required
              />
              <input
                type="hidden"
                id="total_amount"
                name="total_amount"
                value={price}
                required
              />
              <input
                type="hidden"
                id="transaction_uuid"
                name="transaction_uuid"
                value={id + "-" + Date.now()}
                required
              />
              <input
                type="hidden"
                id="product_code"
                name="product_code"
                value="EPAYTEST"
                required
              />
              <input
                type="hidden"
                id="product_service_charge"
                name="product_service_charge"
                value="0"
                required
              />
              <input
                type="hidden"
                id="product_delivery_charge"
                name="product_delivery_charge"
                value="0"
                required
              />
              <input
                type="hidden"
                id="success_url"
                name="success_url"
                value={`${process.env.REACT_APP_API}/api/order/${id}/${
                  user ? user.username : "null"
                }`}
                required
              />
              <input
                type="hidden"
                id="failure_url"
                name="failure_url"
                value={`${process.env.REACT_APP_URL}?order=failed`}
                required
              />
              <input
                type="hidden"
                id="signed_field_names"
                name="signed_field_names"
                value="total_amount,transaction_uuid,product_code"
                required
              />
              <input
                type="hidden"
                id="signature"
                name="signature"
                value={Base64.stringify(
                  HmacSHA256(
                    "total_amount=" +
                      price +
                      "," +
                      "transaction_uuid=" +
                      id +
                      "-" +
                      Date.now() +
                      "," +
                      "product_code=EPAYTEST",
                    "8gBm/:&EnhH.1/q"
                  )
                )}
                required
              />
              <input
                value="Buy"
                type="submit"
                className={user ? "btn btn-danger" : "btn btn-secondary"}
              />
            </form>
            <button
              className={user ? "btn btn-primary" : "btn btn-secondary"}
              onClick={!user ? () => navigator("/login") : () => addToCart(id)}
            >
              Cart
            </button>
          </div>
          <div className="rating-cont">
            <span>Give your rating</span>
            <span>
              <span
                className={
                  rating >= 1
                    ? "material-symbols-outlined custom-star star-active"
                    : "material-symbols-outlined custom-star star-un"
                }
                // onMouseOver={()=>mouseOverAction(1, true)}
                // onMouseLeave={()=>mouseOverAction(1, false)}
                onClick={() => ratingSetter(1)}
              >
                star
              </span>
              <span
                className={
                  rating >= 2
                    ? "material-symbols-outlined custom-star star-active"
                    : "material-symbols-outlined custom-star star-un"
                }
                onClick={() => ratingSetter(2)}
              >
                star
              </span>
              <span
                className={
                  rating >= 3
                    ? "material-symbols-outlined custom-star star-active"
                    : "material-symbols-outlined custom-star star-un"
                }
                onClick={() => ratingSetter(3)}
              >
                star
              </span>
              <span
                className={
                  rating >= 4
                    ? "material-symbols-outlined custom-star star-active"
                    : "material-symbols-outlined custom-star star-un"
                }
                onClick={() => ratingSetter(4)}
              >
                star
              </span>
              <span
                className={
                  rating >= 5
                    ? "material-symbols-outlined custom-star star-active"
                    : "material-symbols-outlined custom-star star-un"
                }
                onClick={() => ratingSetter(5)}
              >
                star
              </span>
            </span>
          </div>
          <div className="feedback-cont">
            Give your feedback <br />
            <textarea></textarea>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary"
                onClick={!user ? () => navigator("/login") : null}
              >
                Post
              </button>
            </div>
            {reviews.length ? (
              <div>
                <span className="font-weight-bold">Reviews</span> <br />
                {reviews.map((r, index) => (
                  <div key={"r_" + index}>{r.review}</div>
                ))}
              </div>
            ) : null}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  let i = 0;
  let j = 1;
  useEffect(() => {
    const getProducts = async () => {
      await fetch("http://localhost:4000/api/product")
        .then((res) => res.json())
        .then((res) => {
          setProducts(res);
          console.log(res.length);
          res.forEach((r) => {
            i += 1;
            if (i <= res.length) {
              if (j === 1) {
                setRowA((initRow) => [...initRow, r]);
              }
              if (j === 2) {
                setRowB((initRow) => [...initRow, r]);
              }
              if (j === 3) {
                setRowC((initRow) => [...initRow, r]);
              }

              j = j >= 3 ? 1 : j + 1;
            }
          });
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    getProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="grow" variant="dark" />
        </div>
      ) : products ? (
        products.length ? (
          <div className="row">
            <div
              className="col-md-4"
              style={{ paddingRight: "5px", paddingLeft: "5px" }}
            >
              {rowA.map((p, key) => (
                <div className="mb-2" key={key} style={{ paddingBottom: "0" }}>
                  <img
                    src={p.image}
                    data-lazy-src={p.image}
                    alt="-"
                    className="i-fit lazy"
                    data-lazy-placeholder="https://placehold.it/1321x583?text=Loading"
                    style={{ marginBottom: "0" }}
                    onClick={() => setShow(p._id)}
                  />
                  <OffCan
                    reviews={p.reviews}
                    price={p.price}
                    img={p.image}
                    title={p.title}
                    description={p.description}
                    id={p._id}
                  />
                </div>
              ))}
            </div>
            <div
              className="col-md-4"
              style={{ paddingRight: "5px", paddingLeft: "5px" }}
            >
              {rowB.map((p, key) => (
                <div
                  className="mb-2"
                  key={"b" + key}
                  style={{ paddingBottom: "0" }}
                >
                  <img
                    src={p.image}
                    alt="-"
                    className="i-fit"
                    style={{ marginBottom: "0" }}
                    onClick={() => setShow(p._id)}
                  />
                  <OffCan
                    reviews={p.reviews}
                    price={p.price}
                    img={p.image}
                    title={p.title}
                    description={p.description}
                    id={p._id}
                  />
                </div>
              ))}
            </div>
            <div
              className="col-md-4"
              style={{ paddingRight: "5px", paddingLeft: "5px" }}
            >
              {rowC.map((p, key) => (
                <div
                  className="mb-2"
                  key={"c" + key}
                  style={{ paddingBottom: "0", overflow: "hidden" }}
                >
                  <img
                    src={p.image}
                    alt="-"
                    className="i-fit"
                    style={{ marginBottom: "0" }}
                    onClick={() => setShow(p._id)}
                  />
                  <OffCan
                    reviews={p.reviews}
                    price={p.price}
                    img={p.image}
                    title={p.title}
                    description={p.description}
                    id={p._id}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>No arts for sell currently </div>
        )
      ) : (
        <div>No arts for sell currently </div>
      )}
    </div>
  );
}
