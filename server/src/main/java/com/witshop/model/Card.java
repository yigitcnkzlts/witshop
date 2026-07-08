package com.witshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cards")
public class Card {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(name = "card_no", nullable = false)
  private String cardNo;

  @Column(name = "expire_month")
  private Integer expireMonth;

  @Column(name = "expire_year")
  private Integer expireYear;

  @Column(name = "name_on_card")
  private String nameOnCard;

  private String cvv;

  private Integer installment = 1;

  @Column(name = "use_3d_secure")
  private boolean use3dSecure = true;

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

  public String getCardNo() {
    return cardNo;
  }

  public void setCardNo(String cardNo) {
    this.cardNo = cardNo;
  }

  public Integer getExpireMonth() {
    return expireMonth;
  }

  public void setExpireMonth(Integer expireMonth) {
    this.expireMonth = expireMonth;
  }

  public Integer getExpireYear() {
    return expireYear;
  }

  public void setExpireYear(Integer expireYear) {
    this.expireYear = expireYear;
  }

  public String getNameOnCard() {
    return nameOnCard;
  }

  public void setNameOnCard(String nameOnCard) {
    this.nameOnCard = nameOnCard;
  }

  public String getCvv() {
    return cvv;
  }

  public void setCvv(String cvv) {
    this.cvv = cvv;
  }

  public Integer getInstallment() {
    return installment;
  }

  public void setInstallment(Integer installment) {
    this.installment = installment;
  }

  public boolean isUse3dSecure() {
    return use3dSecure;
  }

  public void setUse3dSecure(boolean use3dSecure) {
    this.use3dSecure = use3dSecure;
  }
}
