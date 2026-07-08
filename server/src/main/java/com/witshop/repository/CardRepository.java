package com.witshop.repository;

import com.witshop.model.Card;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
  List<Card> findByUserIdOrderByIdAsc(Long userId);

  Optional<Card> findByIdAndUserId(Long id, Long userId);
}
