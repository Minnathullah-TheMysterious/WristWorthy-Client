import axios from "axios"

export const fetchSelectedProduct = async(id)=>{
    const URL = `http://localhost:5000/products/${id}`
    const response = await axios.get(URL)
    const product = response.data 
    return product
}