import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'
import ProductDetails from '../components/ProductDetails';
import Reviews from '../components/Reviews';

const API_URL = "http://localhost:5005";

export default function ProductPage() {
    const {id} = useParams()
    const [ product, setProduct ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [isLoaded, setIsLoaded ] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        axios.get(`${API_URL}/product/${id}`)
        .then((ans)=>{
            console.log(ans.data)
            setProduct(ans.data)
            setIsLoading(false)
            setIsLoaded(true)
            setIsError(false)
        }).catch((e)=>{
            setIsLoading(false)
            setIsError(true)
            setErrorMessage(e)
        })
    },[])
  return (
    <div className="ProductPage">
        <h2>ProductPage</h2>
        {isLoading ? <div className="progress"><div>Loading…</div></div> : <ProductDetails product={product} isLoaded={isLoaded}/>}
        <Reviews productId={product._id}/>
        {isError && <p>{errorMessage}</p>}
    </div>
    
  )
}
