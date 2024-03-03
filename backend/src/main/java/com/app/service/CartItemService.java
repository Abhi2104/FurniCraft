package com.app.service;

import java.util.List;

import com.app.exception.*;

import com.app.modal.*;
import com.app.response.CartItemDTO;

public interface CartItemService {
	
	public CartItem createCartItem(CartItem cartItem);
	
	public CartItemDTO updateCartItem(Long userId, Long id,CartItem cartItem) throws CartItemException, UserException, ProductException;
	
	public CartItem isCartItemExist(Cart cart,Product product, Long userId);
	
	public void removeCartItem(Long userId,Long cartItemId) throws CartItemException, UserException;
	
	public CartItem findCartItemById(Long cartItemId) throws CartItemException;
	
	
	
}
