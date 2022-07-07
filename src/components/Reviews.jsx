import {useEffect, useState} from 'react'

import React from 'react'
import axios from 'axios'
import './styles/Review.css'
import { useParams } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function Reviews() {
    const {id} = useParams()
    const [ reviewsState, setReviewsState ] = useState({})
    const [ isLoading,  setIsLoading ]=useState(false)
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ isError, setIsError ] = useState(false)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ errorMessage, setErrorMessage ] = useState(false)
    console.log("id",id)

    const updateReviews = (page) =>{
        console.log(('id', id))
        setIsLoading(true)
        axios.get(`${API_URL}/review/${id}?page=${page}`)
        .then(res=>{
            
            setReviewsState(res.data)
            console.log('reviews : ',res.data)
            
            setIsLoading(false)
            setIsLoaded(true)
        })
        .catch(e=>{
            setIsError(true)
            setErrorMessage(true)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        updateReviews(1)
    },[])

    const changePage = (value) =>{
        const pageToLookFor = reviewsState.pagesInfo.page+value
        if(pageToLookFor >=1 && pageToLookFor<=reviewsState.pagesInfo.totalPageNumber){
            updateReviews(pageToLookFor)
        }
    }


  return (
    <div className="Reviews">
        {isLoading && <div className="progress"></div>}
        {isLoaded && <div>
            <div className="reviewMenu">
                <button className="changeReviewsPage" onClick={()=>changePage(-1)}>-</button>
                <p>{reviewsState.pagesInfo.page}/{reviewsState.pagesInfo.totalPageNumber}</p>
                <button className="changeReviewsPage" onClick={()=>changePage(1)}>+</button>
            </div>
            <ul>
                {reviewsState.reviews.map(review=>{
                    console.log("review",review)
                    return (
                        <li key={`${review.userId}-${review.productId}`}>
                            <p>{review.rate}</p>
                            <p>{review.comment}</p>
                        </li>
                    )
                })}
            </ul>
        </div>}
        
    </div>
    
  )
}
