import { useEffect, useState } from "react";
import { getOrderStatus, status_Cancelled, status_Confirmed, status_Delivered, status_Shipped } from "../services/adminAllProducts";
import NavigationBarAdmin from "./NavigationBarAdmin";
import { useNavigate } from "react-router-dom";


function AdminOrderStatusPage()
{
    const [orders, setOrders] = useState([]);
    const navigate=useNavigate();
    

    useEffect(()=>{
        loadOrders()
    },[])

    const loadOrders=async ()=>{
        const response= await getOrderStatus()
        setOrders(response.data)
    }

    const handleStatusChange = async (orderId, newStatus) => {
        // Implement the logic to update the order status on the server.
        // You can make an API request to update the status.
        // After a successful update, you can update the 'orders' state with the new data.
        // Replace this with your actual API call.
        if(newStatus=='CONFIRMED')
        {
            console.log(orderId)
            console.log("In CONFIRMED block")
            await status_Confirmed(orderId)

        }
          

           if(newStatus=='SHIPPED')
           await status_Shipped(orderId)

           if(newStatus=='DELIVERED')
           await status_Delivered(orderId)

           if(newStatus=='CANCELLED')
           await status_Cancelled(orderId)

           loadOrders()
      };

      
   const  goBackPage =()=>{
    navigate('/admin-homepage' )
  }
   return(
    <div>
      <NavigationBarAdmin/>
    <div className="order-table-container">
    <table className="order-table">
      <thead>
        <tr>
        
          <th>ORDER DATE</th>
       
          <th>SHIPPING ADDRESS</th>
          <th>PAYMENT DETAILS</th>
          <th>ORDER STATUS</th>
          <th>TOTAL PRICE</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            key={order.id}
            className={`status-${order.orderStatus.toLowerCase()}`} // Apply CSS class based on order status
          >
           
            <td>{order.orderDate}</td>
          
            <td>
                <div>
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </div>
                <div>
                {order.shippingAddress.streetAddress} {order.shippingAddress.city}
                </div>
                <div>
                {order.shippingAddress.zipCode} {order.shippingAddress.state}
                </div>
                <div>
                {order.shippingAddress.mobile}
                </div>
               
            </td>
            <td>
                <div>
                    Payment Method:{order.paymentDetails.paymentMethod}
                </div>
                <div>
                    Payment Id:{order.paymentDetails.paymentId}
                </div>
            </td>
            <td>{order.orderStatus}</td>
        
            <td>{order.totalPrice}</td>
          
            <td>
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option>Select Action..</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <label style={{width:30}}></label>
  <button onClick={()=>goBackPage()} className="btn btn-dark">Back To HomePage</button>
  </div>
   )


}

export default AdminOrderStatusPage