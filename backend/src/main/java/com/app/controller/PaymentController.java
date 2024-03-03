package com.app.controller;

import java.util.List;
import java.util.Set;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.app.exception.OrderException;
import com.app.exception.UserException;
import com.app.modal.Cart;
import com.app.modal.CartItem;
import com.app.modal.Order;
import com.app.modal.OrderItem;
import com.app.modal.PaymentDetails;
import com.app.modal.PaymentInformation;
import com.app.modal.Product;
import com.app.modal.Size;
import com.app.modal.User;
import com.app.repository.OrderRepository;
import com.app.repository.ProductRepository;
import com.app.response.ApiResponse;
import com.app.response.PaymentLinkResponse;
import com.app.service.CartItemService;
import com.app.service.CartService;
import com.app.service.OrderService;
import com.app.service.ProductService;
import com.app.service.UserService;
import com.app.user.domain.OrderStatus;
import com.app.user.domain.PaymentStatus;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api")
public class PaymentController {
	
	private OrderService orderService;
	private UserService userService;
	private OrderRepository orderRepository;
	
	private ProductService productService;//added
	
	private ProductRepository productRepository;//added
	
	private CartItemService cartItemService; //added
	
	private CartService cartService;
	
	public PaymentController(OrderService orderService,UserService userService,OrderRepository orderRepository,ProductService productService,ProductRepository productRepository,CartItemService cartItemService,CartService cartService) {
		this.orderService=orderService;
		this.userService=userService;
		this.orderRepository=orderRepository;
		
		this.productService=productService;//added
		
		this.productRepository=productRepository;//added
		
		this.cartItemService=cartItemService; //added
		
		this.cartService=cartService;  
	}
	
	@PostMapping("/payments/{orderId}")
	public ResponseEntity<PaymentLinkResponse>createPaymentLink(@PathVariable Long orderId,
			@RequestHeader("Authorization")String jwt) 
					throws RazorpayException, UserException, OrderException{
		
		Order order=orderService.findOrderById(orderId);
		System.out.println(order.getId());
		 try {
		      // Instantiate a Razorpay client with your key ID and secret
		     // RazorpayClient razorpay = new RazorpayClient("rzp_test_HMZYtD8wrRg7WL", "nHSVQ5AjznWApzDLGlg4b90r");
			 RazorpayClient razorpay = new RazorpayClient("rzp_test_kTsRSaDC8hwztX", "LieoD1s9mxMIv569PcgRDMcU");
		      // Create a JSON object with the payment link request parameters
		      JSONObject paymentLinkRequest = new JSONObject();
		      System.out.println((int)order.getTotalPrice());
		      Integer x=(int)order.getTotalPrice();
		      //x=x*100;
		      paymentLinkRequest.put("amount",x);
		      paymentLinkRequest.put("currency","INR");    

		     

		      // Create a JSON object with the customer details
		      JSONObject customer = new JSONObject();
		      customer.put("name",order.getUser().getFirstName()+" "+order.getUser().getLastName());
		      customer.put("contact",order.getUser().getMobile());
		      customer.put("email",order.getUser().getEmail());
		      paymentLinkRequest.put("customer",customer);

		      // Create a JSON object with the notification settings
		      JSONObject notify = new JSONObject();
		      notify.put("sms",true);
		      notify.put("email",true); 
		      paymentLinkRequest.put("notify",notify);

		      // Set the reminder settings
		      paymentLinkRequest.put("reminder_enable",true);

		      // Set the callback URL and method
		      //paymentLinkRequest.put("callback_url","https://shopwithzosh.vercel.app/payment/"+orderId);
		      paymentLinkRequest.put("callback_url","http://localhost:3000/payment/"+orderId);
		      paymentLinkRequest.put("callback_method","get");

		      // Create the payment link using the paymentLink.create() method
		      PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest); 
		      
		      String paymentLinkId = payment.get("id");
		      String paymentLinkUrl = payment.get("short_url");
		      
		      PaymentLinkResponse res=new PaymentLinkResponse(paymentLinkUrl,paymentLinkId);
		      
		      PaymentLink fetchedPayment = razorpay.paymentLink.fetch(paymentLinkId);
		      
		      order.setOrderId(fetchedPayment.get("order_id"));
		      orderRepository.save(order);
		      
		   // Print the payment link ID and URL
		      System.out.println("Payment link ID: " + paymentLinkId);
		      System.out.println("Payment link URL: " + paymentLinkUrl);
		      System.out.println("Order Id : "+fetchedPayment.get("order_id")+fetchedPayment);
		      
		      return new ResponseEntity<PaymentLinkResponse>(res,HttpStatus.ACCEPTED);
		      
		    } catch (RazorpayException e) {
		    	
		      System.out.println("Error creating payment link: " + e.getMessage());
		      throw new RazorpayException(e.getMessage());
		    }
		
		
//		order_id
	}
	
  @GetMapping("/payments")
  public ResponseEntity<ApiResponse> redirect(@RequestParam("payment_id") String paymentId,@RequestParam("order_id")Long orderId,@RequestHeader("Authorization")  String jwt) throws RazorpayException, OrderException, UserException {
//	  RazorpayClient razorpay = new RazorpayClient("rzp_test_HMZYtD8wrRg7WL", "nHSVQ5AjznWApzDLGlg4b90r");
	  RazorpayClient razorpay = new RazorpayClient("rzp_test_kTsRSaDC8hwztX", "LieoD1s9mxMIv569PcgRDMcU");
	  User user=userService.findUserProfileByJwt(jwt);
	  
	  Cart cart=cartService.findUserCart(user.getId());
	  
	  Order order =orderService.findOrderById(orderId);
	  
	  
	  try {
		
		
		Payment payment = razorpay.payments.fetch(paymentId);
		System.out.println("payment details --- "+payment+payment.get("status"));
		
		if(payment.get("status").equals("captured")) {	
			System.out.println("payment details --- "+payment+payment.get("status"));
		  // Map<String,Object> method =(Map<String, Object>)payment.get("method");
		   String paymentType=(String)payment.get("method");
		   System.out.println(paymentType);
			order.getPaymentDetails().setPaymentId(paymentId);
			order.getPaymentDetails().setStatus(PaymentStatus.COMPLETED);
			order.setOrderStatus(OrderStatus.PLACED);
			//PaymentDetails bye=new PaymentDetails();
			order.getPaymentDetails().setPaymentMethod(paymentType);
			List<OrderItem> list=order.getOrderItems();
			
			
			
			for(OrderItem p:list)
			{
				Long id=p.getProduct().getId();
				Product prod=productRepository.findById(id).orElse(null);
				
				if(prod!=null)
				{
					int quantity=p.getQuantity();
					prod.setQuantity(prod.getQuantity() - quantity);
					//productRepository.save(prod);
					productService.updateProduct(id, prod);
					Set<Size> temp=prod.getSizes();
					for(Size s:temp)
					{
						s.setQuantity(s.getQuantity() - quantity);
						productRepository.save(prod);
					}
				}
//			    int quantity=p.getProduct().getQuantity();
//			    prod.setQuantity(prod.getQuantity()-quantity);
//			    System.out.println(quantity);
			    
			    
			   // productRepository.save(prod);
				//System.out.println(p.getQuantity());
			    
			}
			
			for(CartItem item:cart.getCartItems()) {
				cartItemService.removeCartItem(user.getId(), item.getId());
			}
			
			
			
			
			
			
			//order.getPaymentDetails().setPaymentMethod();
//			order.setOrderItems(order.getOrderItems());
			System.out.println(order.getPaymentDetails().getStatus()+"payment status ");
			orderRepository.save(order);
		}
		ApiResponse res=new ApiResponse("your order get placed", true);
	      return new ResponseEntity<ApiResponse>(res,HttpStatus.OK);
	      
	} catch (Exception e) {
		System.out.println("errrr payment -------- ");
//		new RedirectView("https://shopwithzosh.vercel.app/payment/failed");
		throw new RazorpayException(e.getMessage());
	}

  }

}
