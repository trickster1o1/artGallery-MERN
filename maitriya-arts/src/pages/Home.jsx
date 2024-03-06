import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/user";

export default function Home() {
    const user = useSelector((state)=>state.userReducer.user);
  const nav = useSelector((state) => state.navReducer);
  const dispatch = useDispatch();

    return (
        <div className="App">
      {user ? user.email : 'xaina'}
    </div>
    );
}