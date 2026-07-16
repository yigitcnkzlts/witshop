package com.witshop.controller;

import com.witshop.service.UserService;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/user/address")
  public List<Map<String, Object>> getAddresses(Authentication authentication) {
    return userService.getAddresses(userId(authentication));
  }

  @PostMapping("/user/address")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> createAddress(
      Authentication authentication, @RequestBody Map<String, Object> body) {
    return userService.createAddress(userId(authentication), body);
  }

  @PutMapping("/user/address/{id}")
  public Map<String, Object> updateAddress(
      Authentication authentication, @PathVariable Long id, @RequestBody Map<String, Object> body) {
    body.put("id", id);
    return userService.updateAddress(userId(authentication), body);
  }

  @DeleteMapping("/user/address/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteAddress(Authentication authentication, @PathVariable Long id) {
    userService.deleteAddress(userId(authentication), id);
  }

  @GetMapping("/user/card")
  public List<Map<String, Object>> getCards(Authentication authentication) {
    return userService.getCards(userId(authentication));
  }

  @PostMapping("/user/card")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> createCard(
      Authentication authentication, @RequestBody Map<String, Object> body) {
    return userService.createCard(userId(authentication), body);
  }

  @PutMapping("/user/card/{id}")
  public Map<String, Object> updateCard(
      Authentication authentication, @PathVariable Long id, @RequestBody Map<String, Object> body) {
    body.put("id", id);
    return userService.updateCard(userId(authentication), body);
  }

  @DeleteMapping("/user/card/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteCard(Authentication authentication, @PathVariable Long id) {
    userService.deleteCard(userId(authentication), id);
  }

  private Long userId(Authentication authentication) {
    return (Long) authentication.getPrincipal();
  }
}
