package com.app.service;

import java.util.Optional;


import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.app.exception.CartItemException;
import com.app.exception.ProductException;
import com.app.exception.UserException;
import com.app.modal.Cart;
import com.app.modal.CartItem;
import com.app.modal.Product;

import com.app.modal.User;
import com.app.repository.CartItemRepository;
import com.app.repository.CartRepository;
import com.app.response.CartItemDTO;
@Service
@Transactional
public class CartItemServiceImplementation implements CartItemService {
	
	private CartItemRepository cartItemRepository;
	private UserService userService;
	private CartRepository cartRepository;
	private ProductService productService;
	
	public CartItemServiceImplementation(CartItemRepository cartItemRepository,UserService userService,CartRepository cartRepository,ProductService productService) {
		this.cartItemRepository=cartItemRepository;
		this.userService=userService;
		this.cartRepository=cartRepository;
		this.productService=productService;
	}

	@Override
	public CartItem createCartItem(CartItem cartItem) {
		
		//cartItem.setQuantity(1);
		cartItem.setQuantity(cartItem.getQuantity());
		cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
		
		
		CartItem createdCartItem=cartItemRepository.save(cartItem);
		
		
		
		
		return createdCartItem;
	}

	@Override
	public CartItemDTO updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException, ProductException {
		Cart cart=cartRepository.findByUserId(userId);
		System.out.println(cart.getId());
		CartItem item=findCartItemById(id);
		Long productId=item.getProduct().getId();
		Product prod= productService.findProductByIdMan(productId);
		int qty=prod.getQuantity();
		int sizeQty;
		int cartItemSizeQty;
		
		User user=userService.findUserById(item.getUserId());
//		Set<Size> hmm=prod.getSizes();
		
		//This if loop is added on 03/09/23
		if(cartItem.getQuantity()>0 && cartItem.getQuantity()<=qty)
		{
			CartItemDTO trial=new CartItemDTO();
			
			if(user.getId().equals(userId)) {
				System.out.println("Inside");
				item.setQuantity(cartItem.getQuantity());
				item.setPrice(item.getQuantity()*item.getProduct().getPrice());
				
				
				CartItem p= cartItemRepository.save(item);
				
				int totalPrice=0;
				
				int totalItem=0;
				
				for(CartItem x:cart.getCartItems())
				{
					totalPrice+=x.getPrice();
					
					totalItem+=x.getQuantity();
				}
				cart.setTotalPrice(totalPrice);
				cart.setTotalItem(cart.getCartItems().size());
				
				cart.setTotalItem(totalItem);
				
				
				trial.setQuantity(cart.getTotalItem());
				
				cartRepository.save(cart);
				
				
				
					//intially returining p
				
							
			}
			return trial;
			
		}
		
		
		else {
			throw new CartItemException("You can't update  another users cart_item");
		}
		
	}

	@Override
	public CartItem isCartItemExist(Cart cart, Product product, Long userId) {
		
		CartItem cartItem=cartItemRepository.isCartItemExist(cart, product,  userId);
		
		return cartItem;
	}
	
	

	@Override
	public void removeCartItem(Long userId,Long cartItemId) throws CartItemException, UserException {
		
		System.out.println("userId- "+userId+" cartItemId "+cartItemId);
		Cart cart=cartRepository.findByUserId(userId);
		
		CartItem cartItem=findCartItemById(cartItemId);
		
		User user=userService.findUserById(cartItem.getUserId());
		User reqUser=userService.findUserById(userId);
		
		if(user.getId().equals(reqUser.getId())) {
			cartItemRepository.deleteById(cartItem.getId());
			cart.getCartItems().remove(cartItem);
			cartItem.setCart(null);
			
			int totalPrice=0;
		
			int totalItem=0;
			
			for(CartItem x:cart.getCartItems())
			{
				totalPrice+=x.getPrice();
				
				totalItem+=x.getQuantity();
			}
			cart.setTotalPrice(totalPrice);
			cart.setTotalItem(cart.getCartItems().size());
			
			cart.setTotalItem(totalItem);
			
			cartRepository.save(cart);
			
			
		}
		else {
			throw new UserException("you can't remove anothor users item");
		}
		
	}

	@Override
	public CartItem findCartItemById(Long cartItemId) throws CartItemException {
		Optional<CartItem> opt=cartItemRepository.findById(cartItemId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new CartItemException("cartItem not found with id : "+cartItemId);
	}

}
