import React, { createContext, useState, useContext } from 'react';

const InventoryContext = createContext({
  productsToReposition: [],
  setProductsToReposition: () => {},
});

const InventoryProvider = ({ children }) => {
  const [productsToReposition, setProductsToReposition] = useState([]);

  return (
    <InventoryContext.Provider
      value={{ productsToReposition, setProductsToReposition }}
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
