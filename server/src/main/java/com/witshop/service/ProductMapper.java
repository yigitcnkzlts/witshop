package com.witshop.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.witshop.dto.ProductResponse;
import com.witshop.model.Product;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

  private final ObjectMapper objectMapper;

  public ProductMapper(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public ProductResponse toResponse(Product product) {
    return new ProductResponse(
        product.getId(),
        product.getName(),
        product.getDescription(),
        product.getPrice(),
        product.getStock(),
        product.getStoreId(),
        product.getCategoryId(),
        product.getRating(),
        product.getSellCount(),
        parseImages(product.getImagesJson()));
  }

  private List<Map<String, Object>> parseImages(String json) {
    if (json == null || json.isBlank()) {
      return Collections.emptyList();
    }
    try {
      return objectMapper.readValue(json, new TypeReference<>() {});
    } catch (Exception e) {
      return Collections.emptyList();
    }
  }
}
