import React, { createContext, useState, useContext, useCallback } from 'react';

const InventoryContext = createContext({
  productsToReposition: [],
  setProductsToReposition: () => {},
  updateQuantities: () => {},
  quantitiesBySku: {},
});

const InventoryProvider = ({ children }) => {
  const [productsToReposition, setProductsToReposition] = useState([]);
  const [quantitiesBySku, setQuantitiesBySku] = useState({});

  const updateQuantities = useCallback((sku, quantity) => {
    setQuantitiesBySku((prevState) => ({
      ...prevState,
      [sku]: quantity,
    }));
  }, [quantitiesBySku]);

  return (
    <InventoryContext.Provider
      value={{
        productsToReposition,
        setProductsToReposition,
        updateQuantities,
        quantitiesBySku,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within a InventoryProvider');
  }
  return context;
};

export { InventoryProvider, useInventory };
