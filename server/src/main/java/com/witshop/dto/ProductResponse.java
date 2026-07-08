package com.witshop.dto;

import java.util.List;
import java.util.Map;

public record ProductResponse(
    Integer id,
    String name,
    String description,
    Double price,
    Integer stock,
    Integer store_id,
    Integer category_id,
    Double rating,
    Integer sell_count,
    List<Map<String, Object>> images) {}
