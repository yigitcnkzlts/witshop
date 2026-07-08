package com.witshop.repository;

import com.witshop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductRepository
    extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {}
