import { useState } from "react";
import { ToastContainer, Toast } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeNotif } from "../features/notif";

export default function ToasterAlert() {
  const notifications = useSelector(
    (state) => state.notifReducer.notifications
  );
  const dispatch = useDispatch();
    const notif = useSelector(state=>state.notifReducer.notifications);

  const [show, setShow] = useState(true);
  return notifications.length ? (
    <div className="custom-toaster">
      <ToastContainer className="position-static">
        {notifications.map((n,index) => (
          <Toast
            onClose={() => dispatch(removeNotif(n.time))}
            show={n.show}
            delay={3000}
            autohide
            key={index}
          >
            <Toast.Header
              closeVariant="white"
              className={n.status === "success" ? "bg-success" : "bg-danger"}
            >
              {/* <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  /> */}
              <strong className="me-auto text-light">{n.msg}</strong>
            </Toast.Header>
            {/* <Toast.Body className="text-light">Upload Success</Toast.Body> */}
          </Toast>
        ))}
      </ToastContainer>
    </div>
  ) : null;
}
