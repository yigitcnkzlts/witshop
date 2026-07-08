package com.witshop.service;

import com.witshop.model.Order;
import com.witshop.model.OrderItem;
import com.witshop.model.Product;
import com.witshop.repository.AddressRepository;
import com.witshop.repository.OrderItemRepository;
import com.witshop.repository.OrderRepository;
import com.witshop.repository.ProductRepository;
import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderService {

  private final OrderRepository orderRepository;
  private final OrderItemRepository orderItemRepository;
  private final AddressRepository addressRepository;
  private final ProductRepository productRepository;

  public OrderService(
      OrderRepository orderRepository,
      OrderItemRepository orderItemRepository,
      AddressRepository addressRepository,
      ProductRepository productRepository) {
    this.orderRepository = orderRepository;
    this.orderItemRepository = orderItemRepository;
    this.addressRepository = addressRepository;
    this.productRepository = productRepository;
  }

  public List<Map<String, Object>> getOrders(Long userId) {
    return orderRepository.findByUserIdOrderByIdDesc(userId).stream()
        .map(this::toOrderMap)
        .toList();
  }

  @Transactional
  public Map<String, Object> createOrder(Long userId, Map<String, Object> body) {
    Long addressId = toLong(body.get("address_id"));
    addressRepository
        .findByIdAndUserId(addressId, userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid address"));

    Order order = new Order();
    order.setUserId(userId);
    order.setAddressId(addressId);
    order.setOrderDate(
        body.get("order_date") != null
            ? String.valueOf(body.get("order_date"))
            : Instant.now().toString());
    order.setPrice(toDouble(body.get("price")));
    order.setCardNo(String.valueOf(body.get("card_no")));
    order.setCardName((String) body.get("card_name"));
    order.setCardExpireMonth(toInteger(body.get("card_expire_month")));
    order.setCardExpireYear(toInteger(body.get("card_expire_year")));
    order.setCardCcv(toInteger(body.get("card_ccv")));
    order = orderRepository.save(order);

    List<Map<String, Object>> products = castList(body.get("products"));
    for (Map<String, Object> item : products) {
      Integer productId = toInteger(item.get("product_id"));
      Integer count = toInteger(item.get("count"));
      String detail = item.get("detail") != null ? String.valueOf(item.get("detail")) : "";

      OrderItem orderItem = new OrderItem();
      orderItem.setOrderId(order.getId());
      orderItem.setProductId(productId);
      orderItem.setCount(count);
      orderItem.setDetail(detail);
      orderItemRepository.save(orderItem);

      Product product =
          productRepository
              .findById(productId)
              .orElseThrow(
                  () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid product"));
      int sellCount = product.getSellCount() != null ? product.getSellCount() : 0;
      int stock = product.getStock() != null ? product.getStock() : 0;
      product.setSellCount(sellCount + count);
      product.setStock(Math.max(0, stock - count));
      productRepository.save(product);
    }

    Map<String, Object> response = new LinkedHashMap<>();
    response.put("id", order.getId());
    response.put("user_id", order.getUserId());
    response.put("address_id", order.getAddressId());
    response.put("order_date", order.getOrderDate());
    response.put("price", order.getPrice());
    response.put("products", products);
    return response;
  }

  private Map<String, Object> toOrderMap(Order order) {
    Map<String, Object> map = new LinkedHashMap<>();
    map.put("id", order.getId());
    map.put("user_id", order.getUserId());
    map.put("address_id", order.getAddressId());
    map.put("order_date", order.getOrderDate());
    map.put("price", order.getPrice());
    map.put(
        "products",
        orderItemRepository.findByOrderId(order.getId()).stream()
            .map(
                item -> {
                  Map<String, Object> product = new LinkedHashMap<>();
                  product.put("product_id", item.getProductId());
                  product.put("count", item.getCount());
                  product.put("detail", item.getDetail());
                  return product;
                })
            .toList());
    return map;
  }

  @SuppressWarnings("unchecked")
  private List<Map<String, Object>> castList(Object value) {
    if (value instanceof List<?> list) {
      List<Map<String, Object>> result = new ArrayList<>();
      for (Object item : list) {
        result.add((Map<String, Object>) item);
      }
      return result;
    }
    return List.of();
  }

  private Long toLong(Object value) {
    if (value instanceof Number number) {
      return number.longValue();
    }
    return Long.parseLong(String.valueOf(value));
  }

  private Integer toInteger(Object value) {
    if (value == null) {
      return null;
    }
    if (value instanceof Number number) {
      return number.intValue();
    }
    return Integer.parseInt(String.valueOf(value));
  }

  private Double toDouble(Object value) {
    if (value instanceof Number number) {
      return number.doubleValue();
    }
    return Double.parseDouble(String.valueOf(value));
  }
}
