import React, { createContext, useState, useContext, useCallback } from 'react';

const InventoryContext = createContext({
  productsToReposition: [],
  setProductsToReposition: () => {},
  updateQuantities: () => {},
  quantitiesBySku: {},
  removeSku: () => {},
});

const InventoryProvider = ({ children }) => {
  const [productsToReposition, setProductsToReposition] = useState([]);
  const [quantitiesBySku, setQuantitiesBySku] = useState({});

  const updateQuantities = useCallback(
    (sku, quantity) => {
      setQuantitiesBySku((prevState) => ({
        ...prevState,
        [sku]: quantity,
      }));
    },
    [quantitiesBySku],
  );

  const removeSku = useCallback(
    (sku) => {
      setProductsToReposition((prevState) => prevState.filter((product) => product.sku !== sku));
    },
    [],
  );

  return (
    <InventoryContext.Provider
      value={{
        productsToReposition,
        setProductsToReposition,
        updateQuantities,
        quantitiesBySku,
        removeSku,
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
