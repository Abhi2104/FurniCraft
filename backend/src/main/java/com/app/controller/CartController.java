package com.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.exception.CartItemException;
import com.app.exception.ProductException;
import com.app.exception.UserException;
import com.app.modal.User;
import com.app.request.AddItemRequest;
import com.app.response.ApiResponse;
import com.app.response.CartItemDTO;
import com.app.response.DisplayCartResponse;
import com.app.service.CartService;
import com.app.service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	
	private CartService cartService;
	private UserService userService;
	
	public CartController(CartService cartService,UserService userService) {
		this.cartService=cartService;
		this.userService=userService;
	}
	
	@GetMapping("/")
	public ResponseEntity<DisplayCartResponse> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		DisplayCartResponse cart=cartService.findUserCartDisp(user.getId());
		
		//System.out.println("cart - "+cart.getUser().getEmail());
		
		
		return new ResponseEntity<DisplayCartResponse>(cart,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> findUserCartHandlerAllProducts(@RequestHeader("Authorization") String jwt) throws UserException,CartItemException{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		List<CartItemDTO> cart=cartService.findUserCartDispMine(user.getId());
		
		//System.out.println("cart - "+cart.getUser().getEmail());
		
		
		return new ResponseEntity<List<CartItemDTO>>(cart,HttpStatus.OK);
	}

	@PostMapping("/add")
	public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		cartService.addCartItem(user.getId(), req);
		
		ApiResponse res= new ApiResponse("Item Added To Cart Successfully",true);
		
		return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
		
	}
	

}
