package com.witshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(name = "address_id")
  private Long addressId;

  @Column(name = "order_date")
  private String orderDate;

  private Double price;

  @Column(name = "card_no")
  private String cardNo;

  @Column(name = "card_name")
  private String cardName;

  @Column(name = "card_expire_month")
  private Integer cardExpireMonth;

  @Column(name = "card_expire_year")
  private Integer cardExpireYear;

  @Column(name = "card_ccv")
  private Integer cardCcv;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public Long getAddressId() {
    return addressId;
  }

  public void setAddressId(Long addressId) {
    this.addressId = addressId;
  }

  public String getOrderDate() {
    return orderDate;
  }

  public void setOrderDate(String orderDate) {
    this.orderDate = orderDate;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public String getCardNo() {
    return cardNo;
  }

  public void setCardNo(String cardNo) {
    this.cardNo = cardNo;
  }

  public String getCardName() {
    return cardName;
  }

  public void setCardName(String cardName) {
    this.cardName = cardName;
  }

  public Integer getCardExpireMonth() {
    return cardExpireMonth;
  }

  public void setCardExpireMonth(Integer cardExpireMonth) {
    this.cardExpireMonth = cardExpireMonth;
  }

  public Integer getCardExpireYear() {
    return cardExpireYear;
  }

  public void setCardExpireYear(Integer cardExpireYear) {
    this.cardExpireYear = cardExpireYear;
  }

  public Integer getCardCcv() {
    return cardCcv;
  }

  public void setCardCcv(Integer cardCcv) {
    this.cardCcv = cardCcv;
  }
}
