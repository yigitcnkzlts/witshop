export const shopProducts = Array.from({ length: 12 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    title: "Graphic Design",
    category: "English Department",
    oldPrice: 16.48,
    price: 6.48,
    image: `product-shop-${id}.jpg`, 
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
  };
});
