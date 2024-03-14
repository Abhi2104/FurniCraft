 package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.app.exception.ProductException;
import com.app.modal.Cart;
import com.app.modal.CartItem;
import com.app.modal.Product;
import com.app.modal.User;
import com.app.repository.CartRepository;
import com.app.request.AddItemRequest;
import com.app.response.CartItemDTO;
import com.app.response.DisplayCartResponse;


@Service
@Transactional
public class CartServiceImplementation implements CartService{
	
	private CartRepository cartRepository;
	private CartItemService cartItemService;
	private ProductService productService;
	
	
	public CartServiceImplementation(CartRepository cartRepository,CartItemService cartItemService,
			ProductService productService) {
		this.cartRepository=cartRepository;
		this.productService=productService;
		this.cartItemService=cartItemService;
	}

	@Override
	public Cart createCart(User user) {
		
		Cart cart = new Cart();
		cart.setUser(user);
		Cart createdCart=cartRepository.save(cart);
		return createdCart;
	}
	
	public Cart findUserCart(Long userId) {
		Cart cart =	cartRepository.findByUserId(userId);
		int totalPrice=0;
		
		int totalItem=0;
		for(CartItem cartsItem : cart.getCartItems()) {
			totalPrice+=cartsItem.getPrice();
			
			totalItem+=cartsItem.getQuantity();
			
		}
		
		cart.setTotalPrice(totalPrice);
		cart.setTotalItem(cart.getCartItems().size());

		cart.setTotalItem(totalItem);
		
		
		return cartRepository.save(cart);
		
	}
	
	public DisplayCartResponse findUserCartDisp(Long userId) {
		Cart cart =	cartRepository.findByUserId(userId);
		System.out.println(cart.getId());
		DisplayCartResponse disp=new DisplayCartResponse();
		int totalPrice=0;
		
		int totalItem=0;
		for(CartItem cartsItem : cart.getCartItems()) {
			totalPrice+=cartsItem.getPrice();

			totalItem+=cartsItem.getQuantity();
			
		}
		
		disp.setId(userId);
		
		disp.setTotalPrice(totalPrice);
		disp.setTotalItem(totalItem);
		
		disp.setTotalItem(totalItem);
	
		
		
		
		
		return disp;
		
	}


	@Override
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
		Cart cart=cartRepository.findByUserId(userId);
		Product product=productService.findProductByIdMan(req.getProductId());
		
		CartItem isPresent=cartItemService.isCartItemExist(cart, product, userId);
		
		if(isPresent == null) {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(req.getQuantity());
			cartItem.setUserId(userId);
			
			
			int price=req.getQuantity()*product.getPrice();
			cartItem.setPrice(price);
//			cartItem.setSize(req.getSize());
			
			CartItem createdCartItem=cartItemService.createCartItem(cartItem);
			cart.getCartItems().add(createdCartItem);
			cart.setTotalPrice(createdCartItem.getPrice());
			
			int totalPrice=0;
			
			int totalItem=0;
			
			for(CartItem x:cart.getCartItems())
			{
				totalPrice+=x.getPrice();

				totalItem+=x.getQuantity();
			}
			cart.setTotalPrice(totalPrice);
	
			cart.setTotalItem(totalItem);
		    
		}
	
		cartRepository.save(cart);
		
		return "Item Add To Cart";
	}
	
	//Extra Added
	
	public List<CartItemDTO> findUserCartDispMine(Long userId) {
		Cart cart =	cartRepository.findByUserId(userId);
		System.out.println(cart.getId());
		
		List<CartItemDTO> list=new ArrayList<CartItemDTO>();
		for(CartItem cartsItem : cart.getCartItems()) {
			CartItemDTO obj=new CartItemDTO();
			
			obj.setId(cartsItem.getId());
			obj.setImageUrl(cartsItem.getProduct().getImageUrl());
			obj.setTitle(cartsItem.getProduct().getTitle());
			//obj.setSize(cartsItem.getSize());
			obj.setPrice(cartsItem.getPrice());
			obj.setQuantity(cartsItem.getQuantity());
			
			list.add(obj);
		}

		
		
		
		
		return list;
		
	}

}
