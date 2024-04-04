import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../features/notif";

export default function UpdateUser() {
  const [data, setData] = useState({ name: "", phone: "" });
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      await fetch(`${process.env.REACT_APP_API}/api/user`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.error) {
            setData({ name: res.name, phone: res.phone });
          }
        })
        .catch((err) => console.log(err));
    };

    getData();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/api/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.msg && res.msg === 'success') {
            dispatch(addNotification({
                msg: "Updated!",
                status: "success",
                show: true,
                time: Date.now(),
              }))
        }
        console.log(res);

      })
      .catch((err) => console.log(err));
  };
  return (
    <>
    <form onSubmit={updateUser}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlInput2" className="form-label">
          Phone Number
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleFormControlInput2"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
      </div>
      <button className="btn btn-primary">Update</button>
    </form>
    </>
  );
}
