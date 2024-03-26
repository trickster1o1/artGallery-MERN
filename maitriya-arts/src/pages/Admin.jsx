import { useEffect, useState } from "react";
import { Tab, Tabs, Table, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [users, setUsers] = useState(null);
  const [products, setProducts] = useState(null);
  const [orders, setOrders] = useState(null);
  const [buffer, setBuffer] = useState(true);
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      await fetch(`${process.env.REACT_APP_API}/api/user`)
        .then((res) => res.json())
        .then((res) => {
          setUsers(res);
        })
        .catch((err) => console.log(err));
    };

    const getProducts = async () => {
      await fetch(`${process.env.REACT_APP_API}/api/product`)
        .then((res) => res.json())
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => console.log(err));
    };

    const getOrders = async () => {
      await fetch(`${process.env.REACT_APP_API}/api/order/admin`, {
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
  }, []);

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
          )}
        </Tab>

        <Tab eventKey="orders" title="Orders">
          {buffer ? (
            <Spinner animation="border" className="mt-3" />
          ) : !orders || !orders.length ? (
            <h3>No Orders Yet</h3>
          ) : (
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
                    <td className={order.status === 'error' ? 'bg-danger text-light' : null}>{index + 1}</td>
                    <td className={order.status === 'error' ? 'bg-danger text-light' : null}>{order.transaction_code} </td>
                    <td className={order.status === 'error' ? 'bg-danger text-light' : null}>{order.products.length} </td>
                    <td className={order.status === 'error' ? 'bg-danger text-light' : null}>Rs.{order.total_amount}</td>
                    <td className={order.status === 'error' ? 'bg-danger text-light' : null}>
                      <b>{order.status.toUpperCase()}</b>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
