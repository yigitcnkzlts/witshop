package com.witshop.service;

import com.witshop.dto.CategoryResponse;
import com.witshop.model.Category;
import com.witshop.model.Product;
import com.witshop.repository.CategoryRepository;
import com.witshop.repository.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

  private final CategoryRepository categoryRepository;
  private final ProductRepository productRepository;
  private final ProductMapper productMapper;

  public ProductService(
      CategoryRepository categoryRepository,
      ProductRepository productRepository,
      ProductMapper productMapper) {
    this.categoryRepository = categoryRepository;
    this.productRepository = productRepository;
    this.productMapper = productMapper;
  }

  public List<CategoryResponse> getCategories() {
    List<Category> categories =
        categoryRepository.findAll().stream()
            .sorted(Comparator.comparing(Category::getId))
            .toList();

    return categories.stream()
        .map(
            category -> {
              long items =
                  productRepository.findAll().stream()
                      .filter(p -> category.getId().equals(p.getCategoryId()))
                      .count();
              return new CategoryResponse(
                  category.getId(),
                  category.getCode(),
                  category.getTitle(),
                  category.getImg(),
                  category.getRating(),
                  category.getGender(),
                  items);
            })
        .toList();
  }

  public long countProducts(Integer categoryId, String filter) {
    return productRepository.count(buildSpec(categoryId, filter));
  }

  public List<Product> findProducts(
      Integer categoryId, String filter, String sort, int limit, int offset) {
    Sort sortOrder = resolveSort(sort);
    var pageable = PageRequest.of(offset / limit, limit, sortOrder);
    return productRepository.findAll(buildSpec(categoryId, filter), pageable).getContent();
  }

  public Product findProduct(Integer id) {
    return productRepository.findById(id).orElse(null);
  }

  public ProductMapper mapper() {
    return productMapper;
  }

  private Specification<Product> buildSpec(Integer categoryId, String filter) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (categoryId != null) {
        predicates.add(cb.equal(root.get("categoryId"), categoryId));
      }
      if (filter != null && !filter.isBlank()) {
        String term = "%" + filter.toLowerCase() + "%";
        predicates.add(
            cb.or(
                cb.like(cb.lower(root.get("name")), term),
                cb.like(cb.lower(root.get("description")), term)));
      }
      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }

  private Sort resolveSort(String sort) {
    if ("price:asc".equals(sort)) {
      return Sort.by("price").ascending();
    }
    if ("price:desc".equals(sort)) {
      return Sort.by("price").descending();
    }
    if ("rating:asc".equals(sort)) {
      return Sort.by("rating").ascending();
    }
    if ("rating:desc".equals(sort)) {
      return Sort.by("rating").descending();
    }
    return Sort.by("id").ascending();
  }
}
