import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

export default function Home() {
  const user = useSelector((state) => state.userReducer.user);
  const nav = useSelector((state) => state.navReducer);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rowA, setRowA] = useState([]);
  const [rowB, setRowB] = useState([]);
  const [rowC, setRowC] = useState([]);
  let i = 0;
  let j = 1;
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
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

              j = j >= 3 ? 1 : j+1;
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
            <div className="col-md-4">
              {rowA.map((p, key) => (
                <div className="mb-2" key={key} style={{'paddingBottom':'0'}}>
                  <img src={p.image} alt="-" className="i-fit" style={{'marginBottom':'0'}} />
                </div>
              ))}
            </div>
            <div className="col-md-4">
              {rowB.map((p, key) => (
                <div className="mb-2" key={'b'+key} style={{'paddingBottom':'0'}}>
                  <img src={p.image} alt="-" className="i-fit" style={{'marginBottom':'0'}} />
                </div>
              ))}
            </div>
            <div className="col-md-4">
              {rowC.map((p, key) => (
                <div className="mb-2" key={'c'+key} style={{'paddingBottom':'0', 'overflow':'hidden'}}>
                  <img src={p.image} alt="-" className="i-fit" style={{'marginBottom':'0'}} />
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
