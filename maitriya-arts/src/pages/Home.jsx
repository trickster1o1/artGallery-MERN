import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner, Offcanvas } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const user = useSelector((state) => state.userReducer.user);
  const nav = useSelector((state) => state.navReducer);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rowA, setRowA] = useState([]);
  const [rowB, setRowB] = useState([]);
  const [rowC, setRowC] = useState([]);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [fadeRating, setFadeRating] = useState(rating);
  const navigator = useNavigate();

  // const mouseOverAction = (r, status) => {
  //   if(status) {
  //     setFadeRating(r);
  //   } else {
  //     setFadeRating(rating);
  //   }

  //   console.log(rating)
  // }

  const ratingSetter = (r) => {
    if(r === rating) {
      setRating(0);
    } else {
      setRating(r);
    }
  }

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
            <button className={user ? "btn btn-danger" : "btn btn-secondary"} onClick={!user ? ()=>navigator('/login') : null}>Buy</button>
            <button className={user ? "btn btn-primary" : "btn btn-secondary"}  onClick={!user ? ()=>navigator('/login') : null}>Cart</button>
          </div>
          <div className="rating-cont">
            <span>Give your rating</span>
            <span>
              <span 
                className={rating >= 1 ? "material-symbols-outlined custom-star star-active" : "material-symbols-outlined custom-star star-un"}
                // onMouseOver={()=>mouseOverAction(1, true)}
                // onMouseLeave={()=>mouseOverAction(1, false)}
                onClick={()=>ratingSetter(1)}
              >star</span>
              <span 
                className={rating >= 2 ? "material-symbols-outlined custom-star star-active" : "material-symbols-outlined custom-star star-un"}
                onClick={()=>ratingSetter(2)}
              >star</span>
              <span 
                className={rating >= 3 ? "material-symbols-outlined custom-star star-active" : "material-symbols-outlined custom-star star-un"}
                onClick={()=>ratingSetter(3)}
              >star</span>
              <span 
                className={rating >= 4 ? "material-symbols-outlined custom-star star-active" : "material-symbols-outlined custom-star star-un"}
                onClick={()=>ratingSetter(4)}
              >star</span>
              <span 
                className={rating >= 5 ? "material-symbols-outlined custom-star star-active" : "material-symbols-outlined custom-star star-un"}
                onClick={()=>ratingSetter(5)}
              >star</span>
            </span>
          </div>
          <div className="feedback-cont">
            Give your feedback <br />
            <textarea></textarea>
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={!user ? ()=>navigator('/login') : null}>Post</button>
            </div>
            {reviews.length ? (
              <div>
                <span className="font-weight-bold">Reviews</span> <br />
                {reviews.map((r, index) => (
                  <div key={'r_'+index}>{r.review}</div>
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
