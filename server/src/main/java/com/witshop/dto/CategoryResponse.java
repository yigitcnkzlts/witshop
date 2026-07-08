package com.witshop.dto;

public record CategoryResponse(
    Integer id,
    String code,
    String title,
    String img,
    Double rating,
    String gender,
    Long items) {}
