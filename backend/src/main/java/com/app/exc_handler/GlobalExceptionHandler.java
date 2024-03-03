package com.app.exc_handler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.custom_exceptions.ResourceNotFoundException;


@RestControllerAdvice // to tell SC following is centralized custom exc handler , 
//to provide COMMON ADVICE to all rest controllers regarding exc handling
public class GlobalExceptionHandler {
	//add exc handling method : for validation failures
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException
	(MethodArgumentNotValidException e)
	{
		System.out.println("in meth arg invalid "+e);
		List<FieldError> errList=e.getFieldErrors();

		Map<String, String> map = errList.stream() //Stream<FieldError> collection --> stream
		.collect(
				Collectors.toMap(FieldError::getField,FieldError::getDefaultMessage));//f -> f.getField(), f -> f.getDefaultMessage()
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
	}
	
	@ExceptionHandler(BadCredentialsException.class) 
	public ResponseEntity<?> handleBadCredentialsException(BadCredentialsException e)
	{
			
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		
	}


}
