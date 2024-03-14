package com.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.exception.CartItemException;
import com.app.exception.ProductException;
import com.app.exception.UserException;
import com.app.modal.CartItem;
import com.app.modal.User;
import com.app.repository.CartItemRepository;
import com.app.response.ApiResponse;
import com.app.response.CartItemDTO;
import com.app.service.CartItemService;
import com.app.service.UserService;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

	private CartItemService cartItemService;
	private UserService userService;
	
	private CartItemRepository cartItemRepository;
	
	public CartItemController(CartItemService cartItemService,UserService userService,CartItemRepository cartItemRepository) {
		this.cartItemService=cartItemService;
		this.userService=userService;
		this.cartItemRepository=cartItemRepository;
	}
	
	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<ApiResponse>deleteCartItemHandler(@PathVariable Long cartItemId, @RequestHeader("Authorization")String jwt) throws CartItemException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		cartItemService.removeCartItem(user.getId(), cartItemId);
		
		ApiResponse res=new ApiResponse("Item Remove From Cart",true);
		
		return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{cartItemId}")
	public ResponseEntity<?>updateCartItemHandler(@PathVariable Long cartItemId, @RequestBody CartItem cartItem, @RequestHeader("Authorization")String jwt) throws CartItemException,ProductException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		//CartItem updatedCartItem =cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
		CartItemDTO str=cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
		
		//ApiResponse res=new ApiResponse("Item Updated",true);
		
		return new ResponseEntity<>(str,HttpStatus.ACCEPTED);
	}
	

}
