package com.witshop.controller;

import com.witshop.service.OrderService;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping("/order")
  public List<Map<String, Object>> getOrders(Authentication authentication) {
    return orderService.getOrders((Long) authentication.getPrincipal());
  }

  @PostMapping("/order")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> createOrder(
      Authentication authentication, @RequestBody Map<String, Object> body) {
    return orderService.createOrder((Long) authentication.getPrincipal(), body);
  }
}
