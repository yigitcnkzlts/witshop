package com.witshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

  @Id
  private Integer id;

  @Column(nullable = false)
  private String name;

  @Lob
  private String description;

  @Column(nullable = false)
  private Double price;

  private Integer stock;

  @Column(name = "store_id")
  private Integer storeId;

  @Column(name = "category_id")
  private Integer categoryId;

  private Double rating;

  @Column(name = "sell_count")
  private Integer sellCount;

  @Column(name = "images_json")
  @Lob
  private String imagesJson;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public Integer getStock() {
    return stock;
  }

  public void setStock(Integer stock) {
    this.stock = stock;
  }

  public Integer getStoreId() {
    return storeId;
  }

  public void setStoreId(Integer storeId) {
    this.storeId = storeId;
  }

  public Integer getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }

  public Double getRating() {
    return rating;
  }

  public void setRating(Double rating) {
    this.rating = rating;
  }

  public Integer getSellCount() {
    return sellCount;
  }

  public void setSellCount(Integer sellCount) {
    this.sellCount = sellCount;
  }

  public String getImagesJson() {
    return imagesJson;
  }

  public void setImagesJson(String imagesJson) {
    this.imagesJson = imagesJson;
  }
}
