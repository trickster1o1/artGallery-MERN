import {
  Container,
  Navbar,
  Form,
  Nav,
  NavDropdown
} from "react-bootstrap";
import { Link,  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import art from "../assets/web.png";
import { useLogout } from "../hooks/useLogout";
export default function Header() {
  const user = useSelector((state) => state.userReducer.user);
  const cart = useSelector((state) => state.cartReducer.cart);
  const navigate = useNavigate()
  const { userLogout } = useLogout();
  const ulog = () => {
    userLogout(null);
  };
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid style={{ paddingLeft: "5em", paddingRight: "5em" }}>
        <Navbar.Brand className="text-light">
          <Link
            className="text-light text-decoration-none d-flex align-items-center"
            to={"/"}
          >
            <img
              src={art}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span>MaitreyaArts</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
          {user ? (
            <Nav>
              <Nav.Link className="text-light">
                {" "}
                <Link className="text-light text-decoration-none" to={"/cart"} style={{position: 'relative'}} title="Cart">
                  <span class="material-symbols-outlined">shopping_bag</span>{" "}
                  {cart.length ? (
                    <span className="custom-badge">{cart.length}</span>
                  ) : null}
                </Link>
              </Nav.Link>
              <NavDropdown
                menuVariant="dark"
                variant="dark"
                title={user.username}
                id="nav-dropdown-dark-example"
                style={{ color: "white" }}
              >
                {/* <NavDropdown.Item><Link className="text-light text-decoration-none" to={"/orders"}>
                  Order
                </Link></NavDropdown.Item> */}
                {user.userType === 'admin' ? <NavDropdown.Item onClick={()=>navigate('/admin')}>
                  Adminpanel</NavDropdown.Item> : null}
                <NavDropdown.Item onClick={()=>navigate('/orders')}>
                  Orders</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>navigate('/setting')}>Setting</NavDropdown.Item>
                <NavDropdown.Item onClick={ulog}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link className="text-light" onClick={()=>navigate('/login')}>
                {" "}
                  Login
              </Nav.Link>
              <Nav.Link eventKey={2} className="text-light" onClick={()=>navigate('/register')}>
                
                  Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
