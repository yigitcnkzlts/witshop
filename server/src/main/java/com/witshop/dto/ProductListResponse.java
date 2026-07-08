package com.witshop.dto;

import java.util.List;

public record ProductListResponse(long total, List<ProductResponse> products) {}
