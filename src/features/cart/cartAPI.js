import toast from 'react-hot-toast';

//in server we will need to add items based on the user cart availability
export const addItemToCart = async (cartItem) => {
  const URL = `http://localhost:5000/carts`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(cartItem),
      headers: { "content-type": "application/json" },
    });
    if(response.ok){
        const data = await response.json()
        return data
    }else{
        const errorData = await response.json()
        console.error(errorData)
        toast.error('Failed To Add To Cart')
        throw new Error(errorData.message || 'Failed to add item to cart')
    }
  } catch (error) {
    toast.error('Failed To Add To Cart')
    console.error("Something Went Wrong While adding item to Cart");
  }
};

export const fetchUserCart = async(uId)=>{
  const URL = `http://localhost:5000/carts?user_id=${uId}`

  try {
    const response = await fetch(URL)
    const data = await response.json()
    return {data}
  } catch (error) {
    toast.error('Failed To Fetch Cart')
    console.error('Failed to fetch cart')
  }
}
