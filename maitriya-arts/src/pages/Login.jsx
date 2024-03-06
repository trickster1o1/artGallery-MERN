import { Form, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
export default function Login() {
    const [data,setData] = useState({ email: '', password: '' });
    const {error, loading, userLogin} = useLogin();
    const loginUser = async (e) => {
        e.preventDefault();
        await userLogin(data);
    }
  return (
    <div className="d-flex justify-content-center">
      <Card className="w-75">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form onSubmit={loginUser}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control type="email" placeholder="Email" value={data.email} onChange={(e)=>setData({...data, email: e.target.value})} />
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
                <Form.Control type="password" placeholder="Password" value={data.password} onChange={(e)=>setData({...data, password: e.target.value})} />
              </Col>
            </Form.Group>
            {error && <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2"></Form.Label>
              <Col sm="10"> <small className="error text-danger">{error}</small>
              </Col>
            </Form.Group>
             }
            
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2"></Form.Label>
              <Col sm="10">
                <input type="checkbox" /> <span>Remember Me</span>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2"></Form.Label>
              <Col sm="10">
                <button type="submit" className="btn btn-primary" disabled={loading}>Login</button><Link to={"/"} style={{'marginLeft':'10px'}}>Forgot Password?</Link> 
              </Col>
            </Form.Group>

          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
