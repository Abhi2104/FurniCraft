package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.modal.*;

public interface AddressRepository extends JpaRepository<Address, Long> {
	
	@Query("SELECT addr FROM Address addr WHERE addr.id=:shippingAddressId")
	public Address findOrderShippingAddress(@Param("shippingAddressId") Long shippingAddressId);

}
