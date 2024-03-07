import { Container, Navbar, Form, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user";
import art from '../assets/web.png';

export default function Header() {
    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const userLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout());
    }
  return (
    <Navbar bg={"dark"}>
      <Container fluid>
        <Navbar.Brand className="text-light">
          <Link className="text-light text-decoration-none d-flex align-items-center" to={"/"}>
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
          {
            user ? <Nav>
            <Nav.Link className="text-light">
              {" "}
              <Link className="text-light text-decoration-none" onClick={userLogout}>
                {user.username}
              </Link>
            </Nav.Link>
          </Nav> : <Nav>
            <Nav.Link className="text-light">
              {" "}
              <Link className="text-light text-decoration-none" to={"/login"}>
                Login
              </Link>
            </Nav.Link>
            <Nav.Link eventKey={2} className="text-light">
              <Link className="text-light text-decoration-none" to={"/register"}>
                Register
              </Link>
            </Nav.Link>
          </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
