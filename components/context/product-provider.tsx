"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import productsData from "../data/products.json";
import {
  ProductContextType,
  Product,
  ProductProviderProps,
} from "../products-gallery/types";

// Create a context to manage products and selected checkboxes
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Custom hook to access the ProductContext
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

// ProductProvider component to manage product data and checkboxes
export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {


  // State to store the list of products
  const [products, setProducts] = useState<Product[]>(productsData);

  // State to keep track of selected checkboxes
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);

  // Function to delete a product by its ID
  const deleteProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  // Function to toggle the selection of a checkbox
  const toggleCheckbox = (productId: number) => {
    if (selectedCheckboxes.includes(productId)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((id) => id !== productId)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, productId]);
    }
  };

  // Function to delete all selected products
  const handleDeleteSelected = () => {
    selectedCheckboxes.forEach((productId) => {
      deleteProduct(productId);
    });
    setSelectedCheckboxes([]);
  };

  // Provide the product data and related functions through the context
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
