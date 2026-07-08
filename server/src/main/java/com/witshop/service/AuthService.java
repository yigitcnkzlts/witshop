package com.witshop.service;

import com.witshop.model.Store;
import com.witshop.model.User;
import com.witshop.repository.StoreRepository;
import com.witshop.repository.UserRepository;
import com.witshop.security.JwtService;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final StoreRepository storeRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthService(
      UserRepository userRepository,
      StoreRepository storeRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService) {
    this.userRepository = userRepository;
    this.storeRepository = storeRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  public void signup(Map<String, Object> body) {
    String name = (String) body.get("name");
    String email = (String) body.get("email");
    String password = (String) body.get("password");
    Integer roleId = toInteger(body.get("role_id"));

    if (name == null || email == null || password == null || roleId == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing required fields");
    }

    if (userRepository.findByEmail(email).isPresent()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
    }

    User user = new User();
    user.setName(name);
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(password));
    user.setRoleId(roleId);
    user.setActive(true);
    user = userRepository.save(user);

    if (roleId == 2 && body.get("store") instanceof Map<?, ?> storeMap) {
      Store store = new Store();
      store.setUserId(user.getId());
      store.setName((String) storeMap.get("name"));
      store.setPhone((String) storeMap.get("phone"));
      store.setTaxNo((String) storeMap.get("tax_no"));
      store.setBankAccount((String) storeMap.get("bank_account"));
      storeRepository.save(store);
    }
  }

  public Map<String, String> login(Map<String, String> body) {
    String email = body.get("email");
    String password = body.get("password");

    if (email == null || password == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password required");
    }

    User user =
        userRepository
            .findByEmail(email)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Invalid email or password"));

    if (!passwordEncoder.matches(password, user.getPasswordHash())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    if (!user.isActive()) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Account not activated");
    }

    return Map.of(
        "token",
        jwtService.createToken(user.getId()),
        "name",
        user.getName(),
        "email",
        user.getEmail(),
        "role_id",
        String.valueOf(user.getRoleId()));
  }

  public Map<String, String> verify(Long userId, String token) {
    User user =
        userRepository
            .findById(userId)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

    return Map.of(
        "name",
        user.getName(),
        "email",
        user.getEmail(),
        "role_id",
        String.valueOf(user.getRoleId()),
        "token",
        token);
  }

  private Integer toInteger(Object value) {
    if (value == null) {
      return null;
    }
    if (value instanceof Number number) {
      return number.intValue();
    }
    return Integer.parseInt(value.toString());
  }
}
