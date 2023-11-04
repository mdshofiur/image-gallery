"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import productsData from "../products-showcase/data/products.json";

interface Product {
  id: number;
  name: string;
  image: string;
}

interface ProductContextType {
  products: Product[];
  deleteProduct: (productId: number) => void;
  selectedCheckboxes: number[];
  toggleCheckbox: (productId: number) => void;
  handleDeleteSelected: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);

  const deleteProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const toggleCheckbox = (productId: number) => {
    if (selectedCheckboxes.includes(productId)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((id) => id !== productId)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, productId]);
    }
  };

  const handleDeleteSelected = () => {
    selectedCheckboxes.forEach((productId) => {
      deleteProduct(productId);
    });
    setSelectedCheckboxes([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        deleteProduct,
        selectedCheckboxes,
        toggleCheckbox,
        handleDeleteSelected,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
