import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import {AuthContext} from './auth.context'

const API_URL = "http://localhost:5005";
const CartContext = createContext();

function CartProviderWrapper({ children }) {
    const {isLoggedIn} = useContext(AuthContext)
    const [ cartState, setCartState ] = useState({
        products:[],
        status:"Pending"
    })

    //synchronize the cartState and sessionStorage
    //at start 
    //on each modification of the cartState

    const unifyCart = (itemsArray) =>{
        console.log('entry',itemsArray)
        const temp = []
        for(let i=0 ; i<itemsArray.length ; i++){
            const index = temp.findIndex(item=>item.productId===itemsArray[i].productId)
            console.log('index',index)
            if(index===-1){
                temp.push(itemsArray[i])
                console.log("temp : -1 : ",temp)
            }else{
                temp[index].quantity+=itemsArray[i].quantity
                console.log("temp",temp)
            }
        }
        console.log('finish ! ', temp)
        return temp
    }

    const patchCartAndUpdateStateLS = (fullNewCart,id, storedToken) =>{
        console.log('fullNewCart',fullNewCart)
        axios.patch(`${API_URL}/cart/${id}`,fullNewCart,{
            headers:{
                Authorization:`Bearer ${storedToken}`
            }
        })
        .then((res)=>{
            //LStorage + state
            console.log('-response : ',res.data)
            localStorage.setItem('pendingCart',JSON.stringify(res.data.result))
            setCartState(res.data.result)
            })
        .catch(e=>console.log(e))
    }
    const postCartAndUpdateStateLS = (fullNewCart, storedToken) =>{
        console.log('fullNewCart',fullNewCart)
        axios.post(`${API_URL}/cart`,fullNewCart,{
            headers:{
                Authorization:`Bearer ${storedToken}`
            }
        })
        .then((res)=>{
            //LStorage + state
            console.log('-response : ',res.data)
            localStorage.setItem('pendingCart',JSON.stringify(res.data))
            setCartState(res.data)
            })
        .catch(e=>console.log(e))
    }

    useEffect(()=>{
        if(isLoggedIn){
        
            const storedCartInLS = localStorage.getItem('pendingCart')
            const storedToken = localStorage.getItem('authToken')
      
            //get the pending cart in the backend
            axios.get(`${API_URL}/cart/pending`,{
                    headers:{
                        Authorization:`Bearer ${storedToken}`
                    }
                })
                //get an object or null
                .then(res=>{
                    //back Pending : no  && LS pending : yes
                    console.log('----->then inside : ',res)
                    console.log('storedCartInLs', storedCartInLS)
                    if('message' in res.data && storedCartInLS!==null){
                        //send cart in LS
                        postCartAndUpdateStateLS(JSON.parse(storedCartInLS).products,storedToken)
                    //pending cart on server and pending cart on LocalS
                    }else if('products' in res.data ){
                        //server crush LS and State
                        localStorage.setItem('pendingCart',JSON.stringify(res.data))
                        setCartState(res.data)
                        //AFTER ! 
                        //if DateOfLs < DateOfPendingServerData : ecrase
                        //mix and store in LS and update !
                    }
                })
                .catch(e=>console.log('error ! ',e))
        }
    },[isLoggedIn])

    //get the "pending" Cart
    //update the sessionStorage ? 
    //update the server with a patch request
    const updateServerCart = (newCart)=>{
        const storedToken = localStorage.getItem('authToken')
        console.log('token : ', storedToken)
        console.log('NEW CART !',newCart)
        
        if(isLoggedIn ){
            const pendingCartSTR = localStorage.getItem('pendingCart') 
            if(pendingCartSTR){
                console.log("UNPARSED CART", pendingCartSTR);
                const pendingCart=JSON.parse(pendingCartSTR)
                console.log('pendingCart',pendingCart)
                pendingCart.products.push(newCart)
                console.log('new PENDING CART / ',pendingCart)
                const unifiedCart = unifyCart(pendingCart.products)
                patchCartAndUpdateStateLS(unifiedCart,pendingCart._id,storedToken)
            }else{
                //no sessionStorage ? createItem and Post to the backEnd
                postCartAndUpdateStateLS([newCart],storedToken)
            }
        }else{
            //logged:no && LocalS:yes
            const offlineCartSTR = localStorage.getItem('offlineCart') 
            if(offlineCartSTR){
                const offlineCart = JSON.parse(offlineCartSTR)
                offlineCart.push(newCart)
                const unifiedCart = unifyCart(offlineCart)
                localStorage.setItem('offlineCart',JSON.stringify(unifiedCart))
            }else{
                localStorage.setItem('offlineCart',JSON.stringify([newCart]))
            }
        }
    }

  return (
    <CartContext.Provider
      value={{cartState, setCartState, updateServerCart, patchCartAndUpdateStateLS}}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartContext, CartProviderWrapper };
