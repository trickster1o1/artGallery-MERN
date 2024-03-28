import { useEffect, useState } from "react";
import { Tab, Tabs, Table, Spinner, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "../features/notif";

export default function AdminPanel() {
  const [users, setUsers] = useState(null);
  const [products, setProducts] = useState(null);
  const [orders, setOrders] = useState(null);
  const [buffer, setBuffer] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [reRender, setReRender] = useState(0);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    status: "active",
    image: "",
    _id: "",
  });
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      await fetch(`${process.env.REACT_APP_API}/api/users`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUsers(res);
        })
        .catch((err) => console.log(err));
    };

    const getProducts = async () => {
      await fetch(`${process.env.REACT_APP_API}/api/products`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => console.log(err));
    };

    const getOrders = async () => {
      await fetch(`${process.env.REACT_APP_API}/api/orders`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            navigate("/");
          } else {
            getUsers();
            getProducts();
            setOrders(res);
            setBuffer(false);
          }
        })
        .catch((err) => console.log(err));
    };

    getOrders();
    console.log('rendered');
  }, [reRender]);

  const urlParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    if (urlParams.get("update")) {
      if (urlParams.get("update") === "success") {
        console.log("xiryo");
        dispatch(
          addNotification({
            msg: "Product has been updated",
            status: "success",
            show: true,
            time: Date.now(),
          })
        );
      } else {
        dispatch(
          addNotification({
            msg: "Updates failed!!!",
            status: "error",
            show: true,
            time: Date.now(),
          })
        );
      }
    }
  }, []);

  const productUpdate = (product) => {
    setData(product);
    setModalShow(true);
  };

  const updateProdStatus = async (status, id) => {
    await fetch(`${process.env.REACT_APP_API}/api/product/status`, {
      method: "POST",
      body: JSON.stringify({
        id,
        status: status !== "active" ? "active" : "inactive",
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.msg) {
          setReRender(r=>r+1);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="users"
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="users" title="Users">
          {buffer ? (
            <Spinner animation="border" className="mt-3" />
          ) : !users || !users.length ? (
            <h3>No Users Yet</h3>
          ) : (
            <Table responsive className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.name} </td>
                    <td>{user.username} </td>
                    <td>{user.email}</td>
                    <td>{user.userType.toUpperCase()} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        <Tab eventKey="products" title="Products">
          {buffer ? (
            <Spinner animation="border" className="mt-3" />
          ) : !products || !products.length ? (
            <h3>No Products Yet</h3>
          ) : (
            <>
              <Table responsive className="mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{product.title} </td>
                      <td>Rs.{product.price} </td>
                      <td>
                        <span
                          className={`material-symbols-outlined user-select-none ${
                            product.status === "active"
                              ? "text-warning"
                              : "text-danger"
                          }`}
                          role="button"
                          title={product.status.toUpperCase()}
                          onClick={() =>
                            updateProdStatus(product.status, product._id)
                          }
                        >
                          {product.status === "active"
                            ? "check_circle"
                            : "cancel"}
                        </span>
                      </td>
                      <td>
                        <span
                          className="material-symbols-outlined text-primary user-select-none"
                          role="button"
                          title="Edit"
                          onClick={() => productUpdate(product)}
                        >
                          edit_document
                        </span>{" "}
                        <span
                          className="material-symbols-outlined text-danger user-select-none"
                          role="button"
                          title="Delete"
                        >
                          delete_forever
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    <input
                      type="text"
                      className="input-txt"
                      value={data.title}
                      onChange={(e) =>
                        setData({ ...data, title: e.target.value })
                      }
                      autoFocus
                    />
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <h4>Centered Modal</h4> */}
                  <p>
                    <textarea
                      className="input-txt w-100"
                      value={data.description}
                      onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                      }
                    ></textarea>{" "}
                    <br />
                    Rs.
                    <input
                      type="text"
                      className="input-txt"
                      value={data.price}
                      onChange={(e) =>
                        setData({ ...data, price: e.target.value })
                      }
                    />{" "}
                    <br />
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <form
                    action={`${process.env.REACT_APP_API}/api/product/${data._id}/update`}
                    method="post"
                    encType="multipart/form-data"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <input type="hidden" value={data.title} name="title" />
                    <input type="hidden" value={data.price} name="price" />
                    <input
                      type="hidden"
                      value={data.description}
                      name="description"
                    />
                    <input type="hidden" value={data.image} name="image" />
                    <input type="file" name="file" />
                    <Button variant="primary" type="submit">
                      Update
                    </Button>
                  </form>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Tab>

        <Tab eventKey="orders" title="Orders">
          {buffer ? (
            <Spinner animation="border" className="mt-3" />
          ) : !orders || !orders.length ? (
            <h3>No Orders Yet</h3>
          ) : (
            <>
              <Table responsive className="mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transaction_code</th>
                    <th>Total Products</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr>
                      <td
                        className={
                          order.status === "error"
                            ? "bg-danger text-light"
                            : null
                        }
                      >
                        {index + 1}
                      </td>
                      <td
                        className={
                          order.status === "error"
                            ? "bg-danger text-light"
                            : null
                        }
                      >
                        {order.transaction_code}{" "}
                      </td>
                      <td
                        className={
                          order.status === "error"
                            ? "bg-danger text-light"
                            : null
                        }
                      >
                        {order.products.length}{" "}
                      </td>
                      <td
                        className={
                          order.status === "error"
                            ? "bg-danger text-light"
                            : null
                        }
                      >
                        Rs.{order.total_amount}
                      </td>
                      <td
                        className={
                          order.status === "error"
                            ? "bg-danger text-light"
                            : null
                        }
                      >
                        <b>{order.status.toUpperCase()}</b>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
