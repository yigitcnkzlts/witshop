package com.witshop.controller;

import com.witshop.model.Role;
import com.witshop.repository.RoleRepository;
import com.witshop.service.AuthService;
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
public class AuthController {

  private final RoleRepository roleRepository;
  private final AuthService authService;

  public AuthController(RoleRepository roleRepository, AuthService authService) {
    this.roleRepository = roleRepository;
    this.authService = authService;
  }

  @GetMapping("/roles")
  public List<Role> roles() {
    return roleRepository.findAll();
  }

  @PostMapping("/signup")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, String> signup(@RequestBody Map<String, Object> body) {
    authService.signup(body);
    return Map.of("message", "User created successfully");
  }

  @PostMapping("/login")
  public Map<String, String> login(@RequestBody Map<String, String> body) {
    return authService.login(body);
  }

  @GetMapping("/verify")
  public Map<String, String> verify(Authentication authentication) {
    Long userId = (Long) authentication.getPrincipal();
    String token = (String) authentication.getCredentials();
    return authService.verify(userId, token);
  }
}
