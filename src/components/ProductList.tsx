import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("products from server", category);
    setProducts(["Clothing ", "Household"]);
  }, [category]);

  return <div>ProductList</div>;
};

export default ProductList;
