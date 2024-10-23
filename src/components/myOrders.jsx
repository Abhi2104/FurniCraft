import { useEffect, useState } from "react";
import { getUserOrders } from "../services/orders";
import '../Styling/orderTable.css'
import NavigationBarUser from './navigationBarUser'
import { useNavigate } from "react-router-dom";
function MyOrders() {

  const orderId=sessionStorage.getItem("orderId");

  const [orders, setOrders] = useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    loadOrders()
  },[])

   const loadOrders=async ()=>{

    const response= await getUserOrders()
    setOrders(response.data)
   }

   const  goBackPage =()=>{
    navigate('/product-gallery' )
  }


  return (
    <div>
      <NavigationBarUser/>
    <div className="order-table-container">
    <table className="order-table">
      <thead>
        <tr>
          {/* <th>Order id</th> */}
          <th>Order Date</th>
          {/* <th>Delivery Date</th> */}
          <th>Shipping Address</th>
          <th>Payment Details</th>
          <th>Order Status</th>
          {/* <th>Total Items</th> */}
          <th>Total Price</th>
        
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            {/* <td>{order.id}</td> */}
            <td>{order.orderDate}</td>
            {/* <td>{order.deliveryDate}</td> */}
            <td>
              <div>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </div>
              <div>
              {order.shippingAddress.streetAddress} {order.shippingAddress.city} {order.shippingAddress.state}
              </div>
              <div>
              {order.shippingAddress.zipCode} {order.shippingAddress.mobile}
              </div>
            </td>
            <td>{order.paymentDetails.status}</td>
            <td>{order.orderStatus}</td>
            {/* <td>{order.totalItems}</td> */}
            <td>{order.totalPrice}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <button onClick={()=>goBackPage()} className='btn btn-dark'>
          Continue Shopping
        </button>
  </div>
  )
}

export default MyOrders
