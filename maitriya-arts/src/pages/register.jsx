import { Form, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useState } from "react";

export default function Register() {
  const [data, setData] = useState({ email: "", username: "", name: "", phone: "", password: "" });
  const { error, loading, userRegister } = useRegister();
  const registerUser = async (e) => {
    e.preventDefault();
    await userRegister(data);
  };
  return (
    <div className="d-flex justify-content-center">
      <Card className="w-75">
        <Card.Header>Register</Card.Header>
        <Card.Body>
          <Form onSubmit={registerUser}>
          <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Full Name *
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Email *
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Username *
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Phone
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </Col>
            </Form.Group>
            {error && (
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2"></Form.Label>
                <Col sm="10">
                  {" "}
                  <small className="error text-danger">{error}</small>
                </Col>
              </Form.Group>
            )}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2"></Form.Label>
              <Col sm="10">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Register
                </button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
