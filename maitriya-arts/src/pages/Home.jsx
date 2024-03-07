import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

export default function Home() {
  const user = useSelector((state) => state.userReducer.user);
  const nav = useSelector((state) => state.navReducer);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      await fetch("http://localhost:4000/api/product")
        .then((res) => res.json())
        .then((res) => {
          setProducts(res);
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
            {products.map((p, key) => (
              <div className="col-md-4" key={key}>{p.title}</div>
            ))}
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
