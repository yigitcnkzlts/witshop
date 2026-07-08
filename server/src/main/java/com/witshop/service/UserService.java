package com.witshop.service;

import com.witshop.model.Address;
import com.witshop.model.Card;
import com.witshop.repository.AddressRepository;
import com.witshop.repository.CardRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

  private final AddressRepository addressRepository;
  private final CardRepository cardRepository;

  public UserService(AddressRepository addressRepository, CardRepository cardRepository) {
    this.addressRepository = addressRepository;
    this.cardRepository = cardRepository;
  }

  public List<Map<String, Object>> getAddresses(Long userId) {
    return addressRepository.findByUserIdOrderByIdAsc(userId).stream()
        .map(this::toAddressMap)
        .toList();
  }

  public Map<String, Object> createAddress(Long userId, Map<String, Object> body) {
    Address address = mapAddress(new Address(), userId, body);
    return toAddressMap(addressRepository.save(address));
  }

  public Map<String, Object> updateAddress(Long userId, Map<String, Object> body) {
    Long id = toLong(body.get("id"));
    Address address =
        addressRepository
            .findByIdAndUserId(id, userId)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
    return toAddressMap(addressRepository.save(mapAddress(address, userId, body)));
  }

  public void deleteAddress(Long userId, Long id) {
    Address address =
        addressRepository
            .findByIdAndUserId(id, userId)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
    addressRepository.delete(address);
  }

  public List<Map<String, Object>> getCards(Long userId) {
    return cardRepository.findByUserIdOrderByIdAsc(userId).stream().map(this::toCardMap).toList();
  }

  public Map<String, Object> createCard(Long userId, Map<String, Object> body) {
    Card card = mapCard(new Card(), userId, body);
    return toCardMap(cardRepository.save(card));
  }

  public Map<String, Object> updateCard(Long userId, Map<String, Object> body) {
    Long id = toLong(body.get("id"));
    Card card =
        cardRepository
            .findByIdAndUserId(id, userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Card not found"));
    return toCardMap(cardRepository.save(mapCard(card, userId, body)));
  }

  public void deleteCard(Long userId, Long id) {
    Card card =
        cardRepository
            .findByIdAndUserId(id, userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Card not found"));
    cardRepository.delete(card);
  }

  private Address mapAddress(Address address, Long userId, Map<String, Object> body) {
    address.setUserId(userId);
    address.setTitle((String) body.get("title"));
    address.setName((String) body.get("name"));
    address.setSurname((String) body.get("surname"));
    address.setPhone((String) body.get("phone"));
    address.setCity((String) body.get("city"));
    address.setDistrict((String) body.get("district"));
    String neighborhood = (String) body.get("neighborhood");
    address.setNeighborhood(neighborhood);
    address.setAddress(neighborhood);
    return address;
  }

  private Card mapCard(Card card, Long userId, Map<String, Object> body) {
    card.setUserId(userId);
    card.setCardNo(String.valueOf(body.get("card_no")));
    card.setExpireMonth(toInteger(body.get("expire_month")));
    card.setExpireYear(toInteger(body.get("expire_year")));
    card.setNameOnCard((String) body.get("name_on_card"));
    if (body.get("cvv") != null) {
      card.setCvv(String.valueOf(body.get("cvv")));
    }
    card.setInstallment(toInteger(body.get("installment")) != null ? toInteger(body.get("installment")) : 1);
    Object secure = body.get("use_3d_secure");
    card.setUse3dSecure(secure == null || Boolean.parseBoolean(String.valueOf(secure)));
    return card;
  }

  private Map<String, Object> toAddressMap(Address address) {
    Map<String, Object> map = new LinkedHashMap<>();
    map.put("id", address.getId());
    map.put("user_id", address.getUserId());
    map.put("title", address.getTitle());
    map.put("name", address.getName());
    map.put("surname", address.getSurname());
    map.put("phone", address.getPhone());
    map.put("city", address.getCity());
    map.put("district", address.getDistrict());
    map.put("neighborhood", address.getNeighborhood());
    map.put("address", address.getAddress() != null ? address.getAddress() : address.getNeighborhood());
    return map;
  }

  private Map<String, Object> toCardMap(Card card) {
    Map<String, Object> map = new LinkedHashMap<>();
    map.put("id", card.getId());
    map.put("card_no", card.getCardNo());
    map.put("expire_month", card.getExpireMonth());
    map.put("expire_year", card.getExpireYear());
    map.put("name_on_card", card.getNameOnCard());
    map.put("installment", card.getInstallment());
    map.put("use_3d_secure", card.isUse3dSecure());
    return map;
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
}
