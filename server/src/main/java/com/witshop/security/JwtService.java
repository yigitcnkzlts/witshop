package com.witshop.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private final SecretKey key;
  private final int expirationDays;

  public JwtService(
      @Value("${witshop.jwt.secret}") String secret,
      @Value("${witshop.jwt.expiration-days}") int expirationDays) {
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.expirationDays = expirationDays;
  }

  public String createToken(Long userId) {
    Instant now = Instant.now();
    return Jwts.builder()
        .subject(String.valueOf(userId))
        .claim("userId", userId)
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plus(expirationDays, ChronoUnit.DAYS)))
        .signWith(key)
        .compact();
  }

  public Long extractUserId(String token) {
    Claims claims =
        Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    Object userId = claims.get("userId");
    if (userId instanceof Integer integer) {
      return integer.longValue();
    }
    if (userId instanceof Long longValue) {
      return longValue;
    }
    return Long.parseLong(claims.getSubject());
  }
}
