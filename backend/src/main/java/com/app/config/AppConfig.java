package com.app.config;

import java.util.Arrays;
import java.util.Collections;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class AppConfig {
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.addFilterBefore(new JwtTokenValidator(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
		.addFilterAfter(new AuthorizationFilter(),UsernamePasswordAuthenticationFilter.class )
		.authorizeHttpRequests(Authorize -> Authorize
				.antMatchers("/api/admin/**").hasRole("ADMIN")
				.antMatchers("/api/cart_items/**").hasRole("USER")
				.antMatchers("/api/cart/**").hasRole("USER")
				.antMatchers("/api/reviews/create").hasRole("USER")
				.antMatchers("/api/ratings/create").hasRole("USER")
				.antMatchers("/api/orders/").hasRole("USER")
				.antMatchers("/api/payments/*").hasRole("USER")
				.anyRequest().permitAll()
				)
		
		.csrf().disable()
		.cors().configurationSource(new CorsConfigurationSource() {
					
					@Override
					public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
						
						CorsConfiguration cfg = new CorsConfiguration();
						
						cfg.setAllowedOrigins(Arrays.asList(
								
								"http://localhost:3000" ,
								"http://localhost:3002",
								"http://localhost:3001"
								

								
							)
						);
						//cfg.setAllowedMethods(Arrays.asList("GET", "POST","DELETE","PUT"));
						cfg.setAllowedMethods(Collections.singletonList("*"));
						cfg.setAllowCredentials(true);
						cfg.setAllowedHeaders(Collections.singletonList("*"));
						cfg.setExposedHeaders(Arrays.asList("Authorization"));
						cfg.setMaxAge(3600L);
						return cfg;
						
					}
				})
		.and()
		.httpBasic()
		.and()
		.formLogin();
		
		return http.build();
		
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
