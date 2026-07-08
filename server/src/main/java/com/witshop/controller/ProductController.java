package com.witshop.controller;

import com.witshop.dto.CategoryResponse;
import com.witshop.dto.ProductListResponse;
import com.witshop.dto.ProductResponse;
import com.witshop.service.ProductService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping("/categories")
  public List<CategoryResponse> categories() {
    return productService.getCategories();
  }

  @GetMapping("/products")
  public ProductListResponse products(
      @RequestParam(defaultValue = "25") int limit,
      @RequestParam(defaultValue = "0") int offset,
      @RequestParam(required = false) Integer category,
      @RequestParam(required = false) String filter,
      @RequestParam(required = false) String sort) {
    int safeLimit = Math.max(1, limit);
    int safeOffset = Math.max(0, offset);
    long total = productService.countProducts(category, filter);
    List<ProductResponse> products =
        productService.findProducts(category, filter, sort, safeLimit, safeOffset).stream()
            .map(productService.mapper()::toResponse)
            .toList();
    return new ProductListResponse(total, products);
  }

  @GetMapping("/products/{id}")
  public ProductResponse product(@PathVariable Integer id) {
    var product = productService.findProduct(id);
    if (product == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }
    return productService.mapper().toResponse(product);
  }
}
