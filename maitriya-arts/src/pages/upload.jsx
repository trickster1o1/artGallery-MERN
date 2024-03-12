import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function Uploads() {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [show,setShow] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("upload")) {
      setUploadStatus(urlParams.get("upload"));
      setShow(true);
    }
  }, []);
  return (
    <div>
      {uploadStatus ? (
        <div className="custom-toaster">
          <ToastContainer className="position-static">
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
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
        action="http://localhost:4000/api/product/upload"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="file" />
        <input type="text" name="name" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
