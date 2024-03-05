import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/user";

function App() {
  const user = useSelector((state)=>state.userReducer.user);
  const dispatch = useDispatch();

  const eveHand = (hand) => {
      if(hand === 'inc') {
        localStorage.setItem('user',user.val +1);
        dispatch(login(1));
      } else {
        localStorage.setItem('user',user.val -1);
        dispatch(logout(1))
      }

      console.log(user);
  }

  return (
    <div className="App">
      <button onClick={()=>eveHand('inc')}>Inc</button>
      <div>{user.val}</div>
      <button onClick={()=>eveHand('dec')}>Dec</button>
    </div>
  );
}

export default App;
