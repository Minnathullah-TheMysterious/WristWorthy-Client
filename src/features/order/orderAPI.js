import toast from "react-hot-toast";

export const placeOrder = async (order) => {
  try {
    const response = await fetch("http://localhost:5000/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Order Placed Successfully");
      return data;
    } else {
      const errorData = await response.json();
      console.error(errorData);
      toast.error("Failed To Place Order");
      throw new Error(errorData.message || "Failed to Place Order");
    }
  } catch (error) {
    console.error("Something Went Wrong While Placing Order", error);
  }
};
