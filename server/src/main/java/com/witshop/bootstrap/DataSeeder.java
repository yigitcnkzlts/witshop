package com.witshop.bootstrap;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.witshop.model.Category;
import com.witshop.model.Product;
import com.witshop.model.Role;
import com.witshop.model.User;
import com.witshop.repository.CategoryRepository;
import com.witshop.repository.ProductRepository;
import com.witshop.repository.RoleRepository;
import com.witshop.repository.UserRepository;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataSeeder implements CommandLineRunner {

  private final RoleRepository roleRepository;
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;
  private final ProductRepository productRepository;
  private final PasswordEncoder passwordEncoder;
  private final ObjectMapper objectMapper;

  public DataSeeder(
      RoleRepository roleRepository,
      UserRepository userRepository,
      CategoryRepository categoryRepository,
      ProductRepository productRepository,
      PasswordEncoder passwordEncoder,
      ObjectMapper objectMapper) {
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
    this.productRepository = productRepository;
    this.passwordEncoder = passwordEncoder;
    this.objectMapper = objectMapper;
  }

  @Override
  @Transactional
  public void run(String... args) throws Exception {
    seedRolesIfMissing();
    seedDemoUserIfMissing();
    syncCatalogFromSeed();
  }

  private void seedRolesIfMissing() {
    if (roleRepository.findById(1).isEmpty()) roleRepository.save(role(1, "admin", "admin"));
    if (roleRepository.findById(2).isEmpty()) roleRepository.save(role(2, "store", "store"));
    if (roleRepository.findById(3).isEmpty()) roleRepository.save(role(3, "customer", "customer"));
  }

  private void seedDemoUserIfMissing() {
    if (userRepository.findByEmail("customer@commerce.com").isEmpty()) {
      User user = new User();
      user.setName("Cust Omer");
      user.setEmail("customer@commerce.com");
      user.setPasswordHash(passwordEncoder.encode("123456"));
      user.setRoleId(3);
      user.setActive(true);
      userRepository.save(user);
    }
  }

  private void syncCatalogFromSeed() throws Exception {
    // Zaten veriler varsa tekrar seed etme
    if (categoryRepository.count() > 0 && productRepository.count() > 0) {
      return;
    }

    JsonNode root =
        objectMapper.readTree(new InputStreamReader(
            new ClassPathResource("seed-data.json").getInputStream(), StandardCharsets.UTF_8));

    for (JsonNode node : root.path("categories")) {
      Integer id = node.path("id").asInt();
      if (categoryRepository.findById(id).isEmpty()) {
        Category category = new Category();
        category.setId(id);
        category.setCode(textOrNull(node, "code"));
        category.setTitle(node.path("title").asText());
        category.setImg(textOrNull(node, "img"));
        category.setRating(node.path("rating").asDouble(0));
        category.setGender(textOrNull(node, "gender"));
        categoryRepository.save(category);
      }
    }

    for (JsonNode node : root.path("products")) {
      Integer id = node.path("id").asInt();
      if (productRepository.findById(id).isEmpty()) {
        Product product = new Product();
        product.setId(id);
        product.setName(node.path("name").asText());
        product.setDescription(textOrNull(node, "description"));
        product.setPrice(node.path("price").asDouble());
        product.setStock(node.path("stock").asInt(0));
        product.setStoreId(node.path("store_id").isNull() ? null : node.path("store_id").asInt());
        product.setCategoryId(
            node.path("category_id").isNull() ? null : node.path("category_id").asInt());
        product.setRating(node.path("rating").asDouble(0));
        product.setSellCount(node.path("sell_count").asInt(0));
        product.setImagesJson(node.path("images").toString());
        productRepository.save(product);
      }
    }
  }

  private Role role(int id, String name, String code) {
    Role role = new Role();
    role.setId(id);
    role.setName(name);
    role.setCode(code);
    return role;
  }

  private String textOrNull(JsonNode node, String field) {
    JsonNode value = node.path(field);
    return value.isMissingNode() || value.isNull() ? null : value.asText();
  }
}
