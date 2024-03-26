import { useEffect, useState } from "react";
import { ListGroup, Badge, Collapse, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
export default function Order() {
  const user = useSelector((state) => state.userReducer.user);
  const [orders, setOrders] = useState(null);
  const [buffer, setBuffer] = useState(true);
  const [open, setOpen] = useState("0");
  useEffect(() => {
    const getOrders = async () => {
      await fetch(`${process.env.REACT_APP_API}/api/order`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setOrders(res.order);
          setBuffer(false);
        })
        .catch((err) => {
          console.log(err);
          setBuffer(false);
        });
    };
    getOrders();
  }, [user.token]);
  return (
    <div>
      {buffer ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <h2 className="mb-4">Orders</h2>
          <ListGroup as="ol" numbered>
            {orders ? (
              orders.map((o, index) => (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className="d-flex justify-content-between align-items-start pt-4 pb-4"
                  onClick={() =>
                    setOpen((opn) => (opn === o._id ? "0" : o._id))
                  }
                  aria-controls={`${o._id}`}
                  aria-expanded={open === o._id ? true : false}
                >
                  <div className="ms-2 me-auto" style={{ width: "75%" }}>
                    <div className="fw-bold">{o._id}</div>
                    <Collapse in={open === o._id ? true : false}>
                      <ul id={`${o._id}`} className="order-list">
                        {o.products.map((product, index) => (
                          <li key={"p-" + index}>
                            <span>
                              <img src={product.product_id.image} alt="" />{" "}
                              <br />
                              <figcaption className="figure-caption">
                                {product.product_id.title}
                              </figcaption> <br />
                              
                              <figcaption className="figure-caption">
                                {new Date(product.product_id.createdAt).toDateString()}
                              </figcaption>
                            </span>
                            <ul>
                              <li className="text-danger">Rs.{product.product_id.price}</li>
                            </ul>
                          </li>
                        ))}
                        {o.products.length > 1 || o.status === 'error' ?
                          <li>
                            <span><b>Total</b></span>
                            <span><b className="text-danger">Rs.{o.total_amount}</b></span>
                          </li>
                        : null}
                      </ul>
                    </Collapse>
                  </div>
                  <Badge
                    bg={
                      o.status === "pending"
                        ? "warning"
                        : o.status === "error"
                        ? "danger"
                        : "success"
                    }
                    pill
                    title={o.status.toUpperCase()}
                    style={{ cursor: "pointer" }}
                  >
                    {o.products.length}
                  </Badge>
                </ListGroup.Item>
              ))
            ) : (
              <h2>You have no orders yet.</h2>
            )}
          </ListGroup>
        </>
      )}
    </div>
  );
}
