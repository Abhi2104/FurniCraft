import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";



function PaymentResponsePage() {
    const location = useLocation();
    const navigate = useNavigate()
    
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const paymentId = queryParams.get('razorpay_payment_id');
      
      // Do something with the paymentId, like showing a custom message
      
      // Optionally, navigate to another page
      if (paymentId) {
        //history.push(`/custom-page/${paymentId}`);
        navigate(`/custom-page/${paymentId}`)
      }
    }, [location.search, navigate]);
  
    return (
      <div>
        <h1>Payment Response Page</h1>
        <p>Processing payment response...</p>
      </div>
    );
  }
  
  export default PaymentResponsePage;