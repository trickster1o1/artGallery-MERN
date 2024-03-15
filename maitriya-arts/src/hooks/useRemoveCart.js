import { useState } from "react"
import { useSelector,useDispatch } from "react-redux";
import { deleteCart } from "../features/cart";
import { addNotification } from "../features/notif";
export const useRemoveCart = () => {
    const user = useSelector(state => state.userReducer.user);
    const [rmvBuff, setRmvBuff] = useState(false);
    const dispatch = useDispatch();
    const rmvCart = async (pid) => {
        await fetch(`http://localhost:4000/api/cart/${pid}`, {
            method:'DELETE',
            headers: {
                'authorization': `Bearer ${user.token}`
            }
        }).then(res=>res.json()).then(res=> {
            console.log(res);
            if(res.msg && res.msg==='success') {
                dispatch(deleteCart(res.product_id));
                dispatch(addNotification({ msg: 'Item Removed!', status: "success" , show: true, time: Date.now()}));
                if(localStorage.getItem('cart')) {
                    let local = JSON.parse(localStorage.getItem('cart'));
                    local = local.filter(l=>l.product_id !== res.product_id);
                    localStorage.setItem('cart', JSON.stringify(local));
                }
            }
        }).catch(err=>{console.log(err);
            dispatch(addNotification({ msg: 'Server Error!', status: "error" , show: true, time: Date.now()}));
        
        });
    }

    return {rmvBuff, rmvCart}
}