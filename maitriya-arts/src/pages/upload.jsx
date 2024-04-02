import { useEffect, useState, useRef } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { TweenMax, Power2, TimelineLite } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Uploads() {
  gsap.registerPlugin(ScrollTrigger);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [show, setShow] = useState(false);
  let formRef = useRef(null);
  let imgRef = useRef(null);
  let imgReveal = CSSRulePlugin.getRule(".img-container:after");
  let scrollRef = useRef([]);

  const tl = new TimelineLite();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("upload")) {
      setUploadStatus(urlParams.get("upload"));
      setShow(true);
    }
  }, []);

  useEffect(() => {
    TweenMax.to(formRef, 1.5, {
      opacity: 1,
      y: -20,
      ease: Power2.easeOut,
    });

    tl.to(imgReveal, 1.4, { width: "0%", ease: Power2.easeInOut }).to(
      imgRef,
      1.4,
      { scale: 1, ease: Power2.easeInOut, delay: -1.5 }
    );
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      scrollRef.current.forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 55%",
            end: "center 55%",
            // markers: true,
            // toggleClass: 'tog-img'
            // toggleActions: "restart reverse restart reverse"
          },
          y: -25,
          duration: 1,
          opacity: 0,
          ease: 'power2.inOut'
        });
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <div>
      {uploadStatus ? (
        <div className="custom-toaster">
          <ToastContainer className="position-static">
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={3000}
              autohide
            >
              <Toast.Header closeVariant="white" className="bg-success">
                {/* <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              /> */}
                <strong className="me-auto text-light">Upload Success</strong>
              </Toast.Header>
              {/* <Toast.Body className="text-light">Upload Success</Toast.Body> */}
            </Toast>
          </ToastContainer>
        </div>
      ) : null}
      <form
        className="animate-form"
        ref={(el) => {
          formRef = el;
        }}
        action="http://localhost:4000/api/product/123/update"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="file" />
        <input type="text" name="name" />
        <button type="submit">Upload</button>
      </form>{" "}
      <div className="img-container">
        <img
          src="https://i.ytimg.com/vi/dXM6i5-sdVg/maxresdefault.jpg"
          alt="-"
          ref={(el) => {
            imgRef = el;
          }}
        />
      </div>
      <img
        src="https://i.ytimg.com/vi/dXM6i5-sdVg/maxresdefault.jpg"
        alt="-"
        className="s-ani"
        ref={(el) => {
          scrollRef.current.push(el);
        }}
      />{" "}
      <br /> <br />
      <img
        src="https://i.ytimg.com/vi/dXM6i5-sdVg/maxresdefault.jpg"
        alt="-"
        className="s-ani"
        ref={(el) => {
          scrollRef.current.push(el);
        }}
      />{" "}
      <br /> <br />
      <img
        src="https://i.ytimg.com/vi/dXM6i5-sdVg/maxresdefault.jpg"
        alt="-"
        className="s-ani"
        ref={(el) => {
          scrollRef.current.push(el);
        }}
      />{" "}
      <br /> <br />
      <img
        src="https://i.ytimg.com/vi/dXM6i5-sdVg/maxresdefault.jpg"
        alt="-"
        className="s-ani"
        ref={(el) => {
          scrollRef.current.push(el);
        }}
      />{" "}
      <br /> <br />
      <img
        src="https://i.ytimg.com/vi/dXM6i5-sdVg/maxresdefault.jpg"
        alt="-"
        className="s-ani"
        ref={(el) => {
          scrollRef.current.push(el);
        }}
      />{" "}
      <br /> <br />
      <img
        src="https://i.ytimg.com/vi/dXM6i5-sdVg/maxresdefault.jpg"
        alt="-"
        className="s-ani"
        ref={(el) => {
          scrollRef.current.push(el);
        }}
      />{" "}
      <br /> <br />
      <img
        src="https://i.ytimg.com/vi/dXM6i5-sdVg/maxresdefault.jpg"
        alt="-"
        className="s-ani"
        ref={(el) => {
          scrollRef.current.push(el);
        }}
      />{" "}
      <br /> <br />
    </div>
  );
}
