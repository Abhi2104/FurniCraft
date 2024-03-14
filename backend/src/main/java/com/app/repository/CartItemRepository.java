package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.modal.Cart;
import com.app.modal.CartItem;
import com.app.modal.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	@Query("SELECT ci From CartItem ci Where ci.cart=:cart And ci.product=:product  And ci.userId=:userId")
	public CartItem isCartItemExist(@Param("cart")Cart cart,@Param("product")Product product, @Param("userId")Long userId);
	
//	@Query("SELECT c from CartItem c JOIN FETCH c.product Where c.userId=:userId")
//	public List<CartItem> getAllCartItems(@Param("userId")Long userId);
	
	
	@Query("SELECT ci FROM CartItem ci WHERE ci.product.id=:productId")
	public CartItem removeCartItemOfAdmin(@Param("productId") Long productId);
	
	
	
}
